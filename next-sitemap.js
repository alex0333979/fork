const siteUrl = 'https://passportphotos.com';
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/sitemap.xml`, `${siteUrl}/server-sitemap.xml`],
    policies: [
      {
        userAgent: '*',
        disallow: '/cart'
      },
      {
        userAgent: '*',
        disallow: '/server-sitemap.xml'
      },
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  },
  exclude: ['/cart', 'server-sitemap.xml']
};
