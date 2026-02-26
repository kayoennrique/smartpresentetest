'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import type { SecondStepDetailsProps as Props } from './types';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';
import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';

function formatBRLFromCents(value: number) {
  return `R$ ${(value / 100).toFixed(2).replace('.', ',')}`;
}

export default function SecondStepDetails({
  products,
  selectedProductId,
  onSelect,
  onBack,
  onConfirm,
  submitting = false,
  submitError = null,
}: Props) {
  const toggleSelect = (id: string) => {
    if (!id) return;
    onSelect(selectedProductId === id ? '' : id);
  };

  return (
    <>
      <QuestionsHeader />

      <div className="w-full max-w-3xl mt-4 mx-auto px-4">
        <QuestionsTitle
          title="Selecione o presente que você mais gostou"
          subtitle="Após selecionar, a pessoa que irá te presentear prosseguirá o processo para que você tenha seu presente"
        />

        {products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-[#6C757D]">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <>
            {/* MOBILE */}
            <div className="relative md:hidden w-screen -ml-[calc((100vw-96%)/2)] -mt-4">
              <div className="flex gap-3 overflow-x-auto px-4 snap-x snap-mandatory scrollbar-hide ml-[31px]">
                {products.map((product, index) => {
                  const isSelected = selectedProductId === product.id;

                  const imageUrl =
                    typeof product.imageUrl === 'string' ? product.imageUrl.trim() : '';
                  const description =
                    typeof product.description === 'string' ? product.description.trim() : '';

                  const priceText =
                    product.currency === 'BRL'
                      ? formatBRLFromCents(Number(product.price ?? 0))
                      : String(product.price ?? 0);

                  return (
                    <motion.button
                      key={product.id}
                      type="button"
                      onClick={() => toggleSelect(product.id)}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      aria-pressed={isSelected}
                      className={[
                        'snap-start w-[85vw] max-w-[290px] flex-shrink-0 text-left overflow-hidden',
                        'rounded-xl border bg-white transition-all',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#71C19B]/35',
                        isSelected
                          ? 'border-[#71C19B] ring-2 ring-[#71C19B]/25'
                          : 'border-[#E9ECEF]',
                      ].join(' ')}
                    >
                      <div className="p-4">
                        <div className="w-full flex justify-center mb-6">
                          <div className="relative w-40 h-40">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={product.productName || 'Produto'}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 85vw, 290px"
                                priority={index < 3}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                Sem imagem
                              </div>
                            )}
                          </div>
                        </div>

                        <h3 className="text-sm font-semibold mb-2 line-clamp-2">
                          {product.productName || 'Produto sem nome'}
                        </h3>

                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                          {description || 'Sem descrição disponível.'}
                        </p>

                        <div className="mt-3 flex items-end justify-between gap-3">
                          <p className="text-sm font-bold">{priceText}</p>

                          {product.retailer ? (
                            <span className="text-[11px] text-gray-500 line-clamp-1">
                              {product.retailer}
                            </span>
                          ) : null}
                        </div>

                        {product.productUrl ? (
                          <Link
                            href={product.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-3 inline-flex text-xs font-semibold text-color-blue-10 hover:underline"
                          >
                            Ver produto
                          </Link>
                        ) : null}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-5 gap-6 -mt-4">
              {products.map((product, index) => {
                const isSelected = selectedProductId === product.id;

                const imageUrl =
                  typeof product.imageUrl === 'string' ? product.imageUrl.trim() : '';
                const description =
                  typeof product.description === 'string' ? product.description.trim() : '';

                const priceText =
                  product.currency === 'BRL'
                    ? formatBRLFromCents(Number(product.price ?? 0))
                    : String(product.price ?? 0);

                return (
                  <motion.button
                    key={product.id}
                    type="button"
                    onClick={() => toggleSelect(product.id)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    aria-pressed={isSelected}
                    className={[
                      'group rounded-xl border shadow-md hover:shadow-lg transition-all text-left overflow-hidden bg-white',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#71C19B]/35',
                      isSelected ? 'border-[#71C19B] ring-2 ring-[#71C19B]/25' : 'border-[#E9ECEF]',
                    ].join(' ')}
                  >
                    <div className="relative w-full h-44 bg-[#F1F3F5] p-4 flex items-center justify-center">
                      <div className="relative h-[92px] w-[92px]">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={product.productName || 'Produto'}
                            fill
                            className="object-contain"
                            sizes="92px"
                            priority={index < 3}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            Sem imagem
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-semibold mb-2 line-clamp-2">
                        {product.productName || 'Produto sem nome'}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {description || 'Sem descrição disponível.'}
                      </p>

                      <div className="mt-3 flex items-end justify-between gap-3">
                        <p className="text-sm font-bold">{priceText}</p>

                        {product.retailer ? (
                          <span className="text-[11px] text-gray-500 line-clamp-1">
                            {product.retailer}
                          </span>
                        ) : null}
                      </div>

                      {product.productUrl ? (
                        <Link
                          href={product.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 inline-flex text-xs font-semibold text-color-blue-10 hover:underline"
                        >
                          Ver produto
                        </Link>
                      ) : null}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </>
        )}

        <div className="flex justify-center pb-8">
          <div className="w-full max-w-2xl">
            <div className="w-full h-px bg-[#CED4DA] my-6" />
            <SurveyActions
              onBack={onBack}
              onNext={onConfirm}
              nextLabel={submitting ? 'Confirmando...' : 'Confirmar'}
              nextDisabled={!selectedProductId || submitting}
            />
          </div>
        </div>

        {submitError && <p className="mt-4 text-sm text-red-600">{submitError}</p>}
      </div>
    </>
  );
}
