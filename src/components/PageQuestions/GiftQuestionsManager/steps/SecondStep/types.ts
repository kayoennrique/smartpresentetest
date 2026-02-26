export interface RecommendedProduct {
  id: string;
  productName: string;
  description: string;
  retailer: string;
  productUrl: string;
  imageUrl: string;
  price: number;
  currency: "BRL";
  featured: boolean;
}

export type TipItem = {
  productId?: string;
  id?: string;
  giftHintMessage?: string;
};

export type CommonStepBaseProps = {
  selectedProductId: string;
  onBack: () => void;
  onConfirm: () => void;
  submitting?: boolean;
  submitError?: string | null;
};

export type SecondStepProps =
  | ({
      mode: "details";
      products: RecommendedProduct[];
      onSelect: (productId: string) => void;
    } & CommonStepBaseProps)
  | ({
      mode: "tips";
      items: TipItem[];
      onSelect: (productId: string, imgIndex: number) => void;
    } & CommonStepBaseProps);

export type SecondStepDetailsProps = Extract<
  SecondStepProps,
  { mode: "details" }
>;

export type SecondStepTipsProps = Extract<SecondStepProps, { mode: "tips" }>;
