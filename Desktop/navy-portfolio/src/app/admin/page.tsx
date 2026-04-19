'use client';
// src/app/admin/page.tsx

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Post, parseTags, readingTime, formatDate, TYPE_COLORS } from '@/types';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
  }, [status, router]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts?published=all&limit=100');
      const data = await res.json();
      setPosts(data.posts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchPosts();
  }, [session]);

  const togglePublish = async (post: Post) => {
    await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, published: !post.published }),
    });
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    setDeleting(id);
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setDeleting(null);
    fetchPosts();
  };

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <span className="font-mono text-xs text-muted">LOADING...</span>
      </div>
    );
  }

  const filtered = (posts || []).filter((p) => {
    if (filter === 'published') return p.published;
    if (filter === 'draft') return !p.published;
    return true;
  });

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* ── Admin Nav ── */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="signal-dot" />
            <span className="font-mono text-xs text-muted tracking-widest">NAVY.SYS · ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-xs text-muted hover:text-ink-2 transition-colors">
              ← VIEW SITE
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="font-mono text-xs text-muted hover:text-rose-400 transition-colors"
            >
              SIGN OUT
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-mono text-xl text-ink mb-1">Dashboard</h1>
            <p className="font-mono text-xs text-muted">
              {(posts || []).filter((p) => p.published).length} published ·{' '}
              {(posts || []).filter((p) => !p.published).length} drafts ·{' '}
              {(posts || []).length} total
            </p>
          </div>
          <Link href="/admin/new" className="admin-btn-primary">
            + NEW POST
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 border-b border-border">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-[10px] tracking-widest px-4 py-2 border-b-2 transition-colors duration-200 ${
                filter === f
                  ? 'border-signal text-signal'
                  : 'border-transparent text-muted hover:text-ink-2'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Posts table */}
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-surface animate-pulse border border-border" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="border border-border p-12 text-center">
            <p className="font-mono text-xs text-muted">NO POSTS FOUND</p>
          </div>
        ) : (
          <div className="border border-border divide-y divide-border">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-surface">
              <span className="col-span-1 font-mono text-[10px] text-muted tracking-widest">TYPE</span>
              <span className="col-span-4 font-mono text-[10px] text-muted tracking-widest">TITLE</span>
              <span className="col-span-2 font-mono text-[10px] text-muted tracking-widest">DATE</span>
              <span className="col-span-1 font-mono text-[10px] text-muted tracking-widest text-right">VIEWS</span>
              <span className="col-span-2 font-mono text-[10px] text-muted tracking-widest text-center">STATUS</span>
              <span className="col-span-2 font-mono text-[10px] text-muted tracking-widest text-right">ACTIONS</span>
            </div>

            {filtered.map((post) => {
              const typeColor = TYPE_COLORS[post.type] || '';
              return (
                <div
                  key={post.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-surface transition-colors duration-150 items-center"
                >
                  <div className="col-span-1">
                    <span className={`font-mono text-[10px] border px-1.5 py-0.5 ${typeColor}`}>
                      {post.type.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <Link
                      href={`/admin/edit/${post.id}`}
                      className="font-sans text-sm text-ink hover:text-signal transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                    <p className="font-mono text-[10px] text-muted mt-0.5">{post.slug}</p>
                  </div>
                  <div className="col-span-2 font-mono text-[10px] text-muted">
                    {post.publishedAt ? formatDate(post.publishedAt) : '—'}
                  </div>
                  <div className="col-span-1 font-mono text-[10px] text-muted text-right tabular-nums">
                    {post.views}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => togglePublish(post)}
                      className={`font-mono text-[10px] px-2 py-1 border transition-all duration-200 ${
                        post.published
                          ? 'border-signal/30 text-signal hover:bg-signal/10'
                          : 'border-muted/30 text-muted hover:border-border-2'
                      }`}
                    >
                      {post.published ? 'PUBLISHED' : 'DRAFT'}
                    </button>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 justify-end">
                    <Link
                      href={`/writing/${post.slug}`}
                      target="_blank"
                      className="font-mono text-[10px] text-muted hover:text-ink-2 transition-colors"
                      title="View post"
                    >
                      ↗
                    </Link>
                    <Link
                      href={`/admin/edit/${post.id}`}
                      className="font-mono text-[10px] text-muted hover:text-ink-2 transition-colors"
                    >
                      EDIT
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      disabled={deleting === post.id}
                      className="font-mono text-[10px] text-muted hover:text-rose-400 transition-colors disabled:opacity-50"
                    >
                      {deleting === post.id ? '...' : 'DEL'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
