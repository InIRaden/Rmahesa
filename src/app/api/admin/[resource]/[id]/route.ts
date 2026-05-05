import { NextResponse } from 'next/server';
import { deleteResource, isAdminResource, updateResource } from '@/lib/admin-resources';

export async function PATCH(request: Request, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  }

  if (resource === 'messages') {
    return NextResponse.json({ error: 'Messages cannot be updated.' }, { status: 405 });
  }

  const body = await request.json();
  const item = await updateResource(resource, id, body);
  return NextResponse.json({ item });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  }

  const item = await deleteResource(resource, id);
  return NextResponse.json({ item });
}
