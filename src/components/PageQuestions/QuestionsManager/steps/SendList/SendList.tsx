'use client';

import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';



import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import PreviewModal from '@/components/PageQuestions/PreviewModal/PreviewModal';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';


import { TIPS_BY_PERSON } from './giftTips';
import type { ItemPayload, SendListProps, TipSource } from './interface';
import { saveItems, ITEMS_KEY } from './storage';
import TipForm from './TipForm';
import TipImage from './TipImage';
import { getFirstQuestionAnswer, mapPersonToTipKey } from './tipMapping';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) {return null;}
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function saveItemsDraft(items: ItemPayload[]) {
  if (typeof window === 'undefined') {return;}
  localStorage.setItem(ITEMS_KEY, JSON.stringify({ items }));
}

function loadItemsDraft(): ItemPayload[] {
  if (typeof window === 'undefined') {return [];}
  const parsed = safeParse<{ items?: ItemPayload[] }>(localStorage.getItem(ITEMS_KEY));
  if (!parsed?.items || !Array.isArray(parsed.items)) {return [];}
  return parsed.items;
}

export default function SendList({
  products,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: SendListProps) {
  const [tips, setTips] = useState<Record<string, string>>({});
  const [tipSource, setTipSource] = useState<Record<string, TipSource>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [direction, setDirection] = useState<1 | -1>(1);

  const currentProduct = products[currentIndex];
  const nextProduct = products[currentIndex + 1] ?? null;

  const allTipsFilled = useMemo(
    () => products.every((p) => !!tips[p.id]?.trim()),
    [products, tips],
  );

  // Swipe (mobile)
  const touchStartX = useRef<number | null>(null);

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((i) => Math.min(i + 1, products.length - 1));
  };

  const canGoNext = useMemo(() => {
    if (!products.length) {return false;}
    if (currentIndex >= products.length - 1) {return false;}
    const id = products[currentIndex]?.id;
    return !!tips[id]?.trim();
  }, [products, currentIndex, tips]);

  useEffect(() => {
    if (!products.length) {return;}
    setCurrentIndex((i) => Math.min(i, products.length - 1));
  }, [products.length]);

  useEffect(() => {
    if (!products.length) {return;}

    const items = loadItemsDraft();
    if (!items.length) {return;}

    const productIds = new Set(products.map((p) => p.id));

    const restoredTips: Record<string, string> = {};
    const restoredSource: Record<string, TipSource> = {};

    for (const it of items) {
      if (!it?.productId || !productIds.has(it.productId)) {continue;}

      restoredTips[it.productId] = it.giftHintMessage ?? '';
      restoredSource[it.productId] = it.giftHintSource ?? 'USER';
    }

    setTips((prev) => ({ ...prev, ...restoredTips }));
    setTipSource((prev) => ({ ...prev, ...restoredSource }));
  }, [products]);

  const persistDraftFromState = (
    nextTips: Record<string, string>,
    nextSource: Record<string, TipSource>,
  ) => {
    const items: ItemPayload[] = products
      .map((p) => ({
        productId: p.id,
        giftHintMessage: (nextTips[p.id] || '').slice(0, 50),
        giftHintSource: nextSource[p.id] ?? 'USER',
      }))
      .filter((it) => it.giftHintMessage.trim().length > 0);

    saveItemsDraft(items);
  };

  const handleGenerateTip = (productId: string) => {
    const firstAnswer = getFirstQuestionAnswer();
    const tipKey = mapPersonToTipKey(firstAnswer);
    const tipsList = TIPS_BY_PERSON[tipKey];

    if (!tipsList?.length) {return;}

    const randomTip = tipsList[Math.floor(Math.random() * tipsList.length)];

    setTips((prev) => {
      const nextTips = { ...prev, [productId]: randomTip };

      persistDraftFromState(nextTips, {
        ...tipSource,
        [productId]: 'AI',
      });

      return nextTips;
    });

    setTipSource((prev) => ({ ...prev, [productId]: 'AI' as TipSource }));
  };

  const handleTipChange = (productId: string, value: string) => {
    const nextValue = value.slice(0, 50);

    setTips((prev) => {
      const nextTips = { ...prev, [productId]: nextValue };

      persistDraftFromState(nextTips, {
        ...tipSource,
        [productId]: 'USER',
      });

      return nextTips;
    });

    setTipSource((prev) => ({ ...prev, [productId]: 'USER' as TipSource }));
  };

  const handleSubmit = () => {
    if (!allTipsFilled) {return;}

    const items: ItemPayload[] = products.map((p) => ({
      productId: p.id,
      giftHintMessage: (tips[p.id] || '').trim(),
      giftHintSource: tipSource[p.id] ?? 'USER',
    }));

    saveItems(items);
    onNext();
  };

  const cardVariants = {
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? 24 : -24,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? -24 : 24,
      opacity: 0,
      scale: 0.985,
    }),
  };

  return (
    <>
      <QuestionsHeader variant="light">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <QuestionsTitle
          title="Defina as dicas para o presenteado"
          subtitle="O presente será escolhido só pelas dicas, mantendo a surpresa!"
          className="mb-4 flex flex-col items-start"
          variant="light"
        >
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="text-sm text-color-green-30 hover:underline flex items-center gap-1 -mt-2"
            type="button"
          >
            Confira como aparecerá para o presenteado
          </button>
        </QuestionsTitle>

        {/* CONTADOR MOBILE */}
        <div className="md:hidden flex items-center justify-center -mt-2 mb-4 text-sm text-gray-500">
          {currentIndex + 1}/{products.length}
        </div>

        {/* MOBILE */}
        <div className="md:hidden w-full">
          <div className="overflow-hidden w-full">
            <div className="flex items-stretch gap-3 w-full">
              <div className="flex-shrink-0 w-full">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  {currentProduct && (
                    <motion.div
                      key={currentProduct.id}
                      custom={direction}
                      variants={cardVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="w-full border rounded-xl bg-white"
                      onTouchStart={(e) => {
                        touchStartX.current = e.touches[0]?.clientX ?? null;
                      }}
                      onTouchEnd={(e) => {
                        const start = touchStartX.current;
                        touchStartX.current = null;
                        if (start == null) {return;}

                        const end = e.changedTouches[0]?.clientX ?? start;
                        const delta = end - start;

                        const THRESHOLD = 40;
                        if (Math.abs(delta) < THRESHOLD) {return;}

                        if (delta < 0) {
                          if (canGoNext) {goNext();}
                          return;
                        }

                        if (delta > 0) {goPrev();}
                      }}
                    >
                      <div className="p-4">
                        <div className="w-full flex justify-center mb-4">
                          <TipImage
                            imageUrl={currentProduct.imageUrl}
                            alt={currentProduct.productName}
                            className="relative w-28 h-28"
                          />
                        </div>

                        <TipForm
                          productName={currentProduct.productName}
                          value={tips[currentProduct.id] || ''}
                          onChange={(v) => handleTipChange(currentProduct.id, v)}
                          onGenerate={() => handleGenerateTip(currentProduct.id)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP  */}
        {currentProduct && (
          <div className="hidden md:block w-full">
            <div className="flex justify-center gap-8 text-sm text-gray-500 mb-4">
              <button
                onClick={() => {
                  setDirection(-1);
                  setCurrentIndex((i) => Math.max(i - 1, 0));
                }}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 disabled:opacity-40"
                type="button"
              >
                <Icon icon="ph:arrow-circle-left-light" width="20" />
                Anterior
              </button>

              <span className="font-medium">
                {currentIndex + 1}/{products.length}
              </span>

              <button
                onClick={() => {
                  setDirection(1);
                  setCurrentIndex((i) => Math.min(i + 1, products.length - 1));
                }}
                disabled={currentIndex === products.length - 1 || !tips[currentProduct.id]?.trim()}
                className="flex items-center gap-1 disabled:opacity-40"
                type="button"
              >
                Próximo
                <Icon icon="ph:arrow-circle-right-light" width="20" />
              </button>
            </div>

            <div className="w-full border rounded-xl bg-white p-4 flex gap-6">
              <div className="relative w-28 h-36">
                <TipImage
                  imageUrl={currentProduct.imageUrl}
                  alt={currentProduct.productName}
                  className="relative w-28 h-36"
                />
              </div>

              <div className="flex-1">
                <TipForm
                  productName={currentProduct.productName}
                  value={tips[currentProduct.id] || ''}
                  onChange={(v) => handleTipChange(currentProduct.id, v)}
                  onGenerate={() => handleGenerateTip(currentProduct.id)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-px bg-[#CED4DA] my-6" />

        <SurveyActions
          onBack={onBack}
          onNext={allTipsFilled ? handleSubmit : undefined}
          nextDisabled={!allTipsFilled}
          nextLabel="Próximo"
        />
      </QuestionsHeader>

      {isPreviewOpen && (
        <PreviewModal onClose={() => setIsPreviewOpen(false)} products={products} tips={tips} />
      )}
    </>
  );
}
