import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse } from 'yaml';

const root = process.cwd();
const dataDir = join(root, 'src/data');
const publicDir = join(root, 'public');

function loadYamlFile(filename) {
  return parse(readFileSync(join(dataDir, filename), 'utf-8'));
}

function ensureDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initials(name) {
  const parts = name
    .replace(/[«»"']/g, '')
    .split(/[\s-]+/)
    .filter(Boolean);

  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function shortLabel(name, max = 18) {
  const clean = name.replace(/[«»"']/g, '').trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

function logoSvg(label, subtitle) {
  const title = escapeXml(shortLabel(label, 22));
  const sub = subtitle ? escapeXml(shortLabel(subtitle, 14)) : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 64" role="img" aria-label="${escapeXml(label)}">
  <rect width="160" height="64" rx="8" fill="#f9fafb" stroke="#e5e8eb"/>
  <text x="80" y="${sub ? 28 : 36}" text-anchor="middle" fill="#191f28" font-family="system-ui,sans-serif" font-size="11" font-weight="600">${title}</text>
  ${sub ? `<text x="80" y="46" text-anchor="middle" fill="#6b7684" font-family="system-ui,sans-serif" font-size="9">${sub}</text>` : ''}
</svg>`;
}

function avatarSvg(name) {
  const letters = initials(name);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${escapeXml(name)}">
  <circle cx="60" cy="60" r="60" fill="#e8f3ff"/>
  <text x="60" y="68" text-anchor="middle" fill="#161d89" font-family="system-ui,sans-serif" font-size="32" font-weight="600">${escapeXml(letters)}</text>
</svg>`;
}

function writeAsset(relativePath, content) {
  const filePath = join(publicDir, relativePath.replace(/^\//, ''));
  if (existsSync(filePath)) return;
  ensureDir(filePath);
  writeFileSync(filePath, content, 'utf-8');
}

const partners = loadYamlFile('partners.yaml');
const clients = loadYamlFile('clients.yaml');
const team = loadYamlFile('team.yaml');
const catalogs = loadYamlFile('catalogs.yaml');

for (const item of partners) {
  writeAsset(item.logo, logoSvg(item.name, 'Партнёр'));
}

for (const item of clients) {
  writeAsset(item.logo, logoSvg(item.name, 'Клиент'));
}

for (const member of team) {
  writeAsset(member.photo, avatarSvg(member.name));
}

for (const catalog of catalogs) {
  writeAsset(catalog.logo, logoSvg(catalog.brand, 'Каталог'));
  writeAsset(catalog.file, '%PDF-1.1\n');
}

console.log('Готово.');
