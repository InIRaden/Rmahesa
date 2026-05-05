import { NextResponse } from 'next/server';
import { uploadToCloudinary, cloudinaryConfigured } from '@/lib/cloudinary';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!cloudinaryConfigured()) {
    return NextResponse.json({ error: 'Cloudinary is not configured.' }, { status: 400 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const folder = String(formData.get('folder') ?? 'rmahesa');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file was provided.' }, { status: 400 });
  }

  try {
    const resourceType = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf') ? 'raw' : 'image';
    const url = await uploadToCloudinary(file, folder, resourceType);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: 'Unable to upload file.' }, { status: 500 });
  }
}
