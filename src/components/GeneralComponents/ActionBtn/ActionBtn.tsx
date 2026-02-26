'use client';

import { Icon } from '@iconify/react';
import type { SurveyActionsProps } from './interface';

export default function SurveyActions(props: SurveyActionsProps) {
  const {
    onClick,
    children,
    className = '',
    disabled = false,
    variant = 'primary',

    onBack,
    onNext,

    showBack = true,
    showNext = true,

    backLabel = 'Voltar',
    nextLabel = 'Próximo',

    backDisabled = false,
    nextDisabled = false,

    backIcon,
    nextIcon = 'ph:arrow-circle-right-light',

    containerClassName = '',
    backButtonClassName = '',
    nextButtonClassName = '',
  } = props;

  if (onClick && children) {
    const baseClass = `
      w-full py-3 rounded-xl font-medium transition-all duration-200
      flex items-center justify-center gap-2 shadow-sm
    `;

    const variantClass =
      variant === 'secondary'
        ? `
          border-2
          ${
            disabled
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }
        `
        : `
          ${
            disabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-red-gradient text-white hover:opacity-90'
          }
        `;

    return (
      <div className={`w-full ${containerClassName}`}>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={`${baseClass} ${variantClass} ${className}`}
        >
          {children}
        </button>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 w-full ${containerClassName}`}>
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={backDisabled}
          className={`
            flex-1 py-3 rounded-xl border-2 font-medium transition-colors
            flex items-center justify-center gap-2
            ${
              backDisabled
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }
            ${backButtonClassName}
          `}
        >
          {backIcon && <Icon icon={backIcon} width={20} />}
          {backLabel}
        </button>
      )}

      {showNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`
            flex-1 py-3 rounded-xl font-medium transition-all duration-200
            flex items-center justify-center gap-2
            ${
              nextDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-red-gradient text-white hover:opacity-90'
            }
            ${nextButtonClassName}
          `}
        >
          {nextLabel}
          {nextIcon && <Icon icon={nextIcon} width={22} />}
        </button>
      )}
    </div>
  );
}
