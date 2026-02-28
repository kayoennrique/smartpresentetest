'use client';

import { useState } from 'react';

import LoadingState from '@/components/GeneralComponents/LoadingState/LoadingState';
import { useSurvey } from '@/hooks/useSurvey';

import PauseQuestions from '../PauseQuestions/PauseQuestions';

import AnalyzingScreen from './steps/AnalyzingScreen/AnalyzingScreen';
import FifthQuestion from './steps/FifthQuestion/FifthQuestion';
import FirstQuestion from './steps/FirstQuestion/FirstQuestion';
import FourthQuestion from './steps/FourthQuestion/FourthQuestion';
import ResultsScreen from './steps/ResultsScreen/ResultsScreen';
import SecondQuestion from './steps/SecondQuestion/SecondQuestion';
import type { ItemPayload } from './steps/SendList/interface';
import SendList from './steps/SendList/SendList';
import { saveItems } from './steps/SendList/storage';
import SeventhQuestions from './steps/SeventhQuestion/SeventhQuestions';
import GiftReadyList from './steps/SignatureList/SignatureList';
import SixthQuestion from './steps/SixthQuestion/SixthQuestion';
import ThirdQuestion from './steps/ThirdQuestion/ThirdQuestion';
import WhatsappQuestion from './steps/WhatsAppComponent/WhatsAppComponent';

const TOTAL_STEPS = 14;
const TOTAL_QUESTIONS = 10;

export default function QuestionsManager() {
  const { currentStep, next, back, goTo, finish, reset, isLoading, error } = useSurvey(TOTAL_STEPS);

  const [products, setProducts] = useState<any[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  const getQuestionNumber = (step: number): number | null => {
    const map: Record<number, number> = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      6: 5,
      7: 6,
      8: 7,
      11: 8,
      12: 9,
      13: 10,
      14: 11,
    };

    return map[step] ?? null;
  };

  const currentQuestionNumber = getQuestionNumber(currentStep);

  const handleFinish = async () => {
    if (isFinishing) {return;}
    setIsFinishing(true);

    try {
      const result = await finish();
      setProducts(Array.isArray(result) ? result : []);
      next({});
    } finally {
      setIsFinishing(false);
    }
  };

  const handleRestart = () => {
    localStorage.removeItem('survey-results');
    window.location.reload();
  };

  const handleGiftReadyNext = (payload: any) => {
    const opt = payload?.['rq-lista_presente'];

    if (opt === 'send-list') {
      const items: ItemPayload[] = (products || [])
        .filter((p) => p && (p.id || p.productId))
        .map((p) => ({
          productId: p.id ?? p.productId,
          giftHintMessage: '',
          giftHintSource: 'USER',
        }));

      saveItems(items);
      goTo(13, payload);
      return;
    }

    goTo(12, payload);
  };

  return (
    <>
      {currentStep === 1 && (
        <FirstQuestion
          onNext={next}
          onBack={back}
          currentStep={currentQuestionNumber ?? 1}
          totalSteps={TOTAL_QUESTIONS}
        />
      )}

      {currentStep === 2 && (
        <SecondQuestion
          onNext={next}
          onBack={back}
          currentStep={currentQuestionNumber ?? 1}
          totalSteps={TOTAL_QUESTIONS}
        />
      )}

      {currentStep === 3 && (
        <ThirdQuestion
          onNext={next}
          onBack={back}
          currentStep={currentQuestionNumber ?? 1}
          totalSteps={TOTAL_QUESTIONS}
        />
      )}

      {currentStep === 4 && (
        <FourthQuestion
          onNext={next}
          onBack={back}
          currentStep={currentQuestionNumber ?? 1}
          totalSteps={TOTAL_QUESTIONS}
        />
      )}

      {currentStep === 5 && <PauseQuestions onNext={next} onBack={back} />}

      {currentStep === 6 && (
        <FifthQuestion
          onNext={next}
          onBack={back}
          currentStep={currentQuestionNumber ?? 1}
          totalSteps={TOTAL_QUESTIONS}
        />
      )}

      {currentStep === 7 && (
        <SixthQuestion
          onNext={next}
          onBack={back}
          currentStep={currentQuestionNumber ?? 1}
          totalSteps={TOTAL_QUESTIONS}
        />
      )}

      {currentStep === 8 && (
        <SeventhQuestions
          onNext={next}
          onBack={back}
          currentStep={currentQuestionNumber ?? 1}
          totalSteps={TOTAL_QUESTIONS}
        />
      )}

      {currentStep === 9 && <AnalyzingScreen onNext={handleFinish} />}

      {currentStep === 10 && (
        <ResultsScreen products={products} onRestart={handleRestart} onSendList={() => next({})} />
      )}

      {currentStep === 11 && (
        <GiftReadyList
          onNext={handleGiftReadyNext}
          onBack={back}
          currentStep={currentQuestionNumber ?? TOTAL_QUESTIONS}
          totalSteps={TOTAL_QUESTIONS}
        />
      )}

      {currentStep === 12 && (
        <SendList
          products={products}
          onNext={() => next({})}
          onBack={back}
          currentStep={currentQuestionNumber ?? TOTAL_QUESTIONS}
          totalSteps={TOTAL_QUESTIONS}
        />
      )}

      {currentStep === 13 && (
        <WhatsappQuestion
          onNext={next}
          onBack={back}
          currentStep={currentQuestionNumber ?? TOTAL_QUESTIONS}
          totalSteps={TOTAL_QUESTIONS}
          products={products}
          onFinishCleanup={reset}
        />
      )}

      {isLoading && <LoadingState />}

      {error && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </>
  );
}
