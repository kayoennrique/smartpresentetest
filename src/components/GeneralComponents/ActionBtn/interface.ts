import type React from 'react';

export type SurveyActionVariant = 'primary' | 'secondary';

export interface SurveyActionsProps {
  onBack?: () => void;
  onNext?: () => void;

  showBack?: boolean;
  showNext?: boolean;

  backLabel?: string;
  nextLabel?: string;

  backDisabled?: boolean;
  nextDisabled?: boolean;

  backIcon?: string;
  nextIcon?: string;

  containerClassName?: string;
  backButtonClassName?: string;
  nextButtonClassName?: string;

  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;

  variant?: SurveyActionVariant;
}


export type ActionButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  variant?: SurveyActionVariant;
  className?: string;
  children: React.ReactNode;
};