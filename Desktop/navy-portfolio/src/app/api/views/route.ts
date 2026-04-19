// src/app/api/views/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      select: { views: true },
    });

    return NextResponse.json({ views: post.views });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update views' }, { status: 500 });
  }
}
