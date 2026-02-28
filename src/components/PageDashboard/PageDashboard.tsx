'use client';

import React, { useEffect, useState } from 'react';

import { Container } from '@/components/GeneralComponents/Container/Container';
import LoadingState from '@/components/GeneralComponents/LoadingState/LoadingState';
import { useBuyerGiftListsDashboard } from '@/hooks/useBuyerGiftListsDashboard';
import { getBestUserName } from '@/utils/user';

import GiftListCard from './GiftListCardDashboard/GiftListCardBoard';

export default function PageDashboard() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(getBestUserName());
  }, []);

  const { visibleLists, loading, error, canShowMore, loadingMore, showMore } =
    useBuyerGiftListsDashboard({ limit: 10, step: 3 });

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Container>
      <div className="py-8 mt-20 md:mt-24">
        <div className="px-2 mb-3">
          <p className="text-sm text-gray-600">
            {userName ? (
              <>
                Bem-vindo, <span className="text-color-blue-10 font-bold">{userName}</span>!
              </>
            ) : (
              'Bem-vindo!'
            )}
          </p>
        </div>

        <div className="mb-6 flex px-2 flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">
            Acompanhe as listas e veja qual item o presenteado selecionou.
          </p>
        </div>

        {error ? (
          <div className="rounded-2xl border bg-white p-6 text-sm text-red-600">{error}</div>
        ) : !visibleLists.length ? (
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600">
            Nenhuma lista encontrada.
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {visibleLists.map((list) => (
                <GiftListCard key={list.id} list={list} />
              ))}
            </div>

            {canShowMore ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={showMore}
                  disabled={loadingMore}
                  className={[
                    'rounded-xl border bg-color-red-10 px-4 py-2 text-sm font-semibold text-white',
                    'hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed',
                  ].join(' ')}
                >
                  {loadingMore ? 'Carregando…' : 'Ver mais'}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </Container>
  );
}
