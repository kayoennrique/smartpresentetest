export interface SecondQuestionProps {
  onNext: (answer: Record<string, string | string[]>) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}
