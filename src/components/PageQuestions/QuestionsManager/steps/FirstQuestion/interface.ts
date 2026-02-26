export interface FirstQuestionProps {
  onNext: (answer: Record<string, string | string[]>) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}
