import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'change-me-now';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: 'Admin'
    },
    create: {
      name: 'Admin',
      email: adminEmail,
      passwordHash
    }
  });

  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      navItems: JSON.stringify([
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Poetry', href: '/poetry' },
        { label: 'Journey', href: '/journey' },
        { label: 'Certificates', href: '/certificates' },
        { label: 'Contact', href: '/contact' }
      ]),
      socialLinks: JSON.stringify([
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' }
      ])
    }
  });

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: 'Atlas Journal',
          slug: 'atlas-journal',
          description: 'A quiet editorial portfolio that blends journal notes, projects, and reflective storytelling.',
          imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
          techStack: JSON.stringify(['Next.js', 'Prisma', 'Tailwind']),
          githubUrl: 'https://github.com',
          liveUrl: 'https://vercel.com',
          featured: true,
          sortOrder: 1
        },
        {
          title: 'Poem Room',
          slug: 'poem-room',
          description: 'An intimate poetry reading space with elegant typography and soft transitions.',
          imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
          techStack: JSON.stringify(['Next.js', 'PostgreSQL', 'MDX']),
          featured: true,
          sortOrder: 2
        },
        {
          title: 'Life Notes',
          slug: 'life-notes',
          description: 'A documentation timeline for travel, milestones, and small moments worth keeping.',
          imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
          techStack: JSON.stringify(['Next.js', 'Framer', 'Neon']),
          featured: true,
          sortOrder: 3
        }
      ]
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
