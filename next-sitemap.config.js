module.exports = {
    siteUrl: 'https://oshimaru.com',
    generateRobotsTxt: true, // robots.txtも生成
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/admin/login'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://oshimaru.com/sitemap.xml',
        ],
        policies: [
            { userAgent: '*', allow: '/' }
        ]
    }
}