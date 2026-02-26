export interface RecommendedProduct {
  id: string;
  productName: string;
  description: string;
  retailer: string;
  productUrl: string;
  imageUrl: string;
  price: number;
  currency: 'BRL';
  featured: boolean;
}

export interface ResultsScreenProps {
  products: RecommendedProduct[];
  onRestart: () => void;
  onSendList: () => void;
}
