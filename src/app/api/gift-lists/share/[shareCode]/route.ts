import axios from 'axios';
import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { upstream } from '@/server/upstream';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shareCode: string }> },
) {
  const resolvedParams = await params;
  const shareCode = String(resolvedParams?.shareCode || '').trim();

  if (!shareCode) {
    return NextResponse.json({ message: 'shareCode não informado' }, { status: 400 });
  }

  try {
    const { data, status } = await axios.get(
      upstream(`/gift-lists/share/${encodeURIComponent(shareCode)}`),
      { timeout: 20000 },
    );

    return NextResponse.json(data, { status });
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data;

    return NextResponse.json(
      {
        message:
          data?.message || data?.error || err?.message || 'Erro ao buscar lista compartilhada',
        details: data ?? null,
      },
      { status },
    );
  }
}
