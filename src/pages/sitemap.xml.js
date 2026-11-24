// Every .md post plus the two home pages. No dependency needed.
const posts = Object.values(import.meta.glob('./{en,fa}/*.md', { eager: true }));

export function GET({ site }) {
  const urls = [
    { loc: '/', lastmod: null },
    { loc: '/fa/', lastmod: null },
    ...posts.map(p => ({ loc: `${p.url}/`, lastmod: p.frontmatter.updated ?? p.frontmatter.date })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${new URL(u.loc, site)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
