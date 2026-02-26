export interface PreviewModalProps {
  onClose: () => void;
  products: {
    id: string;
    productName: string;
    imageUrl: string;
  }[];
  tips: Record<string, string>;
}
