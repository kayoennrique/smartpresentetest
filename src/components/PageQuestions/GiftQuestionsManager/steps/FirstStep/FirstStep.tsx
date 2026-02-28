'use client';

import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import GiftCardForm from '@/components/PageQuestions/QuestionsManager/steps/SignatureList/GiftReadyList/GiftCardForm';

import type { Props } from './interface';

export default function FirstStep({
  senderName,
  recipientName,
  itemsCount,
  currentStep = 1,
  totalSteps = 3,
  onNext,
}: Props) {
  return (
    <QuestionsHeader>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="px-6 w-full flex flex-col">
        <p className="text-lg font-semibold text-gray-900 leading-relaxed">
          Olá <span className="text-[#4E8872]">{recipientName}! </span>
          <span className="text-[#4E8872]">{senderName}</span> enviou uma lista de presentes
          personalizada para você!
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Escolha uma dentre {itemsCount} presentes para que
          <span className="font-semibold text-color-blue-10"> {senderName}</span> possa lhe
          presentear
        </p>

        <div className="mt-4">
          <GiftCardForm fromName={senderName} toName={recipientName} readOnly />
        </div>

        <div>
          <div className="flex justify-center pb-8 -mt-6">
            <div className="w-full max-w-2xl">
              <div className="w-full h-px bg-[#CED4DA] my-6" />
              <SurveyActions
                variant="primary"
                onNext={onNext}
                showBack={false}
                nextLabel="Escolha seu presente"
              />
            </div>
          </div>
        </div>
      </div>
    </QuestionsHeader>
  );
}
