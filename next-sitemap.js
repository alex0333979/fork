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
        allow: '/'
      }
    ]
  },
  exclude: ['/cart']
};
