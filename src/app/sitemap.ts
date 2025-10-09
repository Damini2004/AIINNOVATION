import { MetadataRoute } from 'next'
import { getCourses, getEvents, getJournals } from '@/app/admin/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aiinsociety.in';

  // Static pages
  const staticRoutes = [
    '',
    '/aboutus',
    '/missionvision',
    '/partners',
    '/courses',
    '/studentinternships',
    '/curriculumsupport',
    '/upcomingevents',
    '/pastevents',
    '/hostevent',
    '/journals',
    '/hostjournal',
    '/associate-journal',
    '/digitallibrary',
    '/educationalresources',
    '/freecourses',
    '/become-a-member',
    '/institution-chapter',
    '/volunteer',
    '/types-of-memberships',
    '/membership-benefits',
    '/ourteam',
    '/contact-us',
    '/registrations',
    '/panel'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic pages
  const courses = await getCourses();
  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  const events = await getEvents();
  const eventRoutes = events.map((event) => ({
    url: `${baseUrl}/events/${event.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  const journals = await getJournals();
  const journalRoutes = journals.map((journal) => ({
    url: `${baseUrl}/journals/${journal.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }));


  return [...staticRoutes, ...courseRoutes, ...eventRoutes, ...journalRoutes];
}
