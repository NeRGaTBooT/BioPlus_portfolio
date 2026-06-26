import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`.trim();

export const GET: APIRoute = () => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemapURL = `${import.meta.env.SITE}${basePath}/sitemap-index.xml`;

  return new Response(getRobotsTxt(new URL(sitemapURL)), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
