'use client';

import { useEffect, useState } from 'react';

import { api } from '@/services/api';
import type { ApiError } from '@/types/lists';
import type { SurveyAnswers } from '@/types/survey';

const STORAGE_KEY = 'survey-answers';
const API_URL = '/recommendations';

export function useSurvey(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar respostas salvas:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [answers]);

  const next = (answer: Partial<SurveyAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...answer }));
    setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  };

  const back = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goTo = (step: number, answer: Partial<SurveyAnswers> = {}) => {
    if (answer && typeof answer === 'object') {
      setAnswers((prev) => ({ ...prev, ...answer }));
    }

    const target = Math.min(Math.max(1, Number(step) || 1), totalSteps);
    setCurrentStep(target);
  };

  const finish = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!answers['rq-tipo_presenteado']) {throw new Error('Tipo de presenteado é obrigatório');}
      if (!answers['rq-faixa_etaria']) {throw new Error('Faixa etária é obrigatória');}
      if (!answers['rq-ocasiao']) {throw new Error('Ocasião é obrigatória');}
      if (!answers['rq-mini'] || !answers['rq-max'])
        {throw new Error('Faixa de preço é obrigatória');}

      const payload = {
        recipient: answers['rq-tipo_presenteado'],
        ageGroup: answers['rq-faixa_etaria'],
        interests: answers['rq-interesse'] ? [answers['rq-interesse']] : [],
        lifestyle: answers['rq-estilo_vida']?.[0],
        personality: answers['rq-personalidade'] || [],
        mbti: answers['rq-mbti'],
        occasion: answers['rq-ocasiao'],
        minPrice: Number(answers['rq-mini']),
        maxPrice: Number(answers['rq-max']),
        state: 'SP',
        city: 'Sao Paulo',
      };

      const { data } = await api.post(API_URL, payload);

      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      setAnswers({});

      return data;
    } catch (err: any) {
      const apiErr = err as ApiError;
      setError(apiErr?.message || err?.message || 'Erro ao finalizar');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrentStep(1);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }

    setError(null);
  };

  return {
    currentStep,
    answers,
    next,
    back,
    goTo,
    finish,
    reset,
    isLastStep: currentStep === totalSteps,
    isLoading,
    error,
  };
}
