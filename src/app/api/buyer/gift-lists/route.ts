import { NextResponse } from 'next/server';
import axios from 'axios';
import { upstream } from '@/server/upstream';

const UPSTREAM = upstream('/buyer/gift-lists');

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const limit = url.searchParams.get('limit') ?? '10';

    const auth = req.headers.get('authorization') || '';
    const cookie = req.headers.get('cookie') || '';

    const { data, status } = await axios.get(UPSTREAM, {
      params: { page, limit },
      headers: {
        ...(auth ? { Authorization: auth } : {}),
        ...(cookie ? { cookie } : {}),
      },
      timeout: 20000,
    });

    return NextResponse.json(data, { status });
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data;

    return NextResponse.json(
      {
        message:
          data?.message || data?.error || err?.message || 'Erro ao comunicar com a API externa',
        details: data ?? null,
      },
      { status },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const auth = req.headers.get('authorization') || '';
    const cookie = req.headers.get('cookie') || '';

    const { data, status } = await axios.post(UPSTREAM, body, {
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? { Authorization: auth } : {}),
        ...(cookie ? { cookie } : {}),
      },
      timeout: 20000,
    });

    return NextResponse.json(data, { status });
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data;

    return NextResponse.json(
      {
        message:
          data?.message || data?.error || err?.message || 'Erro ao comunicar com a API externa',
        details: data ?? null,
      },
      { status },
    );
  }
}
