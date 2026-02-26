export interface ProductSendList {
  id: string;
  productName: string;
  imageUrl: string;
}

export type TipSource = "USER" | "AI";

export type TipState = Record<string, { message: string; source: TipSource }>;

export type ItemPayload = {
  productId: string;
  giftHintMessage: string;
  giftHintSource: TipSource;
};

export interface SendListProps {
  products: ProductSendList[];
  onNext: (answer?: Record<string, any>) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export type TipFormProps = {
  productName: string;
  value: string;
  maxLen?: number;
  onChange: (value: string) => void;
  onGenerate: () => void;
};

export type TipImageProps = {
  imageUrl: string;
  alt: string;
  className: string;
};
