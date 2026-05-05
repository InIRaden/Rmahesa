import { AdminCrudManager } from '@/components/admin-crud-manager';
import { prisma } from '@/lib/prisma';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }] });

  return (
    <AdminCrudManager
      resource="projects"
      title="Projects"
      description="Manage portfolio projects with featured status, links, and tech stack."
      items={projects as Array<{ id: string; [key: string]: unknown }>}
      primaryField="title"
      summaryFields={['slug', 'published']}
      fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'slug', label: 'Slug', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'imageUrl', label: 'Image URL', type: 'url' },
        { name: 'techStack', label: 'Tech stack', type: 'array', placeholder: 'Next.js, Prisma, Tailwind' },
        { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
        { name: 'liveUrl', label: 'Live URL', type: 'url' },
        { name: 'featured', label: 'Featured', type: 'checkbox' },
        { name: 'published', label: 'Published', type: 'checkbox' },
        { name: 'sortOrder', label: 'Sort order', type: 'number' }
      ]}
    />
  );
}
