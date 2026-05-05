'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';
import { MediaUploadField } from '@/components/media-upload-field';

type FieldType = 'text' | 'textarea' | 'url' | 'number' | 'checkbox' | 'date' | 'array';

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
};

type AdminItem = {
  id: string;
  [key: string]: unknown;
};

type AdminCrudManagerProps = {
  resource: string;
  title: string;
  description?: string;
  items: AdminItem[];
  fields: FieldConfig[];
  primaryField: string;
  summaryFields?: string[];
  createLabel?: string;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
};

function initialFormValue(field: FieldConfig) {
  switch (field.type) {
    case 'checkbox':
      return false;
    case 'number':
      return '0';
    case 'date':
      return new Date().toISOString().slice(0, 10);
    default:
      return '';
  }
}

function normaliseFieldValue(field: FieldConfig, value: unknown) {
  if (field.type === 'checkbox') {
    return Boolean(value);
  }

  if (field.type === 'array') {
    if (Array.isArray(value)) {
      return value.join(', ');
    }

    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.join(', ') : value;
      } catch {
        return value;
      }
    }
  }

  if (field.type === 'date' && value) {
    const date = value instanceof Date ? value : new Date(String(value));
    return date.toISOString().slice(0, 10);
  }

  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

export function AdminCrudManager({
  resource,
  title,
  description,
  items: initialItems,
  fields,
  primaryField,
  summaryFields = [],
  createLabel = 'Create',
  canCreate = true,
  canEdit = true,
  canDelete = true
}: AdminCrudManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, initialFormValue(field)]))
  );
  const [status, setStatus] = useState('');

  function startCreate() {
    if (!canCreate) {
      return;
    }

    setEditingId(null);
    setForm(Object.fromEntries(fields.map((field) => [field.name, initialFormValue(field)])));
    setStatus('');
  }

  function startEdit(item: AdminItem) {
    if (!canEdit) {
      return;
    }

    setEditingId(item.id as string);
    const nextForm = Object.fromEntries(fields.map((field) => [field.name, normaliseFieldValue(field, item[field.name])])) as Record<string, string | boolean>;
    setForm(nextForm);
    setStatus('');
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      const value = form[field.name];
      if (field.type === 'checkbox') {
        payload[field.name] = Boolean(value);
      } else if (field.type === 'number') {
        payload[field.name] = Number(value);
      } else if (field.type === 'array') {
        payload[field.name] = String(value)
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
      } else {
        payload[field.name] = value;
      }
    }

    const method = editingId ? 'PATCH' : 'POST';
    const endpoint = editingId ? `/api/admin/${resource}/${editingId}` : `/api/admin/${resource}`;
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) {
      setStatus(result.error ?? 'Unable to save item.');
      return;
    }

    const savedItem = result.item as AdminItem;
    setItems((current) => {
      const withoutCurrent = current.filter((item) => item.id !== savedItem.id);
      return editingId ? [savedItem, ...withoutCurrent] : [savedItem, ...current];
    });
    setStatus('Saved successfully.');
    startCreate();
  }

  async function deleteItem(id: string) {
    const response = await fetch(`/api/admin/${resource}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      setStatus('Unable to delete item.');
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));
    setStatus('Deleted successfully.');
  }

  const showForm = fields.length > 0 && (canCreate || canEdit);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h2 className="font-serif text-4xl text-ink dark:text-white">{title}</h2>
          {description ? <p className="max-w-2xl text-sm leading-7 text-ink/65 dark:text-white/60">{description}</p> : null}
        </div>
        {canCreate ? (
          <button type="button" onClick={startCreate} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:-translate-y-0.5 dark:bg-paper dark:text-ink">
            {createLabel}
          </button>
        ) : null}
      </div>

      {showForm ? (
        <form onSubmit={submitForm} className="space-y-4 rounded-[1.75rem] border border-black/8 bg-white/75 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => {
              if (field.type === 'textarea') {
                return (
                  <label key={field.name} className="space-y-2 md:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{field.label}</span>
                    <textarea
                      value={String(form[field.name] ?? '')}
                      onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                      rows={4}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none placeholder:text-ink/35 dark:border-white/10"
                    />
                  </label>
                );
              }

              if (field.type === 'checkbox') {
                return (
                  <label key={field.name} className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 dark:border-white/10">
                    <input
                      type="checkbox"
                      checked={Boolean(form[field.name])}
                      onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.checked }))}
                    />
                    <span className="text-sm text-ink/75 dark:text-white/70">{field.label}</span>
                  </label>
                );
              }

              const inputType = field.type === 'array' ? 'text' : field.type;
              const fieldName = field.name.toLowerCase();
              const useUpload = field.type === 'url' && (fieldName.includes('image') || fieldName.includes('logo') || fieldName.includes('favicon'));

              return useUpload ? (
                <div key={field.name} className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{field.label}</span>
                  <MediaUploadField
                    label={field.label}
                    value={String(form[field.name] ?? '')}
                    onChange={(value) => setForm((current) => ({ ...current, [field.name]: value }))}
                    folder={`rmahesa/${resource}`}
                  />
                </div>
              ) : (
                <label key={field.name} className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{field.label}</span>
                  <input
                    type={inputType}
                    value={String(form[field.name] ?? '')}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none placeholder:text-ink/35 dark:border-white/10"
                  />
                </label>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:-translate-y-0.5 dark:bg-paper dark:text-ink">
              {editingId ? 'Update item' : 'Save item'}
            </button>
            {status ? <p className="text-sm text-ink/60 dark:text-white/60">{status}</p> : null}
          </div>
        </form>
      ) : null}

      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="rounded-[1.5rem] border border-black/8 bg-white/75 p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-3xl text-ink dark:text-white">{String(item[primaryField] ?? 'Untitled')}</h3>
                <p className="text-sm text-ink/65 dark:text-white/60">
                  {summaryFields.map((field) => String(item[field] ?? '')).filter(Boolean).join(' · ')}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {canEdit ? (
                  <button type="button" onClick={() => startEdit(item)} className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-ink transition hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/5">
                    Edit
                  </button>
                ) : null}
                {canDelete ? (
                  <button type="button" onClick={() => deleteItem(item.id)} className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-ink transition hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/5">
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
