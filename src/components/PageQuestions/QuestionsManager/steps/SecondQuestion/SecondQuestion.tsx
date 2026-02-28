'use client';

import { useEffect, useState } from 'react';


import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';

import { AGE_OPTIONS } from './ageOptions';
import type { SecondQuestionProps } from './interface';

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

export default function SecondQuestion({
  onNext,
  onBack,
  currentStep = 2,
  totalSteps = 10,
}: SecondQuestionProps) {
  const [selectedAge, setSelectedAge] = useState<string>('');

  useEffect(() => {
    const saved = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};

    const savedValue = saved['rq-faixa_etaria'];

    if (typeof savedValue === 'string' && savedValue.trim()) {
      setSelectedAge(savedValue);
    }
  }, []);

  const handleSelect = (optionId: string) => {
    setSelectedAge(optionId);
    updateSurveyAnswers({ 'rq-faixa_etaria': optionId });
  };

  const handleNext = () => {
    if (!selectedAge) {return;}

    onNext({
      'rq-faixa_etaria': selectedAge,
    });
  };

  return (
    <QuestionsHeader variant="light">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <QuestionsTitle title="Qual é a idade da pessoa presenteada?" className="-mt-4">
        <div className="space-y-3 mb-8 mt-4 w-full">
          {AGE_OPTIONS.map((option) => {
            const isSelected = selectedAge === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left font-semibold
                  ${
                    isSelected
                      ? 'border-color-green-10 bg-color-green-20 text-color-gray-40'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-color-green-10 hover:bg-color-green-20'
                  }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="w-full h-px bg-[#CED4DA] mb-4" />

        <SurveyActions onBack={onBack} onNext={handleNext} nextDisabled={!selectedAge} />
      </QuestionsTitle>
    </QuestionsHeader>
  );
}
