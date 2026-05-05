import { NextResponse } from 'next/server';
import { createResource, isAdminResource, listResource, updateResource } from '@/lib/admin-resources';

export async function GET(_request: Request, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  }

  const items = await listResource(resource);
  return NextResponse.json({ items });
}

export async function POST(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  }

  if (resource === 'messages') {
    return NextResponse.json({ error: 'Messages cannot be created.' }, { status: 405 });
  }

  const body = await request.json();
  const item = await createResource(resource, body);
  return NextResponse.json({ item });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;

  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  }

  if (resource !== 'settings') {
    return NextResponse.json({ error: 'Unsupported operation.' }, { status: 405 });
  }

  const body = await request.json();
  const item = await updateResource(resource, '1', body);
  return NextResponse.json({ item });
}
