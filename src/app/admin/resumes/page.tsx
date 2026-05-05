import { AdminCrudManager } from '@/components/admin-crud-manager';
import { prisma } from '@/lib/prisma';

export default async function AdminResumesPage() {
  const items = await prisma.resume.findMany({ orderBy: [{ active: 'desc' }, { createdAt: 'desc' }] });

  return (
    <AdminCrudManager
      resource="resumes"
      title="CVs"
      description="Upload, activate, and delete your resume files. The public download button uses the latest active CV."
      items={items as Array<{ id: string; [key: string]: unknown }>}
      primaryField="title"
      summaryFields={['fileName', 'active']}
      createLabel="Add CV"
      fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'fileData', label: 'CV File', type: 'file', inlineOnly: true },
        { name: 'fileName', label: 'File name', type: 'text', placeholder: 'Rmahesa-CV.pdf' },
        { name: 'active', label: 'Active', type: 'checkbox' }
      ]}
    />
  );
}