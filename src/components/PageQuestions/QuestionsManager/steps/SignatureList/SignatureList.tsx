'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FirstQuestionProps, HeaderDraft } from './interface';

import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import { useGiftListPayloads } from '@/hooks/useGiftList';
import { GiftVisibilityValue } from './GiftReadyList/types';
import GiftCardForm from './GiftReadyList/GiftCardForm';
import GiftVisibilityOptions from './GiftReadyList/GiftVisibilityOptions';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';

const DEFAULT_RECIPIENT_PHONE = process.env.NEXT_PUBLIC_DEFAULT_RECIPIENT_PHONE || '+5511999999999';

const HEADER_KEY = 'gift-list-header';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function updateHeaderDraft(patch: Partial<HeaderDraft>) {
  if (typeof window === 'undefined') return;

  const current = safeParse<HeaderDraft>(localStorage.getItem(HEADER_KEY)) || {};
  localStorage.setItem(HEADER_KEY, JSON.stringify({ ...current, ...patch }));
}

export default function GiftReadyList({
  onNext,
  onBack,
  currentStep = 8,
  totalSteps = 10,
}: FirstQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<GiftVisibilityValue | ''>('');
  const [fromName, setFromName] = useState<string>('');
  const [toName, setToName] = useState<string>('');

  const router = useRouter();
  const { saveHeaderPayload } = useGiftListPayloads();

  const handleBack = () => router.back();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = safeParse<HeaderDraft>(localStorage.getItem(HEADER_KEY)) || {};

    if (typeof saved.senderName === 'string') setFromName(saved.senderName);
    if (typeof saved.recipientName === 'string') setToName(saved.recipientName);

    if (typeof saved.sendMode === 'string' && saved.sendMode.trim()) {
      setSelectedOption(saved.sendMode as GiftVisibilityValue);
    } else if (typeof saved.hideGifts === 'boolean') {
      setSelectedOption(saved.hideGifts ? 'send-now' : 'send-list');
    }
  }, []);

  const handleChangeFromName = (value: string) => {
    setFromName(value);
    updateHeaderDraft({ senderName: value });
  };

  const handleChangeToName = (value: string) => {
    setToName(value);
    updateHeaderDraft({ recipientName: value });
  };

  const handleChangeOption = (value: GiftVisibilityValue | '') => {
    setSelectedOption(value);
    updateHeaderDraft({
      sendMode: value,
      hideGifts: value === 'send-now',
    });
  };

  const handleNext = () => {
    if (!selectedOption || !fromName.trim() || !toName.trim()) return;

    updateHeaderDraft({
      senderName: fromName.trim(),
      recipientName: toName.trim(),
      recipientPhone: DEFAULT_RECIPIENT_PHONE,
      hideGifts: selectedOption === 'send-now',
      contactResponsible: 'PLATFORM',
      sendMode: selectedOption,
    });

    saveHeaderPayload({
      senderName: fromName.trim(),
      recipientName: toName.trim(),
      recipientPhone: DEFAULT_RECIPIENT_PHONE,
      hideGifts: selectedOption === 'send-now',
      contactResponsible: 'PLATFORM',
    });

    onNext({
      'rq-lista_presente': selectedOption,
      'rq-de': fromName,
      'rq-para': toName,
    });
  };

  const isNextDisabled = !selectedOption || !fromName.trim() || !toName.trim();

  return (
    <QuestionsHeader variant="light">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <QuestionsTitle
        title="Lista de presentes pronta para enviar"
        subtitle="Informe os dados para identificação no cartão do presente."
        variant="light"
        className="w-full"
      >
        <GiftCardForm
          fromName={fromName}
          toName={toName}
          onChangeFromName={handleChangeFromName}
          onChangeToName={handleChangeToName}
        />

        <GiftVisibilityOptions value={selectedOption} onChange={handleChangeOption} />

        <div className="w-full h-px bg-[#CED4DA] mb-4" />

        <SurveyActions onBack={handleBack} onNext={handleNext} nextDisabled={isNextDisabled} />
      </QuestionsTitle>
    </QuestionsHeader>
  );
}
