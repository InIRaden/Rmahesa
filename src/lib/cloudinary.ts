import crypto from 'node:crypto';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? '';
const apiKey = process.env.CLOUDINARY_API_KEY ?? '';
const apiSecret = process.env.CLOUDINARY_API_SECRET ?? '';

export function cloudinaryConfigured() {
  return Boolean(cloudName && apiKey && apiSecret);
}

export function buildCloudinaryUploadUrl(resourceType: 'image' | 'raw' = 'image') {
  if (!cloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured.');
  }

  return `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
}

export function signCloudinaryRequest(params: Record<string, string>) {
  const serialized = Object.entries(params)
    .filter(([, value]) => value !== '')
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto.createHash('sha1').update(`${serialized}${apiSecret}`).digest('hex');
}

export async function uploadToCloudinary(file: File, folder = 'rmahesa', resourceType: 'image' | 'raw' = 'image') {
  if (!cloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured.');
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  const params = {
    folder,
    timestamp,
    ...(uploadPreset ? { upload_preset: uploadPreset } : {})
  };
  const signature = signCloudinaryRequest(params);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);

  if (uploadPreset) {
    formData.append('upload_preset', uploadPreset);
  }

  const response = await fetch(buildCloudinaryUploadUrl(resourceType), {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Cloudinary upload failed.');
  }

  const result = (await response.json()) as { secure_url?: string };
  if (!result.secure_url) {
    throw new Error('Cloudinary upload returned no URL.');
  }

  return result.secure_url;
}
