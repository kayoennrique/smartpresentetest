'use client';

import Image from 'next/image';
import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import type { SecondStepTipsProps, TipItem } from './types';

const giftImages = [
  '/amarelo.png',
  '/azul-escuro.png',
  '/azul.png',
  '/roxo.png',
  '/verde.png',
  '/vinho.png',
];

function getId(item: TipItem) {
  return String(item.id ?? item.productId ?? '');
}

export default function SecondStepTips({
  items,
  selectedProductId,
  onSelect,
  onBack,
  onConfirm,
  submitting = false,
  submitError = null,
}: SecondStepTipsProps) {
  const toggleSelect = (id: string, index: number) => {
    if (!id) return;

    if (selectedProductId === id) {
      onSelect('', index);
      return;
    }

    onSelect(id, index);
  };

  const handleBack = () => {
    onBack?.();
  };

  const handleNext = () => {
    if (!selectedProductId || submitting) return;
    onConfirm?.();
  };

  return (
    <>
      <QuestionsHeader />

      <div className="w-full max-w-3xl mt-4 mx-auto px-4">
        <QuestionsTitle
          title="Selecione o presente que você mais gostou"
          subtitle="Após selecionar, a pessoa que irá te presentear prosseguirá o processo para que você tenha seu presente"
        />

        {items.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-[#6C757D]">Nenhuma dica encontrada.</p>
          </div>
        ) : (
          <>
            {/* MOBILE */}
            <div className="relative md:hidden w-screen -ml-[calc((100vw-90%)/2)] -mt-4">
              <div className="flex gap-3 overflow-x-auto px-4 snap-x snap-mandatory scrollbar-hide ml-[31px]">
                {items.map((item, index) => {
                  const id = getId(item);
                  const isSelected = id && selectedProductId === id;

                  return (
                    <button
                      key={id || index}
                      type="button"
                      onClick={() => toggleSelect(id, index)}
                      className={[
                        'snap-start w-[85vw] max-w-[290px] flex-shrink-0 text-left overflow-hidden',
                        'border rounded-xl bg-white',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#71C19B]/35',
                        isSelected
                          ? 'border-[#71C19B] ring-2 ring-[#71C19B]/25'
                          : 'border-[#E9ECEF]',
                      ].join(' ')}
                    >
                      <div className="p-4">
                        <div className="w-full flex justify-center mb-6">
                          <div className="relative w-40 h-40">
                            <Image
                              src={giftImages[index % giftImages.length]}
                              alt={`Surpresa ${index + 1}`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 85vw, 290px"
                              priority={index < 3}
                            />
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-6">
                          {item.giftHintMessage?.trim()
                            ? item.giftHintMessage
                            : 'Aqui terá a dica que o presentador resolveu escrever para o presenteado.'}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DESKTOP  */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-5 gap-6 -mt-4">
              {items.map((item, index) => {
                const id = getId(item);
                const isSelected = id && selectedProductId === id;

                return (
                  <button
                    key={id || index}
                    type="button"
                    onClick={() => toggleSelect(id, index)}
                    className={[
                      'group rounded-xl border shadow-md hover:shadow-lg transition-all text-left overflow-hidden bg-white',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#71C19B]/35',
                      isSelected ? 'border-[#71C19B] ring-2 ring-[#71C19B]/25' : 'border-[#E9ECEF]',
                    ].join(' ')}
                  >
                    <div className="relative w-full h-44 bg-[#F1F3F5] p-4 flex items-center justify-center">
                      <div className="relative h-[92px] w-[92px]">
                        <Image
                          src={giftImages[index % giftImages.length]}
                          alt={`Surpresa ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="92px"
                          priority={index < 3}
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                        {item.giftHintMessage?.trim()
                          ? item.giftHintMessage
                          : 'Aqui terá a dica que o presentador resolveu escrever para o presenteado.'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="flex justify-center pb-8">
          <div className="w-full max-w-2xl">
            <div className="w-full h-px bg-[#CED4DA] my-6" />
            <SurveyActions
              onBack={handleBack}
              onNext={handleNext}
              nextLabel={submitting ? 'Confirmando...' : 'Próximo'}
              nextDisabled={!selectedProductId || submitting}
            />
          </div>
        </div>

        {submitError && <p className="mt-4 text-sm text-red-600">{submitError}</p>}
      </div>
    </>
  );
}
