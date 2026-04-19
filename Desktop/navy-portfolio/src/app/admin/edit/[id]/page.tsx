'use client';
// src/app/admin/edit/[id]/page.tsx

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PostEditor from '@/components/PostEditor';
import { Post, parseTags } from '@/types';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch(`/api/posts/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        router.push('/admin');
      });
  }, [session, params.id, router]);

  if (status === 'loading' || loading || !session) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <span className="font-mono text-xs text-muted">LOADING...</span>
      </div>
    );
  }

  if (!post) return null;

  const tags = parseTags(post.tags).join(', ');

  return (
    <PostEditor
      mode="edit"
      postId={post.id}
      initial={{
        title: post.title,
        content: post.content,
        excerpt: post.excerpt ?? '',
        type: post.type,
        tags,
        published: post.published,
      }}
    />
  );
}
