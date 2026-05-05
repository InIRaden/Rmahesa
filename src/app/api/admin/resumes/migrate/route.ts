import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSessionFromRequest } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getAdminSessionFromRequest(request as any);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({ where: { fileUrl: { not: null }, fileData: null } });
  const results: Array<{ id: string; ok: boolean; error?: string }> = [];

  for (const r of resumes) {
    try {
      const resp = await fetch(r.fileUrl!);
      if (!resp.ok) {
        results.push({ id: r.id, ok: false, error: `Fetch failed ${resp.status}` });
        continue;
      }

      const contentType = resp.headers.get('content-type') ?? 'application/pdf';
      const arrayBuffer = await resp.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const b64 = buffer.toString('base64');
      const dataUrl = `data:${contentType};base64,${b64}`;

      await prisma.resume.update({ where: { id: r.id }, data: { fileData: dataUrl, fileUrl: null } });
      results.push({ id: r.id, ok: true });
    } catch (err: any) {
      results.push({ id: r.id, ok: false, error: String(err?.message ?? err) });
    }
  }

  return NextResponse.json({ results });
}

export const runtime = 'nodejs';
