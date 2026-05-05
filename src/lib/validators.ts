import { z } from 'zod';

const imageSourceSchema = z.string().min(1).refine((value) => {
  if (value.startsWith('data:image/')) {
    return true;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}, 'Must be a valid image URL or data URL');

export const socialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url()
});

export const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1)
});

export const settingsSchema = z.object({
  siteTitle: z.string().min(1),
  siteDescription: z.string().min(1),
  logoUrl: imageSourceSchema.optional().or(z.literal('')),
  faviconUrl: imageSourceSchema.optional().or(z.literal('')),
  footerText: z.string().min(1),
  themeColor: z.string().min(1),
  socialLinks: z.array(socialLinkSchema),
  navItems: z.array(navItemSchema),
  heroHeadline: z.string().min(1),
  heroSubheadline: z.string().min(1),
  heroProfileImage: imageSourceSchema.optional().or(z.literal('')),
  heroPrimaryLabel: z.string().min(1),
  heroPrimaryHref: z.string().min(1),
  heroSecondaryLabel: z.string().min(1),
  heroSecondaryHref: z.string().min(1),
  aboutTitle: z.string().min(1),
  aboutSummary: z.string().min(1),
  aboutBody: z.string().min(1),
  aboutImageUrl: imageSourceSchema.optional().or(z.literal('')),
  seoTitle: z.string().optional().or(z.literal('')),
  seoDescription: z.string().optional().or(z.literal(''))
});

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  imageUrl: imageSourceSchema.optional().or(z.literal('')),
  techStack: z.array(z.string().min(1)),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z.number().int().min(0)
});

export const poemSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional().or(z.literal('')),
  category: z.string().optional().or(z.literal('')),
  published: z.boolean(),
  poemDate: z.string().min(1)
});

export const documentationSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  imageUrl: imageSourceSchema.optional().or(z.literal('')),
  date: z.string().min(1),
  published: z.boolean()
});

export const certificateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  issuer: z.string().min(1),
  imageUrl: imageSourceSchema.optional().or(z.literal('')),
  date: z.string().min(1),
  published: z.boolean()
});

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  content: z.string().min(1)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const contentSchemaByResource = {
  settings: settingsSchema,
  projects: projectSchema,
  poems: poemSchema,
  documentations: documentationSchema,
  certificates: certificateSchema
} as const;

export type ContentResource = keyof typeof contentSchemaByResource;
