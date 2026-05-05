import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validators';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid message payload.' }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      ...parsed.data,
      content: parsed.data.content
    }
  });

  return NextResponse.json({ success: true, messageId: message.id });
}
