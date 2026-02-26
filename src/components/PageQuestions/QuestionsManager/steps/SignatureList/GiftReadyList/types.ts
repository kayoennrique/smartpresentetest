export type GiftVisibilityValue = "send-now" | "send-list";

// ✅ agora o Card aceita 2 modos: edit ou readOnly
export type GiftCardFormProps =
  | {
      fromName: string;
      toName: string;
      readOnly?: false; // padrão
      onChangeFromName: (value: string) => void;
      onChangeToName: (value: string) => void;
    }
  | {
      fromName: string;
      toName: string;
      readOnly: true;
      onChangeFromName?: never;
      onChangeToName?: never;
    };

export type GiftVisibilityOptionsProps = {
  value: GiftVisibilityValue | "";
  onChange: (value: GiftVisibilityValue) => void;
};
