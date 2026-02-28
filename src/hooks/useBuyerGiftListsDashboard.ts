'use client';

import { useEffect, useMemo, useState } from 'react';

import { getBuyerGiftLists } from '@/services/buyerGiftLists';
import type { BuyerListVM } from '@/types/dashboard';
import { normalizeBuyerGiftLists } from '@/utils/normalizeBuyerGiftLists';

function inferHasMore(res: any, receivedCount: number, limit: number, page: number) {
  const meta = res?.meta ?? res?.pagination ?? res?.pageInfo ?? null;

  if (typeof meta?.hasNext === 'boolean') {return meta.hasNext;}

  const total =
    (typeof meta?.total === 'number' ? meta.total : null) ??
    (typeof res?.total === 'number' ? res.total : null);

  if (typeof total === 'number' && Number.isFinite(total)) {
    return page * limit < total;
  }

  return receivedCount === limit;
}

export function useBuyerGiftListsDashboard({
  limit = 10,
  step = 3,
}: { limit?: number; step?: number } = {}) {
  const [page, setPage] = useState(1);

  const [lists, setLists] = useState<BuyerListVM[]>([]);
  const [hasMoreApi, setHasMoreApi] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [visibleCount, setVisibleCount] = useState(step);

  async function fetchPage(nextPage: number, mode: 'replace' | 'append') {
    const res = await getBuyerGiftLists(nextPage, limit);
    const normalized = normalizeBuyerGiftLists(res) as BuyerListVM[];

    setHasMoreApi(inferHasMore(res, normalized.length, limit, nextPage));

    if (mode === 'replace') {setLists(normalized);}
    else {setLists((prev) => [...prev, ...normalized]);}

    return normalized.length;
  }

  useEffect(() => {
    let cancel = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        await fetchPage(1, 'replace');
        if (cancel) {return;}

        setPage(1);
        setVisibleCount(step);
      } catch (e: any) {
        if (!cancel) {setError(e?.message || 'Erro ao carregar.');}
      } finally {
        if (!cancel) {setLoading(false);}
      }
    }

    load();
    return () => {
      cancel = true;
    };
  }, [limit, step]);

  const visibleLists = useMemo(() => lists.slice(0, visibleCount), [lists, visibleCount]);

  const canShowMoreLocal = lists.length > visibleCount;
  const canShowMore = canShowMoreLocal || hasMoreApi;

  const showMore = async () => {
    if (lists.length > visibleCount) {
      setVisibleCount((v) => Math.min(v + step, lists.length));
      return;
    }

    if (!hasMoreApi || loadingMore) {return;}

    setLoadingMore(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const received = await fetchPage(nextPage, 'append');
      setPage(nextPage);

      setVisibleCount((v) => Math.min(v + step, v + Math.max(step, received)));
    } catch (e: any) {
      setError(e?.message || 'Erro ao carregar mais.');
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    lists,
    visibleLists,
    loading,
    error,
    canShowMore,
    loadingMore,
    showMore,
  };
}
