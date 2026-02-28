import axios from 'axios';
import { NextResponse } from 'next/server';

import { upstream } from '@/server/upstream';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, status } = await axios.post(upstream('/client-auth/register'), body, {
      headers: { 'Content-Type': 'application/json' },
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
