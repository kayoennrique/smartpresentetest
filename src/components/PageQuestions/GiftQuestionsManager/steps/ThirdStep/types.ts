export type ThirdStepConfirmPayload = {
  recipientAddressStreet: string;
  recipientAddressNumber: string;
  recipientAddressComplement?: string;
  recipientAddressNeighborhood: string;
  recipientAddressCity: string;
  recipientAddressState: string;
  recipientAddressPostalCode: string;
  recipientAddressCountry: string;
};

export type ThirdStepProps = {
  currentStep?: number;
  totalSteps?: number;

  hintText?: string;

  selectedPreview?: {
    title: string;
    subtitle?: string;
    imageUrl?: string;
  } | null;

  onBack: () => void;
  onConfirm: (payload: ThirdStepConfirmPayload) => void;

  submitting?: boolean;
  submitError?: string | null;
};
