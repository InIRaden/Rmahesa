import { prisma } from '@/lib/prisma';

function parseJsonArray<T>(value: string | null | undefined): T[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

const defaultSettings = {
  id: 1,
  siteTitle: 'Rmahesa',
  siteDescription: 'A calm portfolio for a developer who writes poetry and documents life.',
  logoUrl: null,
  faviconUrl: null,
  footerText: 'A digital journal of code, poems, and moments.',
  themeColor: '#171717',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' }
  ],
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Poetry', href: '/poetry' },
    { label: 'Journey', href: '/journey' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Contact', href: '/contact' }
  ],
  heroHeadline: 'I build digital experiences and capture moments in words',
  heroSubheadline: 'A web developer and poetry writer shaping quiet, expressive experiences for the web.',
  heroProfileImage:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  heroPrimaryLabel: 'Explore Portfolio',
  heroPrimaryHref: '/portfolio',
  heroSecondaryLabel: 'Read My Poetry',
  heroSecondaryHref: '/poetry',
  aboutTitle: 'About',
  aboutSummary: 'I write code with structure, but I live by feeling. My work sits at the intersection of craft, memory, and meaning.',
  aboutBody:
    'I build interfaces that feel calm, intentional, and human. Outside of development, I write poetry and document the small, meaningful moments that shape a life.',
  aboutImageUrl:
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80',
  seoTitle: 'Rmahesa | Portfolio, Poetry, and Journey',
  seoDescription: 'A premium personal website for a developer, poet, and life documentarian.',
  createdAt: new Date(),
  updatedAt: new Date()
};

export async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({ where: { id: 1 } });
    if (!settings) {
      return defaultSettings;
    }

    return {
      ...settings,
      navItems: parseJsonArray<{ label: string; href: string }>(settings.navItems),
      socialLinks: parseJsonArray<{ label: string; href: string }>(settings.socialLinks)
    };
  } catch {
    return defaultSettings;
  }
}

export async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: 4
    });
  } catch {
    return [];
  }
}

export async function getAllProjects() {
  try {
    return await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }]
    });
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await prisma.project.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function getFeaturedPoems() {
  try {
    return await prisma.poem.findMany({ where: { published: true }, orderBy: { poemDate: 'desc' }, take: 2 });
  } catch {
    return [];
  }
}

export async function getAllPoems() {
  try {
    return await prisma.poem.findMany({ where: { published: true }, orderBy: { poemDate: 'desc' } });
  } catch {
    return [];
  }
}

export async function getJourneyItems() {
  try {
    return await prisma.documentation.findMany({ where: { published: true }, orderBy: { date: 'desc' }, take: 6 });
  } catch {
    return [];
  }
}

export async function getAllJourneyItems() {
  try {
    return await prisma.documentation.findMany({ where: { published: true }, orderBy: { date: 'desc' } });
  } catch {
    return [];
  }
}

export async function getJourneyBySlug(slug: string) {
  try {
    return await prisma.documentation.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function getFeaturedCertificates() {
  try {
    return await prisma.certificate.findMany({ where: { published: true }, orderBy: { date: 'desc' }, take: 6 });
  } catch {
    return [];
  }
}

export async function getAllCertificates() {
  try {
    return await prisma.certificate.findMany({ where: { published: true }, orderBy: { date: 'desc' } });
  } catch {
    return [];
  }
}

export async function getAdminStats() {
  try {
    const [projects, poems, docs, certificates, resumes, messages] = await Promise.all([
      prisma.project.count(),
      prisma.poem.count(),
      prisma.documentation.count(),
      prisma.certificate.count(),
      prisma.resume.count(),
      prisma.message.count()
    ]);

    return {
      projects,
      poems,
      docs,
      certificates,
      resumes,
      messages
    };
  } catch {
    return {
      projects: 0,
      poems: 0,
      docs: 0,
      certificates: 0,
      resumes: 0,
      messages: 0
    };
  }
}

export async function getLatestResume() {
  try {
    const activeResume = await prisma.resume.findFirst({ where: { active: true }, orderBy: { updatedAt: 'desc' } });
    if (activeResume) {
      return activeResume;
    }

    return await prisma.resume.findFirst({ orderBy: { createdAt: 'desc' } });
  } catch {
    return null;
  }
}

export async function getPublicNavigation() {
  const settings = await getSettings();
  return settings.navItems as Array<{ label: string; href: string }>;
}

export async function getSocialLinks() {
  const settings = await getSettings();
  return settings.socialLinks as Array<{ label: string; href: string }>;
}

export function readTechStack(value: string | null | undefined) {
  return parseJsonArray<string>(value);
}
