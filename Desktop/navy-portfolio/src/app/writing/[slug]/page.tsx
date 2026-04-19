// src/app/writing/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Post, parseTags, readingTime, formatDate, TYPE_COLORS, TYPE_FREQ } from '@/types';
import PostClient from './PostClient';
import type { Metadata } from 'next';

type Props = { params: { slug: string } };

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug, published: true },
    });
    if (!post) return null;
    return {
      ...post,
      publishedAt: post.publishedAt?.toISOString() ?? null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    } as Post;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.title,
    description: post.excerpt ?? post.content.slice(0, 160),
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return <PostClient post={post} />;
}
