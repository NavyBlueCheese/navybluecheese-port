'use client';
// src/app/writing/[slug]/PostClient.tsx

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Post, ReactionCount, REACTION_EMOJIS, parseTags, readingTime, formatDate, TYPE_COLORS, TYPE_FREQ, getSessionId } from '@/types';

interface Props { post: Post }

export default function PostClient({ post }: Props) {
  const [reactions, setReactions] = useState<ReactionCount[]>([]);
  const [views, setViews] = useState(post.views);
  const [sessionId, setSessionId] = useState('');
  const tags = parseTags(post.tags);
  const rt = readingTime(post.content);
  const typeColor = TYPE_COLORS[post.type] || '';
  const freq = TYPE_FREQ[post.type] || '';

  useEffect(() => {
    const sid = getSessionId();
    setSessionId(sid);

    // Increment view
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: post.slug }),
    }).then((r) => r.json()).then((d) => { if (d.views) setViews(d.views); });

    // Fetch reactions
    fetch(`/api/reactions?postId=${post.id}&sessionId=${sid}`)
      .then((r) => r.json())
      .then(setReactions);
  }, [post.id, post.slug]);

  const toggleReaction = async (emoji: string) => {
    if (!sessionId) return;
    const res = await fetch('/api/reactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: post.id, emoji, sessionId }),
    });
    if (res.ok) {
      // Refresh reactions
      fetch(`/api/reactions?postId=${post.id}&sessionId=${sessionId}`)
        .then((r) => r.json())
        .then(setReactions);
    }
  };

  return (
    <div className="min-h-screen pt-14">
      {/* ── Header ── */}
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 font-mono text-xs text-muted">
            <Link href="/" className="hover:text-ink-2 transition-colors">~</Link>
            <span>/</span>
            <Link href="/writing" className="hover:text-ink-2 transition-colors">writing</Link>
            <span>/</span>
            <span className="text-ink-2">{post.slug}</span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`mono-tag text-[10px] border px-2 py-0.5 ${typeColor}`}>
              {post.type}
            </span>
            <span className="font-mono text-[10px] text-muted/60">{freq}</span>
            <span className="font-mono text-[10px] text-muted">
              {rt} min read
            </span>
            <span className="font-mono text-[10px] text-muted">
              {views} views
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="font-serif text-ink-2 text-xl leading-relaxed mb-6 italic">
              {post.excerpt}
            </p>
          )}

          {/* Date + tags */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-muted">
              {formatDate(post.publishedAt)}
            </span>
            {tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] text-muted border border-border px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scanline separator ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-signal/20 to-transparent" />

      {/* ── Content ── */}
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <div className="prose-navy">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* ── Reactions ── */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
        <div className="border-t border-border pt-12">
          <p className="font-mono text-xs text-muted tracking-widest mb-6">
            REACTIONS · SEND A SIGNAL
          </p>
          <div className="flex flex-wrap gap-3">
            {reactions.map((r) => (
              <button
                key={r.emoji}
                onClick={() => toggleReaction(r.emoji)}
                className={`flex items-center gap-2 font-mono text-xs px-4 py-2 border transition-all duration-200 ${
                  r.reacted
                    ? 'border-signal bg-signal/10 text-signal'
                    : 'border-border text-ink-2 hover:border-border-2 hover:bg-surface'
                }`}
              >
                <span className="text-base">{r.emoji}</span>
                <span className="tabular-nums">{r.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/writing"
            className="font-mono text-xs text-muted hover:text-ink-2 transition-colors tracking-widest"
          >
            ← BACK TO TRANSMISSIONS
          </Link>
        </div>
      </div>
    </div>
  );
}
