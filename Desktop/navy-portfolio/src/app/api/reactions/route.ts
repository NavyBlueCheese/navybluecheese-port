// src/app/api/reactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: fetch reaction counts for a post
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  const sessionId = searchParams.get('sessionId') || '';

  if (!postId) return NextResponse.json({ error: 'postId required' }, { status: 400 });

  try {
    const reactions = await prisma.reaction.findMany({
      where: { postId },
    });

    const emojis = ['❤️', '🔥', '🧠', '✨', '📡'];
    const counts = emojis.map((emoji) => ({
      emoji,
      count: reactions.filter((r) => r.emoji === emoji).length,
      reacted: reactions.some((r) => r.emoji === emoji && r.sessionId === sessionId),
    }));

    return NextResponse.json(counts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch reactions' }, { status: 500 });
  }
}

// POST: toggle a reaction
export async function POST(req: NextRequest) {
  try {
    const { postId, emoji, sessionId } = await req.json();

    if (!postId || !emoji || !sessionId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existing = await prisma.reaction.findUnique({
      where: { postId_sessionId_emoji: { postId, sessionId, emoji } },
    });

    if (existing) {
      await prisma.reaction.delete({ where: { id: existing.id } });
      return NextResponse.json({ action: 'removed' });
    } else {
      await prisma.reaction.create({ data: { postId, emoji, sessionId } });
      return NextResponse.json({ action: 'added' });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to toggle reaction' }, { status: 500 });
  }
}
