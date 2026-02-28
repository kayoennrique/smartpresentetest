import axios from 'axios';
import { NextResponse } from 'next/server';

import { upstream } from '@/server/upstream';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const limit = url.searchParams.get('limit') ?? '50';

    const { data, status } = await axios.get(upstream('/seasonal-products'), {
      params: { page, limit },
      timeout: 20000,
    });

    return NextResponse.json(data, { status });
  } catch (err: any) {
    const status = err?.response?.status || 502;
    const data = err?.response?.data;

    return NextResponse.json(
      {
        message:
          data?.message ||
          data?.error ||
          err?.message ||
          'Falha ao buscar seasonal-products no backend',
        details: data ?? null,
      },
      { status },
    );
  }
}
