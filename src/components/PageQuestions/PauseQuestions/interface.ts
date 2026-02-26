export interface PauseQuestionsProps {
  onNext: (answer: Record<string, string | string[]>) => void;
  onBack: () => void;
}
