'use client';
// src/components/TransmissionCard.tsx

import Link from 'next/link';
import { Post, TYPE_COLORS, TYPE_FREQ, parseTags, readingTime, formatDate } from '@/types';

interface Props {
  post: Post;
  index: number;
  variant?: 'default' | 'compact';
}

export default function TransmissionCard({ post, index, variant = 'default' }: Props) {
  const tags = parseTags(post.tags);
  const rt = readingTime(post.content);
  const typeColor = TYPE_COLORS[post.type] || 'text-ink-2 border-border';
  const freq = TYPE_FREQ[post.type] || '000.0 MHz';
  const txNum = String(index + 1).padStart(3, '0');

  if (variant === 'compact') {
    return (
      <Link href={`/writing/${post.slug}`} className="group block">
        <div className="flex items-start gap-4 py-4 border-b border-border hover:border-border-2 transition-all duration-300">
          <span className="font-mono text-[10px] text-muted pt-1 shrink-0 w-10">
            TX-{txNum}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`mono-tag text-[10px] border px-1.5 py-0.5 ${typeColor}`}>
                {post.type}
              </span>
            </div>
            <h3 className="font-serif text-ink group-hover:text-signal transition-colors duration-200 text-base leading-snug">
              {post.title}
            </h3>
          </div>
          <span className="font-mono text-[10px] text-muted pt-1 shrink-0">
            {rt}m
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/writing/${post.slug}`} className="group block">
      <article
        className="relative border border-border hover:border-border-2 bg-surface hover:bg-surface-2 p-6 transition-all duration-300"
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'var(--signal)' }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-muted">TX-{txNum}</span>
            <span className={`mono-tag text-[10px] border px-2 py-0.5 ${typeColor}`}>
              {post.type}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-[10px] text-muted/60">{freq}</span>
            <span className="signal-dot w-1 h-1 opacity-60" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-ink text-xl leading-snug mb-3 group-hover:text-signal transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="font-sans text-ink-2 text-sm leading-relaxed mb-5 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-muted/70 border border-border/50 px-1.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted">
            {formatDate(post.publishedAt)}
          </span>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted">
              {rt} min read
            </span>
            <span className="font-mono text-[10px] text-muted">
              {post.views} views
            </span>
            <span className="font-mono text-[10px] text-signal/60 group-hover:text-signal transition-colors duration-200">
              READ →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
