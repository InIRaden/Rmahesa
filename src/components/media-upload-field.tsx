'use client';

import { ImageUp } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';

type MediaUploadFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder?: string;
  accept?: string;
  buttonLabel?: string;
  placeholder?: string;
  // If true, do not upload to Cloudinary; always convert file to a data URL and return it.
  inlineOnly?: boolean;
};

export function MediaUploadField({ label, value, onChange, folder = 'rmahesa', accept = 'image/*', buttonLabel = 'Upload image', placeholder, inlineOnly = false }: MediaUploadFieldProps) {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);

  async function fileToDataUrl(file: File) {
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ''));
      reader.onerror = () => reject(new Error('Failed to read file.'));
      reader.readAsDataURL(file);
    });
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setPending(true);
    setStatus('Uploading...');

    try {
      // If inlineOnly is set, skip remote upload and just convert to data URL
      if (inlineOnly) {
        const dataUrl = await fileToDataUrl(file);
        onChange(dataUrl);
        setStatus('Saved as data URL.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'Cloudinary is not configured.') {
          const dataUrl = await fileToDataUrl(file);
          onChange(dataUrl);
          setStatus('Cloudinary not configured. Saved locally as a data URL.');
          return;
        }

        setStatus(result.error ?? 'Upload failed.');
        return;
      }

      onChange(result.url as string);
      setStatus('Uploaded.');
    } catch (e) {
      setStatus('Upload failed.');
    } finally {
      setPending(false);
      event.target.value = '';
    }
  }

  return (
    <label className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{label}</span>
      <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-transparent px-4 py-3 dark:border-white/10">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder ?? 'Paste a URL or upload a file'}
          className="w-full bg-transparent outline-none placeholder:text-ink/35"
        />
        <div className="flex items-center justify-between gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-xs font-medium text-ink transition hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/5">
            <ImageUp className="h-4 w-4" />
            <span>{pending ? 'Uploading...' : buttonLabel}</span>
            <input type="file" accept={accept} onChange={handleUpload} className="hidden" />
          </label>
          {status ? <span className="text-xs text-ink/50 dark:text-white/50">{status}</span> : null}
        </div>
      </div>
    </label>
  );
}
