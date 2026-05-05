import { AdminCrudManager } from '@/components/admin-crud-manager';
import { prisma } from '@/lib/prisma';

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminCrudManager
      resource="messages"
      title="Messages"
      description="Review incoming contact messages and remove them after handling."
      items={messages as Array<{ id: string; [key: string]: unknown }>}
      primaryField="subject"
      summaryFields={['name', 'email', 'createdAt']}
      canCreate={false}
      canEdit={false}
      createLabel="New message"
      fields={[]}
    />
  );
}
