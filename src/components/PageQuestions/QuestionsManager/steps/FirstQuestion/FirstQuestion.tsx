'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';

import type { FirstQuestionProps } from './interface';
import { PEOPLE_OPTIONS } from './peopleOptions';

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

export default function FirstQuestion({
  onNext,
  onBack,
  currentStep = 1,
  totalSteps = 10,
}: FirstQuestionProps) {
  const [selectedPeople, setSelectedPeople] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const saved = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};

    const savedValue = saved['rq-tipo_presenteado'];

    if (typeof savedValue === 'string' && savedValue.trim()) {
      setSelectedPeople(savedValue);
    }
  }, []);

  const handleSelect = (optionId: string) => {
    setSelectedPeople(optionId);
    updateSurveyAnswers({ 'rq-tipo_presenteado': optionId });
  };

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!selectedPeople) {return;}

    onNext({
      'rq-tipo_presenteado': selectedPeople,
    });
  };

  return (
    <QuestionsHeader variant="light">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <QuestionsTitle title="Quem você quer presentear?" className="-mt-4">
        <div className="grid grid-cols-2 gap-3 mb-8 mt-4 w-full">
          {PEOPLE_OPTIONS.map((option) => {
            const isSelected = selectedPeople === option.id;

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

        <SurveyActions onBack={handleBack} onNext={handleNext} nextDisabled={!selectedPeople} />
      </QuestionsTitle>
    </QuestionsHeader>
  );
}
