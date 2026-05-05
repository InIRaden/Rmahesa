import { AdminCrudManager } from '@/components/admin-crud-manager';
import { prisma } from '@/lib/prisma';

export default async function AdminDocumentationsPage() {
  const items = await prisma.documentation.findMany({ orderBy: { date: 'desc' } });

  return (
    <AdminCrudManager
      resource="documentations"
      title="Journey"
      description="Record activities, milestones, and moments from daily life."
      items={items as Array<{ id: string; [key: string]: unknown }>}
      primaryField="title"
      summaryFields={['slug', 'published']}
      fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'slug', label: 'Slug', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'imageUrl', label: 'Image URL', type: 'url' },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'published', label: 'Published', type: 'checkbox' }
      ]}
    />
  );
}
