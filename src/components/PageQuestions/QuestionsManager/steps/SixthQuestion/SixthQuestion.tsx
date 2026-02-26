'use client';

import { useEffect, useState } from 'react';

import { SixthQuestionProps } from './interface';
import { OCCASION_OPTIONS } from './occasionOptions';

import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';

import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';

const SURVEY_KEY = 'survey-answers';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function updateSurveyAnswers(patch: Record<string, any>) {
  if (typeof window === 'undefined') return;

  const current = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};

  localStorage.setItem(SURVEY_KEY, JSON.stringify({ ...current, ...patch }));
}

export default function SixthQuestion({
  onNext,
  onBack,
  currentStep = 6,
  totalSteps = 10,
}: SixthQuestionProps) {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');

  useEffect(() => {
    const saved = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};
    const savedValue = saved['rq-ocasiao'];

    if (typeof savedValue === 'string' && savedValue.trim()) {
      setSelectedOccasion(savedValue.trim());
    }
  }, []);

  const handleSelect = (optionId: string) => {
    setSelectedOccasion(optionId);
    updateSurveyAnswers({ 'rq-ocasiao': optionId });
  };

  const handleNext = () => {
    if (!selectedOccasion) return;

    updateSurveyAnswers({ 'rq-ocasiao': selectedOccasion });

    onNext({
      'rq-ocasiao': selectedOccasion,
    });
  };

  return (
    <QuestionsHeader variant="dark">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        textColorClass="text-[#F8F9FA]"
      />

      <QuestionsTitle title="Qual ocasião?" variant="dark" className="-mt-4">
        <div className="space-y-3 mb-8 mt-4 w-full">
          {OCCASION_OPTIONS.map((option) => {
            const isSelected = selectedOccasion === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className={`w-full p-4 rounded-xl border-2 text-sm font-semibold transition-all text-left
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

        <SurveyActions onBack={onBack} onNext={handleNext} nextDisabled={!selectedOccasion} />
      </QuestionsTitle>
    </QuestionsHeader>
  );
}
