'use client';

import { useCallback } from 'react';

export type HeaderPayload = {
  senderName: string;
  recipientName: string;
  recipientPhone: string;
  hideGifts: boolean;
  contactResponsible: 'PLATFORM' | 'CLIENT';
};

export type ItemPayload = {
  productId: string;
  giftHintMessage: string;
  giftHintSource: 'USER' | 'AI';
};

export type ItemsPayload = { items: ItemPayload[] };
export type FullGiftListPayload = HeaderPayload & ItemsPayload;

const HEADER_KEY = 'gift-list-header';
const ITEMS_KEY = 'gift-list-items';
const DEFAULT_RECIPIENT_PHONE = process.env.NEXT_PUBLIC_DEFAULT_RECIPIENT_PHONE || '+5511999999999';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) {return null;}
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/* HEADER */
function readHeaderStorage(): Partial<HeaderPayload> {
  if (typeof window === 'undefined') {return {};}
  return safeParse<HeaderPayload>(localStorage.getItem(HEADER_KEY)) ?? {};
}

function writeHeaderStorage(next: HeaderPayload) {
  if (typeof window === 'undefined') {return;}
  localStorage.setItem(HEADER_KEY, JSON.stringify(next));
}

/* ITEMS */
function readItemsStorage(): ItemsPayload {
  if (typeof window === 'undefined') {return { items: [] };}
  return safeParse<ItemsPayload>(localStorage.getItem(ITEMS_KEY)) ?? { items: [] };
}

function writeItemsStorage(next: ItemsPayload) {
  if (typeof window === 'undefined') {return;}
  localStorage.setItem(ITEMS_KEY, JSON.stringify(next));
}

export function useGiftListPayloads() {
  const saveHeaderPayload = useCallback((header: HeaderPayload) => {
    writeHeaderStorage({
      ...header,
      recipientPhone: header.recipientPhone || DEFAULT_RECIPIENT_PHONE,
    });
  }, []);

  const getHeaderPayload = useCallback((): HeaderPayload => {
    const data = readHeaderStorage();

    const senderName = String(data.senderName ?? '').trim();
    const recipientName = String(data.recipientName ?? '').trim();

    const recipientPhone = String(data.recipientPhone ?? DEFAULT_RECIPIENT_PHONE).trim();

    const hideGifts = Boolean(data.hideGifts);
    const contactResponsible: 'PLATFORM' | 'CLIENT' =
      data.contactResponsible === 'CLIENT' ? 'CLIENT' : 'PLATFORM';

    if (!senderName || !recipientName) {
      throw new Error('Dados do cabeçalho faltando. Volte e preencha: De e Para.');
    }

    return {
      senderName,
      recipientName,
      recipientPhone,
      hideGifts,
      contactResponsible,
    };
  }, []);

  const buildItemsPayload = useCallback(
    (
      products: { id: string }[],
      tips: Record<string, string>,
      tipSource: Record<string, 'USER' | 'AI'>,
    ): ItemsPayload => {
      const items = products.map((p) => {
        const giftHintMessage = String(tips[p.id] ?? '').trim();
        if (!giftHintMessage) {throw new Error('Preencha todas as dicas.');}

        return {
          productId: p.id,
          giftHintMessage,
          giftHintSource: tipSource[p.id] ?? 'USER',
        };
      });

      return { items };
    },
    [],
  );

  const saveItemsPayload = useCallback((itemsPayload: ItemsPayload) => {
    writeItemsStorage(itemsPayload);
  }, []);

  const getItemsPayload = useCallback((): ItemsPayload => {
    const data = readItemsStorage();
    if (!Array.isArray(data.items) || data.items.length === 0) {
      throw new Error('Items não encontrados. Volte no SendList e preencha as dicas.');
    }
    return data;
  }, []);

  const buildFullPayloadFromStorage = useCallback((): FullGiftListPayload => {
    const header = getHeaderPayload();
    const items = getItemsPayload();
    return { ...header, ...items };
  }, [getHeaderPayload, getItemsPayload]);

  const buildFullPayload = useCallback(
    (
      products: { id: string }[],
      tips: Record<string, string>,
      tipSource: Record<string, 'USER' | 'AI'>,
    ): FullGiftListPayload => {
      const header = getHeaderPayload();
      const items = buildItemsPayload(products, tips, tipSource);
      return { ...header, ...items };
    },
    [buildItemsPayload, getHeaderPayload],
  );

  return {
    saveHeaderPayload,
    getHeaderPayload,

    buildItemsPayload,
    saveItemsPayload,
    getItemsPayload,

    buildFullPayload,
    buildFullPayloadFromStorage,
  };
}
