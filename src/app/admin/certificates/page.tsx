import { AdminCrudManager } from '@/components/admin-crud-manager';
import { prisma } from '@/lib/prisma';

export default async function AdminCertificatesPage() {
  const items = await prisma.certificate.findMany({ orderBy: { date: 'desc' } });

  return (
    <AdminCrudManager
      resource="certificates"
      title="Certificates"
      description="Upload certificates and control their visibility in the gallery."
      items={items as Array<{ id: string; [key: string]: unknown }>}
      primaryField="title"
      summaryFields={['issuer', 'published']}
      fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'slug', label: 'Slug', type: 'text' },
        { name: 'issuer', label: 'Issuer', type: 'text' },
        { name: 'imageUrl', label: 'Image URL', type: 'url' },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'published', label: 'Published', type: 'checkbox' }
      ]}
    />
  );
}
