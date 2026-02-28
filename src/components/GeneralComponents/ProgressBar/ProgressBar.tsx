import type { ProgressBarProps } from './interface';

export default function ProgressBar({
  currentStep,
  totalSteps,
  textColorClass = 'text-gray-600',
}: ProgressBarProps) {
  return (
    <div className="pt-6 flex flex-col items-center">
      <div className={`text-center text-sm mb-2 ${textColorClass}`}>
        {currentStep}/{totalSteps}
      </div>

      <div className="w-full flex gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className={`flex-1 h-2.5 rounded-full transition-all duration-500 ${
                isCompleted
                  ? 'bg-color-green-30'
                  : isCurrent
                    ? 'bg-color-green-40'
                    : 'bg-color-gray-50'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
