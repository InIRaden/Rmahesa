import { AdminCrudManager } from '@/components/admin-crud-manager';
import { prisma } from '@/lib/prisma';

export default async function AdminPoemsPage() {
  const poems = await prisma.poem.findMany({ orderBy: { poemDate: 'desc' } });

  return (
    <AdminCrudManager
      resource="poems"
      title="Poetry"
      description="Manage poetic entries and publish them to the reading page."
      items={poems as Array<{ id: string; [key: string]: unknown }>}
      primaryField="title"
      summaryFields={['slug', 'category', 'published']}
      fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'slug', label: 'Slug', type: 'text' },
        { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { name: 'content', label: 'Content', type: 'textarea' },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'poemDate', label: 'Date', type: 'date' },
        { name: 'published', label: 'Published', type: 'checkbox' }
      ]}
    />
  );
}
