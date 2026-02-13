import News from '../models/News.js';
import Realisation from '../models/Realisation.js';
import fs from 'fs';
import path from 'path';

// Generate sitemap.xml
export const generateSitemap = async (baseUrl) => {
    try {
        // Get all published news
        const news = await News.findAll({
            where: { status: 'published' },
            attributes: ['slug', 'updatedAt']
        });

        // Get all realisations
        const realisations = await Realisation.findAll({
            attributes: ['slug', 'updatedAt']
        });

        // Static pages
        const staticPages = [
            { url: '/', changefreq: 'weekly', priority: '1.0' },
            { url: '/solutions', changefreq: 'monthly', priority: '0.9' },
            { url: '/solutions/agricole', changefreq: 'monthly', priority: '0.8' },
            { url: '/solutions/photovoltaique', changefreq: 'monthly', priority: '0.8' },
            { url: '/solutions/industriel', changefreq: 'monthly', priority: '0.8' },
            { url: '/solutions/ouvrages-art', changefreq: 'monthly', priority: '0.8' },
            { url: '/bureau-production', changefreq: 'monthly', priority: '0.7' },
            { url: '/realisations', changefreq: 'weekly', priority: '0.9' },
            { url: '/implantations', changefreq: 'monthly', priority: '0.7' },
            { url: '/a-propos', changefreq: 'monthly', priority: '0.7' },
            { url: '/contact', changefreq: 'monthly', priority: '0.8' },
            { url: '/actualites', changefreq: 'daily', priority: '0.9' }
        ];

        // Build XML
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add static pages
        staticPages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += '  </url>\n';
        });

        // Add news articles
        news.forEach(article => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/actualites/${article.slug}</loc>\n`;
            xml += `    <lastmod>${article.updatedAt.toISOString().split('T')[0]}</lastmod>\n`;
            xml += '    <changefreq>monthly</changefreq>\n';
            xml += '    <priority>0.8</priority>\n';
            xml += '  </url>\n';
        });

        // Add realisations
        realisations.forEach(realisation => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/realisations/${realisation.slug}</loc>\n`;
            xml += `    <lastmod>${realisation.updatedAt.toISOString().split('T')[0]}</lastmod>\n`;
            xml += '    <changefreq>monthly</changefreq>\n';
            xml += '    <priority>0.7</priority>\n';
            xml += '  </url>\n';
        });

        xml += '</urlset>';

        // Write to public directory
        const publicDir = path.join(process.cwd(), '..', 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
        console.log('✅ Sitemap generated successfully');

        return xml;
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        throw error;
    }
};

// Generate robots.txt
export const generateRobotsTxt = (baseUrl) => {
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${baseUrl}/sitemap.xml
`;

    const publicDir = path.join(process.cwd(), '..', 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
    console.log('✅ robots.txt generated successfully');

    return robotsTxt;
};
