export interface TokenModalProps {
  open: boolean;
  token: string;
  onClose: () => void;
  setIsPreviewOpen: () => void;
}
