// pages/api/sitemap.xml.js
export default async function handler(req, res) {
  try {
    const baseUrl = 'https://researchers.me';
    
    // Fetch dynamic content (services, blogs, etc.)
    let services = [];
    let blogs = [];
    
    try {
      const servicesRes = await fetch(`${req.headers.host?.includes('localhost') ? 'http://localhost:3000' : baseUrl}/api/services`);
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        services = servicesData.data || [];
      }
    } catch (e) {
      console.error('Error fetching services for sitemap:', e);
    }
    
    try {
      const blogsRes = await fetch(`${req.headers.host?.includes('localhost') ? 'http://localhost:3000' : baseUrl}/api/blogs`);
      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        blogs = blogsData.data || [];
      }
    } catch (e) {
      console.error('Error fetching blogs for sitemap:', e);
    }

    // Static pages
    const staticPages = [
      { url: '', changefreq: 'daily', priority: '1.0' },
      { url: '/about', changefreq: 'monthly', priority: '0.8' },
      { url: '/services', changefreq: 'weekly', priority: '0.9' },
      { url: '/blogs', changefreq: 'daily', priority: '0.8' },
      { url: '/cases', changefreq: 'weekly', priority: '0.7' },
      { url: '/contact-us', changefreq: 'monthly', priority: '0.7' },
    ];

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${services.map(service => `  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${service.updatedAt || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
${blogs.map(blog => `  <url>
    <loc>${baseUrl}/blogs/${blog.slug}</loc>
    <lastmod>${blog.publishedAt || blog.createdAt || new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Error generating sitemap' });
  }
}
