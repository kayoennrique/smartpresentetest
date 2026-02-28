'use client';

import Image from 'next/image';

import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';

import QuestionsHeader from '../QuestionsHeader/QuestionsHeader';

import type { PauseQuestionsProps } from './interface';

export default function PauseQuestions({ onNext, onBack }: PauseQuestionsProps) {
  return (
    <QuestionsHeader variant="dark">
      <p className="text-left text-[16px] md:text-[19px] text-[#F8F9FA] font-semibold leading-relaxed px-4 mt-4 w-full">
        Falta pouco! Precisamos só de mais 3 respostas.​ Depois disso, você recebe suas sugestões de
        presente.
      </p>

      <div className="p-16 mx-auto flex items-center justify-center -mt-20">
        <Image src="/gift-green.png" alt="Presente" width={350} height={350} priority />
      </div>

      <p className="text-[14px] md:text-[16px] text-[#868E96] text-start leading-relaxed -mt-8 mb-4">
        Com isso, você receberá uma seleção personalizada com 6 opções pensadas para combinar com
        quem será presenteado.
      </p>

      <div className="w-full h-px bg-[#2B2E3F] mb-4" />

      <SurveyActions onBack={onBack} onNext={() => onNext({})} nextLabel="Próximo" />
    </QuestionsHeader>
  );
}
