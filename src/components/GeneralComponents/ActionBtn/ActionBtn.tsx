'use client';

import { Icon } from '@iconify/react';


import type { ActionButtonProps, SurveyActionVariant, SurveyActionsProps } from './interface';


function getButtonClasses(variant: SurveyActionVariant, disabled: boolean) {
  const base =
    'w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm';

  if (variant === 'secondary') {
    if (disabled) {return `${base} border-2 border-gray-200 text-gray-400 cursor-not-allowed`;}
    return `${base} border-2 border-gray-300 text-gray-700 hover:bg-gray-50`;
  }

  if (disabled) {return `${base} bg-gray-200 text-gray-400 cursor-not-allowed`;}
  return `${base} bg-red-gradient text-white hover:opacity-90`;
}

function ActionButton({
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
  children,
}: ActionButtonProps) {
  const classes = getButtonClasses(variant, disabled);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${className}`}
    >
      {children}
    </button>
  );
}

function SingleAction({
  onClick,
  disabled = false,
  variant = 'primary',
  containerClassName = '',
  className = '',
  children,
}: Pick<
  SurveyActionsProps,
  'onClick' | 'disabled' | 'variant' | 'containerClassName' | 'className' | 'children'
>) {
  return (
    <div className={`w-full ${containerClassName}`}>
      <ActionButton onClick={onClick} disabled={disabled} variant={variant} className={className}>
        {children}
      </ActionButton>
    </div>
  );
}

function BackAction({
  onBack,
  backDisabled = false,
  backLabel = 'Voltar',
  backIcon,
  backButtonClassName = '',
}: Pick<SurveyActionsProps, 'onBack' | 'backDisabled' | 'backLabel' | 'backIcon' | 'backButtonClassName'>) {
  return (
    <ActionButton onClick={onBack} disabled={backDisabled} variant="secondary" className={backButtonClassName}>
      {backIcon ? <Icon icon={backIcon} width={20} /> : null}
      {backLabel}
    </ActionButton>
  );
}

function NextAction({
  onNext,
  nextDisabled = false,
  nextLabel = 'Próximo',
  nextIcon = 'ph:arrow-circle-right-light',
  nextButtonClassName = '',
}: Pick<SurveyActionsProps, 'onNext' | 'nextDisabled' | 'nextLabel' | 'nextIcon' | 'nextButtonClassName'>) {
  return (
    <ActionButton onClick={onNext} disabled={nextDisabled} variant="primary" className={nextButtonClassName}>
      {nextLabel}
      {nextIcon ? <Icon icon={nextIcon} width={22} /> : null}
    </ActionButton>
  );
}

function NavActions({
  onBack,
  onNext,
  showBack = true,
  showNext = true,
  backLabel,
  nextLabel,
  backDisabled,
  nextDisabled,
  backIcon,
  nextIcon,
  containerClassName = '',
  backButtonClassName = '',
  nextButtonClassName = '',
}: Pick<
  SurveyActionsProps,
  | 'onBack'
  | 'onNext'
  | 'showBack'
  | 'showNext'
  | 'backLabel'
  | 'nextLabel'
  | 'backDisabled'
  | 'nextDisabled'
  | 'backIcon'
  | 'nextIcon'
  | 'containerClassName'
  | 'backButtonClassName'
  | 'nextButtonClassName'
>) {
  return (
    <div className={`flex gap-3 w-full ${containerClassName}`}>
      {showBack && (
        <BackAction
          onBack={onBack}
          backDisabled={backDisabled}
          backLabel={backLabel}
          backIcon={backIcon}
          backButtonClassName={backButtonClassName}
        />
      )}

      {showNext && (
        <NextAction
          onNext={onNext}
          nextDisabled={nextDisabled}
          nextLabel={nextLabel}
          nextIcon={nextIcon}
          nextButtonClassName={nextButtonClassName}
        />
      )}
    </div>
  );
}

function isSingleMode(props: SurveyActionsProps) {
  return Boolean(props.onClick && props.children);
}

export default function SurveyActions(props: SurveyActionsProps) {
  if (isSingleMode(props)) {
    return (
      <SingleAction
        onClick={props.onClick}
        disabled={props.disabled}
        variant={props.variant}
        containerClassName={props.containerClassName}
        className={props.className}
      >
        {props.children}
      </SingleAction>
    );
  }

  return (
    <NavActions
      onBack={props.onBack}
      onNext={props.onNext}
      showBack={props.showBack}
      showNext={props.showNext}
      backLabel={props.backLabel}
      nextLabel={props.nextLabel}
      backDisabled={props.backDisabled}
      nextDisabled={props.nextDisabled}
      backIcon={props.backIcon}
      nextIcon={props.nextIcon}
      containerClassName={props.containerClassName}
      backButtonClassName={props.backButtonClassName}
      nextButtonClassName={props.nextButtonClassName}
    />
  );
}