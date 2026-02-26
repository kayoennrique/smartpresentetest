import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const limit = url.searchParams.get('limit') ?? '50';

    const base = (process.env.API_BASE_URL ?? '').replace(/\/$/, '').replace(/\/api$/, '');

    if (!base) {
      return NextResponse.json({ message: 'API_BASE_URL não configurada' }, { status: 500 });
    }

    const upstream = `${base}/api/seasonal-products`;

    const { data, status } = await axios.get(upstream, {
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
