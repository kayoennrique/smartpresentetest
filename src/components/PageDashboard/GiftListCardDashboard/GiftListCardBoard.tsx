'use client';

import Image from 'next/image';

import type { BuyerListVM } from '@/types/dashboard';
import { readAddress } from '@/utils/dashboard/address';
import { getSelectedFromList, getSortedItems, toItemVM } from '@/utils/dashboard/giftList';

import FieldDashboard from '../FieldDashboard/FieldDashboard';
import SectionTitleDashboard from '../SectionTitleDashboard/SectionTitleDashboard';

function formatSentAt(iso: string) {
  if (!iso || typeof iso !== 'string') {return '—';}

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {return '—';}

  const date = d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const time = d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${date} às ${time}`;
}

function pickCardText(opts: { hideGifts: boolean; giftHintMessage?: string }) {
  if (!opts.hideGifts) {return '';}

  const hint = String(opts.giftHintMessage || '').trim();
  return hint || '';
}

export default function GiftListCard({ list }: { list: BuyerListVM }) {
  const recipientName = list.recipientName;
  const sentAtFormatted = formatSentAt(list.createdAt);

  const hideGifts = Boolean((list as any)?.hideGifts);

  const selected = getSelectedFromList(list);
  const selectedName = (selected?.name || '').trim() || 'Produto';
  const selectedImageUrl = (selected?.imageUrl || '').trim();

  const selectedText = pickCardText({
    hideGifts,
    giftHintMessage: String((selected as any)?.giftHintMessage || '').trim(),
  });

  const addr = readAddress(list);

  const sortedItemsRaw = getSortedItems(list);
  const items = sortedItemsRaw.map(toItemVM);

  return (
    <section className="rounded-2xl border bg-white shadow-sm">
      <div className="border-b p-5">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 break-words sm:truncate">
            Lista enviada para {recipientName} em {sentAtFormatted}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-[360px_1fr]">
        <div className="rounded-2xl border bg-gray-50 p-4">
          <SectionTitleDashboard
            icon="solar:box-minimalistic-bold"
            right={<p className="text-xs text-gray-500">{items.length}</p>}
          >
            Itens
          </SectionTitleDashboard>

          {/* MOBILE */}
          <div className="md:hidden mt-3">
            <div
              className={[
                'flex gap-3',
                'overflow-x-auto overscroll-x-contain',
                'snap-x snap-mandatory',
                'pb-2',
                'no-scrollbar',
                'touch-pan-x',
              ].join(' ')}
            >
              {items.map((vm) => {
                const itemText = pickCardText({
                  hideGifts,
                  giftHintMessage: String((vm as any)?.giftHintMessage || '').trim(),
                });

                return (
                  <div
                    key={vm.id}
                    className={[
                      'snap-start',
                      'min-w-[260px] max-w-[260px]',
                      'flex items-center gap-3 rounded-xl border bg-white p-3 transition',
                      'hover:shadow-sm hover:border-gray-200',
                    ].join(' ')}
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#F1F3F5] p-1">
                      {vm.imageUrl ? (
                        <Image
                          src={vm.imageUrl}
                          alt={vm.title}
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-[10px] text-gray-400">
                          —
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-3 break-words">
                        {vm.title}
                      </p>

                      {itemText ? (
                        <p className="mt-0.5 text-xs text-gray-600 leading-snug line-clamp-3 break-words">
                          {itemText}
                        </p>
                      ) : null}

                      <p className="mt-1 text-xs font-semibold text-gray-900">{vm.priceText}</p>
                      <p className="text-[11px] text-gray-500">{vm.retailer}</p>
                    </div>

                    {vm.selected ? (
                      <span
                        className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#4E8872] shadow-sm"
                        aria-label="Selecionado"
                        title="Selecionado"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                    ) : (
                      <span className="h-5 w-5" aria-hidden="true" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* TABLET/DESKTOP */}
          <div className="hidden md:block space-y-2 mt-3">
            {items.map((vm) => {
              const itemText = pickCardText({
                hideGifts,
                giftHintMessage: String((vm as any)?.giftHintMessage || '').trim(),
              });

              return (
                <div
                  key={vm.id}
                  className={[
                    'group flex items-center gap-3 rounded-xl border bg-white p-3 transition',
                    'hover:shadow-sm hover:border-gray-200',
                  ].join(' ')}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#F1F3F5] p-1">
                    {vm.imageUrl ? (
                      <Image
                        src={vm.imageUrl}
                        alt={vm.title}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-[10px] text-gray-400">
                        —
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-3 break-words">
                      {vm.title}
                    </p>

                    {itemText ? (
                      <p className="leading-snug line-clamp-3 break-words text-xs text-gray-600 mt-1">
                        {itemText}
                      </p>
                    ) : null}

                    <p className="mt-1 text-xs font-semibold text-gray-900">{vm.priceText}</p>
                    <p className="text-[11px] text-gray-500">{vm.retailer}</p>
                  </div>

                  {vm.selected ? (
                    <span
                      className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#4E8872] shadow-sm"
                      aria-label="Selecionado"
                      title="Selecionado"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  ) : (
                    <span className="h-5 w-5" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DIREITA: escolhido -> endereço */}
        <div className="space-y-5">
          <div className="rounded-2xl border p-5">
            <SectionTitleDashboard icon="solar:gift-bold">
              Presente escolhido pelo {recipientName}
            </SectionTitleDashboard>

            <div className="rounded-xl border bg-gray-50 p-4 mt-3">
              {selected ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F1F3F5] p-2">
                      {selectedImageUrl ? (
                        <Image
                          src={selectedImageUrl}
                          alt={selectedName}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-xs text-gray-400">
                          —
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 break-words sm:truncate">
                        {selectedName}
                      </p>

                      {selectedText ? (
                        <p className="mt-2 line-clamp-3 text-xs text-gray-600">{selectedText}</p>
                      ) : null}

                      {typeof (selected as any)?.priceCents === 'number' &&
                      (selected as any).priceCents > 0 ? (
                        <p className="mt-2 text-sm font-semibold text-gray-900">
                          {`R$ ${(((selected as any).priceCents as number) / 100)
                            .toFixed(2)
                            .replace('.', ',')}`}
                        </p>
                      ) : null}

                      {(selected as any)?.retailerName ? (
                        <p className="text-xs text-gray-500">{(selected as any).retailerName}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="sm:pt-1 sm:pl-4">
                    <button
                      type="button"
                      className="
                        w-full sm:w-auto
                        inline-flex items-center justify-center
                        rounded-lg
                        bg-color-red-10
                        px-5 py-2
                        text-sm font-semibold text-white
                        shadow-sm
                        transition
                        hover:brightness-110
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#4E8872]/40
                        active:scale-[0.98]
                      "
                      onClick={() => console.log('Comprar Realizada', selected)}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm text-gray-600">Ainda não houve seleção.</div>

                  <button
                    type="button"
                    disabled
                    className="
                      inline-flex items-center justify-center
                      rounded-lg
                      bg-gray-300
                      px-5 py-2
                      text-sm font-semibold text-white
                      cursor-not-allowed
                    "
                  >
                    Comprar
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border p-5">
            <SectionTitleDashboard icon="solar:map-point-bold">Endereço</SectionTitleDashboard>

            <div className="rounded-xl border bg-gray-50 p-4 mt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldDashboard label="CEP" value={addr.postalCode} />
                <FieldDashboard label="Logradouro" value={addr.street} />

                <FieldDashboard label="Número" value={addr.number} />
                <FieldDashboard label="Complemento" value={addr.complement} />

                <FieldDashboard label="Bairro" value={addr.neighborhood} />
                <FieldDashboard label="Cidade" value={addr.city} />

                <FieldDashboard label="Estado" value={addr.state} />
                <FieldDashboard label="País" value={addr.country} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
