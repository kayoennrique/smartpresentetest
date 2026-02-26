export type BuyerListVM = {
  id: string;
  title: string;
  shareCode: string;
  createdAt: string;
  hideGifts?: boolean;
  recipientName: string;

  items: Array<{
    id: string;
    productId?: string;
    name: string;
    description?: string;
    giftHintMessage?: string;
    imageUrl?: string;

    priceCents?: number;
    currencyType?: string;
    retailerName?: string;
    retailerLogoUrl?: string;

    isSelectedByRecipient?: boolean;
  }>;

  selected?: {
    id: string;
    name: string;
    description?: string;
    giftHintMessage?: string;
    imageUrl?: string;

    priceCents?: number;
    currencyType?: string;
    retailerName?: string;
    retailerLogoUrl?: string;
  } | null;

  addressText: string;
};
