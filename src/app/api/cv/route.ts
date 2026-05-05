import { NextResponse } from 'next/server';
import { getLatestResume } from '@/lib/content';

export const runtime = 'nodejs';

function safeFilename(value: string) {
  return value.replace(/[^a-z0-9._-]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'Rmahesa-CV.pdf';
}

export async function GET() {
  const resume = await getLatestResume();

  if (!resume) {
    return NextResponse.json({ error: 'No CV has been uploaded yet.' }, { status: 404 });
  }
  const fileData = String(resume.fileData ?? '').trim();
  const fileUrl = String(resume.fileUrl ?? '').trim();

  // If the resume was stored as inline data (fileData), decode and return it
  if (fileData.startsWith('data:')) {
    const match = fileData.match(/^data:(.+);base64,(.*)$/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid data URL stored for CV.' }, { status: 500 });
    }

    const mime = match[1] || 'application/pdf';
    const b64 = match[2] || '';
    try {
      const buffer = Buffer.from(b64, 'base64');
      const headers = new Headers();
      headers.set('Content-Type', mime);
      headers.set('Content-Disposition', `attachment; filename="${safeFilename(resume.fileName || `${resume.title}.pdf`)}"`);
      return new Response(buffer, { status: 200, headers });
    } catch {
      return NextResponse.json({ error: 'Unable to decode stored CV data.' }, { status: 500 });
    }
  }

  // If the stored URL is a data URL (legacy stored in fileUrl), decode and return it with correct headers
  if (fileUrl.startsWith('data:')) {
    const match = fileUrl.match(/^data:(.+);base64,(.*)$/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid data URL stored for CV.' }, { status: 500 });
    }

    const mime = match[1] || 'application/pdf';
    const b64 = match[2] || '';
    try {
      const buffer = Buffer.from(b64, 'base64');
      const headers = new Headers();
      headers.set('Content-Type', mime);
      headers.set('Content-Disposition', `attachment; filename="${safeFilename(resume.fileName || `${resume.title}.pdf`)}"`);
      return new Response(buffer, { status: 200, headers });
    } catch {
      return NextResponse.json({ error: 'Unable to decode stored CV data.' }, { status: 500 });
    }
  }

  // Prefer redirecting the browser to the file URL; this avoids server-side fetch issues and lets the CDN/host serve file directly
  if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    try {
      return NextResponse.redirect(fileUrl);
    } catch {
      // fallback: attempt to fetch and stream
    }
  }

  // Fallback: try to fetch and stream the file from server
  try {
    const response = await fetch(fileUrl);
    if (!response.ok || !response.body) {
      return NextResponse.json({ error: 'Unable to fetch the CV file.' }, { status: 502 });
    }

    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('content-type') ?? 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${safeFilename(resume.fileName || `${resume.title}.pdf`)}"`);

    return new Response(response.body, { status: 200, headers });
  } catch {
    return NextResponse.json({ error: 'Unable to fetch the CV file.' }, { status: 502 });
  }
}