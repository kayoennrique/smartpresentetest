import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { upstream } from '@/server/upstream';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ shareCode: string; itemId: string }> },
) {
  const resolvedParams = await params;
  const shareCode = String(resolvedParams?.shareCode || '').trim();
  const itemId = String(resolvedParams?.itemId || '').trim();

  if (!shareCode || !itemId) {
    return NextResponse.json({ message: 'shareCode ou itemId não informado' }, { status: 400 });
  }

  try {
    const hasJson = req.headers.get('content-type')?.includes('application/json');
    const body = hasJson ? await req.json() : undefined;

    const { data, status } = await axios.post(
      upstream(
        `/gift-lists/share/${encodeURIComponent(shareCode)}/items/${encodeURIComponent(itemId)}/select`,
      ),
      body,
      {
        headers: hasJson ? { 'Content-Type': 'application/json' } : undefined,
        timeout: 20000,
      },
    );

    return NextResponse.json(data, { status });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err?.response?.data?.message || 'Erro ao selecionar item da lista',
        details: err?.response?.data ?? null,
      },
      { status: err?.response?.status || 500 },
    );
  }
}
