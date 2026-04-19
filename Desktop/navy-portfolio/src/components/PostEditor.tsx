'use client';
// src/components/PostEditor.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { POST_TYPES } from '@/types';

interface PostData {
  title: string;
  content: string;
  excerpt: string;
  type: string;
  tags: string;
  published: boolean;
}

interface Props {
  initial?: Partial<PostData>;
  postId?: string;
  mode: 'create' | 'edit';
}

export default function PostEditor({ initial, postId, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PostData>({
    title: initial?.title ?? '',
    content: initial?.content ?? '',
    excerpt: initial?.excerpt ?? '',
    type: initial?.type ?? 'Article',
    tags: initial?.tags ?? '',
    published: initial?.published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  const set = (key: keyof PostData, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    setError('');

    const tagsArray = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const body = {
      ...form,
      tags: tagsArray,
      published: publish !== undefined ? publish : form.published,
    };

    try {
      const url = mode === 'create' ? '/api/posts' : `/api/posts/${postId}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Save failed.');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('Network error. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* ── Admin Nav ── */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="signal-dot" />
            <span className="font-mono text-xs text-muted tracking-widest">
              {mode === 'create' ? 'NEW TRANSMISSION' : 'EDIT TRANSMISSION'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreview((p) => !p)}
              className={`font-mono text-xs transition-colors ${preview ? 'text-signal' : 'text-muted hover:text-ink-2'}`}
            >
              {preview ? 'EDITOR' : 'PREVIEW'}
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="font-mono text-xs text-muted hover:text-ink-2 transition-colors"
            >
              ← CANCEL
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main editor ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title */}
            <input
              type="text"
              placeholder="Title..."
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="w-full bg-transparent border-0 border-b border-border text-ink font-serif text-3xl py-3 focus:outline-none focus:border-border-2 placeholder:text-muted/30 transition-colors"
            />

            {/* Excerpt */}
            <textarea
              placeholder="Excerpt (optional — shown in cards)"
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              rows={2}
              className="admin-input resize-none text-sm"
            />

            {/* Content */}
            {!preview ? (
              <textarea
                placeholder="Write in Markdown..."
                value={form.content}
                onChange={(e) => set('content', e.target.value)}
                rows={28}
                className="admin-input resize-y text-sm font-mono leading-relaxed"
              />
            ) : (
              <div className="min-h-[400px] border border-border p-6 bg-surface">
                <div className="prose-navy">
                  <p className="font-mono text-[10px] text-muted mb-6 tracking-widest">PREVIEW MODE</p>
                  <pre className="whitespace-pre-wrap font-sans text-sm text-ink-2 leading-relaxed">
                    {form.content || 'No content yet.'}
                  </pre>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 font-mono text-[10px] text-muted">
              <span>{wordCount} words</span>
              <span>·</span>
              <span>~{readTime} min read</span>
              <span>·</span>
              <span>{form.content.length} chars</span>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Publish actions */}
            <div className="border border-border p-4 space-y-3">
              <p className="font-mono text-[10px] text-muted tracking-widest mb-4">PUBLISH</p>

              {error && (
                <p className="font-mono text-xs text-rose-400">{error}</p>
              )}

              <button
                onClick={() => handleSave(true)}
                disabled={saving || !form.title || !form.content}
                className="admin-btn-primary w-full disabled:opacity-40"
              >
                {saving ? 'SAVING...' : 'PUBLISH NOW'}
              </button>

              <button
                onClick={() => handleSave(false)}
                disabled={saving || !form.title}
                className="admin-btn-secondary w-full disabled:opacity-40"
              >
                SAVE AS DRAFT
              </button>

              {mode === 'edit' && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={form.published}
                    onChange={(e) => set('published', e.target.checked)}
                    className="accent-signal"
                  />
                  <label htmlFor="published" className="font-mono text-xs text-muted">
                    Published
                  </label>
                </div>
              )}
            </div>

            {/* Type */}
            <div className="border border-border p-4">
              <p className="font-mono text-[10px] text-muted tracking-widest mb-3">TYPE / FREQUENCY</p>
              <div className="space-y-1">
                {POST_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => set('type', type)}
                    className={`w-full text-left font-mono text-xs px-3 py-2 border transition-all duration-200 ${
                      form.type === type
                        ? 'border-signal text-signal bg-signal/5'
                        : 'border-transparent text-muted hover:text-ink-2 hover:border-border'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="border border-border p-4">
              <p className="font-mono text-[10px] text-muted tracking-widest mb-3">TAGS</p>
              <input
                type="text"
                placeholder="tag1, tag2, tag3"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                className="admin-input text-xs"
              />
              <p className="font-mono text-[10px] text-muted mt-2">Comma-separated</p>
            </div>

            {/* Markdown cheatsheet */}
            <div className="border border-border p-4">
              <p className="font-mono text-[10px] text-muted tracking-widest mb-3">MARKDOWN CHEAT</p>
              <div className="space-y-1.5 font-mono text-[10px] text-muted">
                {[
                  ['# Heading 1', '## Heading 2'],
                  ['**bold**', '*italic*'],
                  ['> blockquote', '`code`'],
                  ['```code block```', '---'],
                  ['[link](url)', '- list item'],
                ].map((row, i) => (
                  <div key={i} className="flex gap-4">
                    {row.map((item) => (
                      <code key={item} className="text-ink-2/60">{item}</code>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
