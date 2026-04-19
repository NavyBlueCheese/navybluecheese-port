'use client';
// src/app/writing/page.tsx

import { useState, useEffect, useCallback } from 'react';
import TransmissionCard from '@/components/TransmissionCard';
import { Post, POST_TYPES } from '@/types';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'most-read', label: 'Most Read' },
];

export default function WritingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const LIMIT = 8;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...(filter !== 'All' && { type: filter }),
        ...(search && { search }),
        limit: String(LIMIT),
        page: String(page),
      });
      const res = await fetch(`/api/posts?${params}`);
      const data = await res.json();

      let sorted = data.posts as Post[];
      if (sort === 'oldest') sorted = [...sorted].reverse();
      if (sort === 'most-read') sorted = [...sorted].sort((a, b) => b.views - a.views);

      setPosts(sorted);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter, search, sort, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleFilter = (type: string) => {
    setFilter(type);
    setPage(1);
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="min-h-screen pt-14">
      {/* ── Page header ── */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="signal-dot" />
            <span className="font-mono text-xs text-muted tracking-widest">
              TRANSMISSION HUB · {total} SIGNALS
            </span>
          </div>
          <h1 className="font-serif text-5xl text-ink leading-tight mb-4">Writings</h1>
          <p className="font-sans text-ink-2 text-base max-w-xl">
            Articles, journal entries, academic work, and fiction. All frequencies.
            Filter by type or search across all transmissions.
          </p>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="border-b border-border sticky top-14 z-30 bg-bg/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          {/* Type filters */}
          <div className="flex items-center gap-1 flex-wrap">
            {['All', ...POST_TYPES].map((type) => (
              <button
                key={type}
                onClick={() => handleFilter(type)}
                className={`filter-pill ${filter === type ? 'active' : ''}`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex-1 flex items-center gap-3 sm:justify-end w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Search transmissions..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="admin-input w-full sm:w-52 text-xs py-1.5"
              />
              {searchInput && (
                <button
                  onClick={() => { setSearchInput(''); setSearch(''); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="admin-input text-xs py-1.5 w-auto pr-6"
              style={{ appearance: 'none', backgroundImage: 'none' }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Post Grid ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface p-6 animate-pulse">
                <div className="h-3 w-20 bg-border rounded mb-4" />
                <div className="h-5 w-4/5 bg-border rounded mb-3" />
                <div className="h-3 w-full bg-border rounded mb-2" />
                <div className="h-3 w-3/4 bg-border rounded" />
              </div>
            ))}
          </div>
        ) : posts?.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <p className="font-mono text-muted text-xs tracking-widest mb-2">NO SIGNAL FOUND</p>
            <p className="font-sans text-muted text-sm">
              {search ? `No results for "${search}"` : 'No posts in this frequency yet.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-8">
              {posts?.map((post, i) => (
                <div key={post.id} className="bg-bg">
                  <TransmissionCard post={post} index={(page - 1) * LIMIT + i} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border pt-8">
                <span className="font-mono text-xs text-muted">
                  PAGE {page} / {totalPages} · {total} TRANSMISSIONS
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="font-mono text-xs text-muted border border-border px-3 py-1.5 hover:text-ink-2 hover:border-border-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    ← PREV
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    const p = i + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`font-mono text-xs px-3 py-1.5 border transition-all ${
                          page === p
                            ? 'border-signal text-signal bg-signal/5'
                            : 'border-border text-muted hover:border-border-2 hover:text-ink-2'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="font-mono text-xs text-muted border border-border px-3 py-1.5 hover:text-ink-2 hover:border-border-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
