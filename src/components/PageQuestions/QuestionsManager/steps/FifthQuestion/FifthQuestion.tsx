'use client';

import { useEffect, useState } from 'react';
import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import { FifthQuestionProps } from './interface';
import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import { Selections } from './types';
import { choices } from './choices';
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

export default function FifthQuestion({
  onNext,
  onBack,
  currentStep = 5,
  totalSteps = 10,
}: FifthQuestionProps) {
  const [selections, setSelections] = useState<Selections>({});

  useEffect(() => {
    const saved = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};
    const savedPersonality = saved['rq-personalidade'];

    // Esperado: ["E","S","T","J"] (ou similar)
    if (Array.isArray(savedPersonality) && savedPersonality.length === 4) {
      const arr = savedPersonality.filter((v) => typeof v === 'string' && v.trim()) as string[];

      if (arr.length === 4) {
        setSelections({
          choiceOne: arr[0],
          choiceTwo: arr[1],
          choiceThree: arr[2],
          choiceFour: arr[3],
        } as Selections);
      }
    }
  }, []);

  const isFormValid =
    Boolean(selections.choiceOne) &&
    Boolean(selections.choiceTwo) &&
    Boolean(selections.choiceThree) &&
    Boolean(selections.choiceFour);

  const persist = (next: Selections) => {
    const personalityArray = [
      next.choiceOne || '',
      next.choiceTwo || '',
      next.choiceThree || '',
      next.choiceFour || '',
    ] as string[];

    const mbti = personalityArray.every(Boolean) ? personalityArray.join('') : '';

    updateSurveyAnswers({
      'rq-personalidade': personalityArray,
      'rq-mbti': mbti,
    });
  };

  const handleSelect = (group: keyof Selections, optionId: string) => {
    setSelections((prev) => {
      let next: Selections;

      if (prev[group] === optionId) {
        const updated = { ...prev };
        delete updated[group];
        next = updated;
      } else {
        next = {
          ...prev,
          [group]: optionId,
        };
      }

      persist(next);
      return next;
    });
  };

  const handleNext = () => {
    if (!isFormValid) return;

    const personalityArray = [
      selections.choiceOne,
      selections.choiceTwo,
      selections.choiceThree,
      selections.choiceFour,
    ] as string[];

    onNext({
      'rq-personalidade': personalityArray,
      'rq-mbti': personalityArray.join(''),
    });
  };

  return (
    <QuestionsHeader variant="dark">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        textColorClass="text-[#F8F9FA]"
      />
      <QuestionsTitle
        variant="dark"
        title="Como é a personalidade e o estilo de vida da pessoa presenteada?"
        className="-mt-4"
      >
        <div className="w-full mb-8 mt-4 gap-3 flex flex-col lg:grid lg:grid-cols-2">
          {Object.entries(choices).map(([groupKey, group]) => {
            const selectedValue = selections[groupKey as keyof Selections];

            return (
              <div key={groupKey} className="border rounded-xl p-4">
                <p className="text-sm font-medium text-white mb-3">{group.title}</p>

                <div className="grid grid-cols-1 gap-3">
                  {group.options.map((option) => {
                    const isSelected = selectedValue === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelect(groupKey as keyof Selections, option.id)}
                        className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all text-left
                              ${
                                isSelected
                                  ? 'border-color-green-10 bg-[rgba(34,197,94,0.22)] text-[#F8F9FA]'
                                  : 'border-gray-700 bg-[#252736] text-[#F8F9FA] hover:border-color-green-10 hover:bg-[rgba(34,197,94,0.18)] hover:text-[#F8F9FA]'
                              }
                            `}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-[#2B2E3F] mb-4" />

        <SurveyActions onBack={onBack} onNext={handleNext} nextDisabled={!isFormValid} />
      </QuestionsTitle>
    </QuestionsHeader>
  );
}
