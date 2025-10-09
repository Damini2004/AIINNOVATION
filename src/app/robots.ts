import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dashboard', '/panel', '/user-dashboard'],
    },
    sitemap: 'https://aiinsociety.in/sitemap.xml',
  }
}
