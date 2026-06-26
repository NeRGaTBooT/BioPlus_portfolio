import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export function loadYaml<T>(relativePath: string): T {
  const filePath = join(process.cwd(), 'src/data', relativePath);
  const source = readFileSync(filePath, 'utf-8');
  return parse(source) as T;
}
