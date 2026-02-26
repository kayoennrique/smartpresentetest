import { ApiError } from '@/types/lists';
import { api } from './api';
import axios, { AxiosError } from 'axios';

function normalizeAxiosError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<any>;
    return {
      status: e.response?.status,
      message:
        e.response?.data?.message || e.response?.data?.error || e.message || 'Erro inesperado',
      details: e.response?.data,
    };
  }

  return { message: 'Erro inesperado' };
}

export type SharedGiftListResponse = any;

export async function getSharedGiftList(shareCode: string) {
  try {
    const { data } = await api.get<SharedGiftListResponse>(
      `/gift-lists/share/${encodeURIComponent(shareCode)}`,
    );
    return data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}

export async function selectGiftListItem(shareCode: string, itemId: string, payload?: unknown) {
  try {
    const { data } = await api.post(
      `/gift-lists/share/${encodeURIComponent(
        shareCode,
      )}/items/${encodeURIComponent(itemId)}/select`,
      payload,
    );
    return data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}
