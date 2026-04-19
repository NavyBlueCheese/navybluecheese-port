// src/types/index.ts

export type PostType = 'Article' | 'Journal' | 'Academic' | 'Fiction';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  type: string;
  tags: string; // JSON stringified array
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  views: number;
  reactions?: Reaction[];
  _count?: {
    reactions: number;
  };
}

export interface Reaction {
  id: string;
  postId: string;
  emoji: string;
  sessionId: string;
  createdAt: string;
}

export interface ReactionCount {
  emoji: string;
  count: number;
  reacted: boolean;
}

export const POST_TYPES: PostType[] = ['Article', 'Journal', 'Academic', 'Fiction'];

export const TYPE_COLORS: Record<string, string> = {
  Article: 'text-amber border-amber/30 bg-amber/5',
  Journal: 'text-signal border-signal/30 bg-signal/5',
  Academic: 'text-sky-400 border-sky-400/30 bg-sky-400/5',
  Fiction: 'text-rose-400 border-rose-400/30 bg-rose-400/5',
};

export const TYPE_FREQ: Record<string, string> = {
  Article: '87.4 MHz',
  Journal: '104.1 MHz',
  Academic: '144.8 MHz',
  Fiction: '432.0 MHz',
};

export const REACTION_EMOJIS = ['❤️', '🔥', '🧠', '✨', '📡'];

export function parseTags(tags: string): string[] {
  try {
    return JSON.parse(tags);
  } catch {
    return [];
  }
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('navy_session_id');
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('navy_session_id', id);
  }
  return id;
}
