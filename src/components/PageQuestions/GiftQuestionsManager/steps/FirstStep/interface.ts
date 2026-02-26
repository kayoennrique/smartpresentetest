export type Props = {
  senderName: string;
  recipientName: string;
  itemsCount: number;
  currentStep?: number;
  totalSteps?: number;
  onNext: () => void;
};
