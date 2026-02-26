'use client';

import { useEffect, useState } from 'react';

import { FourthQuestionProps } from './interface';
import { LIFE_STYLE_OPTIONS } from './lifeStyleOptions';

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

function normalizeSingleSelection(value: unknown): string {
  if (typeof value === 'string') return value.trim();

  if (Array.isArray(value)) {
    const firstValid = value.find((v) => typeof v === 'string' && v.trim());
    return typeof firstValid === 'string' ? firstValid.trim() : '';
  }

  return '';
}

export default function FourthQuestion({
  onNext,
  onBack,
  currentStep = 4,
  totalSteps = 10,
}: FourthQuestionProps) {
  const [selectedLifeStyle, setSelectedLifeStyle] = useState<string>('');

  useEffect(() => {
    const saved = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};
    const savedValue = saved['rq-estilo_vida'];

    const normalized = normalizeSingleSelection(savedValue);
    if (normalized) setSelectedLifeStyle(normalized);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedLifeStyle(id);

    updateSurveyAnswers({ 'rq-estilo_vida': [id] });
  };

  const handleNext = () => {
    if (!selectedLifeStyle) return;

    onNext({
      'rq-estilo_vida': [selectedLifeStyle],
    });
  };

  return (
    <QuestionsHeader variant="light">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <QuestionsTitle title="Qual é o estilo de vida da pessoa presenteada?" className="-mt-4">
        <div className="space-y-3 mb-8 mt-4 w-full">
          {LIFE_STYLE_OPTIONS.map((option) => {
            const isSelected = selectedLifeStyle === option.id;

            return (
              <button
                key={option.id}
                type="button"
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

        <SurveyActions onBack={onBack} onNext={handleNext} nextDisabled={!selectedLifeStyle} />
      </QuestionsTitle>
    </QuestionsHeader>
  );
}
