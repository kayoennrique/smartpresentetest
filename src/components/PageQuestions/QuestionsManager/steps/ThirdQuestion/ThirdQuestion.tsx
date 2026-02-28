'use client';

import { useEffect, useState } from 'react';


import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';

import { INTEREST_OPTIONS } from './interestOptions';
import type { ThirdQuestionProps } from './interface';

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

export default function ThirdQuestion({
  onNext,
  onBack,
  currentStep = 3,
  totalSteps = 10,
}: ThirdQuestionProps) {
  const [selectedInterest, setSelectedInterest] = useState<string>('');

  useEffect(() => {
    const saved = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};

    const savedValue = saved['rq-interesse'];

    if (typeof savedValue === 'string' && savedValue.trim()) {
      setSelectedInterest(savedValue);
    }
  }, []);

  const handleSelect = (optionId: string) => {
    setSelectedInterest(optionId);
    updateSurveyAnswers({ 'rq-interesse': optionId });
  };

  const handleNext = () => {
    if (!selectedInterest) {return;}

    onNext({
      'rq-interesse': selectedInterest,
    });
  };

  return (
    <QuestionsHeader variant="light">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <QuestionsTitle title="Qual é o principal interesse da pessoa presenteada?" className="-mt-4">
        <div className="grid grid-cols-2 gap-3 mb-8 mt-4 w-full">
          {INTEREST_OPTIONS.map((option) => {
            const isSelected = selectedInterest === option.id;

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

        <SurveyActions onBack={onBack} onNext={handleNext} nextDisabled={!selectedInterest} />
      </QuestionsTitle>
    </QuestionsHeader>
  );
}
