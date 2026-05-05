import { prisma } from '@/lib/prisma';
import { certificateSchema, contentSchemaByResource, documentationSchema, loginSchema, poemSchema, projectSchema, settingsSchema } from '@/lib/validators';
import { slugify } from '@/lib/slugs';

export type AdminResource = keyof typeof contentSchemaByResource | 'messages';

export function isAdminResource(resource: string): resource is AdminResource {
  return ['settings', 'projects', 'poems', 'documentations', 'certificates', 'messages'].includes(resource);
}

function parseArrayField(value: unknown) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

export async function listResource(resource: AdminResource) {
  switch (resource) {
    case 'settings': {
      const settings = await prisma.settings.findUnique({ where: { id: 1 } });
      return settings ? [{ ...settings, navItems: JSON.parse(settings.navItems), socialLinks: JSON.parse(settings.socialLinks) }] : [];
    }
    case 'projects':
      return prisma.project.findMany({ orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }] });
    case 'poems':
      return prisma.poem.findMany({ orderBy: { poemDate: 'desc' } });
    case 'documentations':
      return prisma.documentation.findMany({ orderBy: { date: 'desc' } });
    case 'certificates':
      return prisma.certificate.findMany({ orderBy: { date: 'desc' } });
    case 'messages':
      return prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
  }
}

export async function createResource(resource: AdminResource, body: unknown) {
  switch (resource) {
    case 'settings': {
      const parsed = settingsSchema.parse(body);
      return prisma.settings.upsert({
        where: { id: 1 },
        update: {
          ...parsed,
          navItems: JSON.stringify(parsed.navItems),
          socialLinks: JSON.stringify(parsed.socialLinks)
        },
        create: {
          id: 1,
          ...parsed,
          navItems: JSON.stringify(parsed.navItems),
          socialLinks: JSON.stringify(parsed.socialLinks)
        }
      });
    }
    case 'projects': {
      const parsed = projectSchema.parse(body);
      return prisma.project.create({
        data: {
          ...parsed,
          slug: parsed.slug || slugify(parsed.title),
          techStack: JSON.stringify(parseArrayField(parsed.techStack))
        }
      });
    }
    case 'poems': {
      const parsed = poemSchema.parse(body);
      return prisma.poem.create({
        data: {
          ...parsed,
          slug: parsed.slug || slugify(parsed.title),
          excerpt: parsed.excerpt || null,
          category: parsed.category || null,
          poemDate: new Date(parsed.poemDate)
        }
      });
    }
    case 'documentations': {
      const parsed = documentationSchema.parse(body);
      return prisma.documentation.create({
        data: {
          ...parsed,
          slug: parsed.slug || slugify(parsed.title),
          imageUrl: parsed.imageUrl || null,
          date: new Date(parsed.date)
        }
      });
    }
    case 'certificates': {
      const parsed = certificateSchema.parse(body);
      return prisma.certificate.create({
        data: {
          ...parsed,
          slug: parsed.slug || slugify(parsed.title),
          imageUrl: parsed.imageUrl || null,
          date: new Date(parsed.date)
        }
      });
    }
    case 'messages':
      throw new Error('Messages cannot be created through the admin API.');
  }
}

export async function updateResource(resource: AdminResource, id: string, body: unknown) {
  switch (resource) {
    case 'settings': {
      const parsed = settingsSchema.parse(body);
      return prisma.settings.upsert({
        where: { id: 1 },
        update: {
          ...parsed,
          navItems: JSON.stringify(parsed.navItems),
          socialLinks: JSON.stringify(parsed.socialLinks)
        },
        create: {
          id: 1,
          ...parsed,
          navItems: JSON.stringify(parsed.navItems),
          socialLinks: JSON.stringify(parsed.socialLinks)
        }
      });
    }
    case 'projects': {
      const parsed = projectSchema.parse(body);
      return prisma.project.update({
        where: { id },
        data: {
          ...parsed,
          slug: parsed.slug || slugify(parsed.title),
          techStack: JSON.stringify(parseArrayField(parsed.techStack))
        }
      });
    }
    case 'poems': {
      const parsed = poemSchema.parse(body);
      return prisma.poem.update({
        where: { id },
        data: {
          ...parsed,
          slug: parsed.slug || slugify(parsed.title),
          excerpt: parsed.excerpt || null,
          category: parsed.category || null,
          poemDate: new Date(parsed.poemDate)
        }
      });
    }
    case 'documentations': {
      const parsed = documentationSchema.parse(body);
      return prisma.documentation.update({
        where: { id },
        data: {
          ...parsed,
          slug: parsed.slug || slugify(parsed.title),
          imageUrl: parsed.imageUrl || null,
          date: new Date(parsed.date)
        }
      });
    }
    case 'certificates': {
      const parsed = certificateSchema.parse(body);
      return prisma.certificate.update({
        where: { id },
        data: {
          ...parsed,
          slug: parsed.slug || slugify(parsed.title),
          imageUrl: parsed.imageUrl || null,
          date: new Date(parsed.date)
        }
      });
    }
    case 'messages':
      throw new Error('Messages cannot be updated through the admin API.');
  }
}

export async function deleteResource(resource: AdminResource, id: string) {
  switch (resource) {
    case 'settings':
      return null;
    case 'projects':
      return prisma.project.delete({ where: { id } });
    case 'poems':
      return prisma.poem.delete({ where: { id } });
    case 'documentations':
      return prisma.documentation.delete({ where: { id } });
    case 'certificates':
      return prisma.certificate.delete({ where: { id } });
    case 'messages':
      return prisma.message.delete({ where: { id } });
  }
}

export { loginSchema };
