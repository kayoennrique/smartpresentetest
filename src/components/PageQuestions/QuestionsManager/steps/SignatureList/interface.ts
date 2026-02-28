import type { GiftVisibilityValue } from './GiftReadyList/types';

export interface FirstQuestionProps {
  onNext: (answer: Record<string, string | string[]>) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export type HeaderDraft = {
  senderName?: string;
  recipientName?: string;
  recipientPhone?: string;
  hideGifts?: boolean;
  contactResponsible?: 'PLATFORM' | 'CLIENT';
  sendMode?: GiftVisibilityValue | '';
};
