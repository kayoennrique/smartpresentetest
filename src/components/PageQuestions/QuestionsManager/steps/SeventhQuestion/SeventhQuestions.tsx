'use client';

import { useEffect, useState } from 'react';


import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';

import type { SeventhQuestionsProps } from './interface';
import { PRICE_MAP } from './priceMap';
import { PRICE_OPTIONS } from './priceOptions';
import type { PriceOptionId } from './priceOptions';

const SURVEY_KEY = 'survey-answers';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) {return null;}
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function updateSurveyAnswers(patch: Record<string, any>) {
  if (typeof window === 'undefined') {return;}

  const current = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};

  localStorage.setItem(SURVEY_KEY, JSON.stringify({ ...current, ...patch }));
}

function findPriceOptionIdByRange(min?: unknown, max?: unknown): PriceOptionId | null {
  if (typeof min !== 'string' || typeof max !== 'string') {return null;}

  const entries = Object.entries(PRICE_MAP) as Array<[PriceOptionId, { min: string; max: string }]>;

  for (const [id, range] of entries) {
    if (range.min === min && range.max === max) {return id;}
  }

  return null;
}

export default function SeventhQuestions({
  onNext,
  onBack,
  currentStep = 7,
  totalSteps = 10,
}: SeventhQuestionsProps) {
  const [selectedPrice, setSelectedPrice] = useState<PriceOptionId | ''>('');

  useEffect(() => {
    const saved = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};

    const savedMin = saved['rq-mini'];
    const savedMax = saved['rq-max'];

    const optionId = findPriceOptionIdByRange(savedMin, savedMax);

    if (optionId) {
      setSelectedPrice(optionId);
    }
  }, []);

  const handleSelect = (optionId: PriceOptionId) => {
    setSelectedPrice(optionId);

    const range = PRICE_MAP[optionId];

    updateSurveyAnswers({
      'rq-mini': range.min,
      'rq-max': range.max,
    });
  };

  const handleNext = () => {
    if (!selectedPrice) {return;}

    const range = PRICE_MAP[selectedPrice];

    onNext({
      'rq-mini': range.min,
      'rq-max': range.max,
    });
  };

  return (
    <QuestionsHeader variant="dark">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        textColorClass="text-[#F8F9FA]"
      />

      <QuestionsTitle variant="dark" title="Qual faixa de preço?" className="-mt-4">
        <div className="space-y-3 mb-8 mt-4 w-full">
          {PRICE_OPTIONS.map((option) => {
            const isSelected = selectedPrice === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className={`w-full p-4 rounded-xl border-2 text-left text-sm font-semibold transition-all
                  ${
                    isSelected
                      ? 'border-color-green-10 bg-[rgba(34,197,94,0.22)] text-[#F8F9FA]'
                      : 'border-gray-700 bg-[#252736] text-[#F8F9FA] hover:border-color-green-10 hover:bg-[rgba(34,197,94,0.18)]'
                  }
                `}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="w-full h-px bg-[#2B2E3F] mb-4" />

        <SurveyActions onBack={onBack} onNext={handleNext} nextDisabled={!selectedPrice} />
      </QuestionsTitle>
    </QuestionsHeader>
  );
}
