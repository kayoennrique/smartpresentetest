import type { ProductSendList } from '../SendList/interface';

export interface WhatsappQuestionProps {
  onNext: (answer: Record<string, any>) => void;
  onBack: () => void;
  currentStep?: number;
  totalSteps?: number;
  products: ProductSendList[];

  onFinishCleanup?: () => void;
}

export type HeaderPayload = {
  senderName: string;
  recipientName: string;
  recipientPhone?: string;
  hideGifts: boolean;
  contactResponsible: 'PLATFORM' | 'CLIENT';
};

export type ItemPayload = {
  productId: string;
  giftHintMessage: string;
  giftHintSource: 'USER' | 'AI';
};
