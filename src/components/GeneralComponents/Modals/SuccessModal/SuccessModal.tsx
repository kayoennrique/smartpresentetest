'use client';

import { Icon } from '@iconify/react';
import { useEffect } from 'react';

import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';

type SuccessModalProps = {
  open: boolean;
  title?: string;
  description?: string;

  // ação principal
  primaryText?: string;
  onPrimaryClick: () => void;

  // opcional
  secondaryText?: string;
  onSecondaryClick?: () => void;

  // comportamento
  closeOnBackdrop?: boolean;
};

export default function SuccessModal({
  open,
  title = 'Parabéns! 🎉',
  description = 'Sua escolha foi registrada com sucesso. Agora é só aguardar!',

  primaryText = 'Ir para a Home',
  onPrimaryClick,

  secondaryText,
  onSecondaryClick,

  closeOnBackdrop = true,
}: SuccessModalProps) {
  useEffect(() => {
    if (!open) {return;}

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {onPrimaryClick();}
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onPrimaryClick]);

  if (!open) {return null;}

  const handleBackdrop = () => {
    if (closeOnBackdrop) {
      onPrimaryClick();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4"
      onClick={handleBackdrop}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Sucesso"
      >
        {/* Botão X */}
        <button
          onClick={onPrimaryClick}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
          aria-label="Fechar"
        >
          <Icon icon="mdi:close" width={22} height={22} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 text-center">{title}</h2>
        <p className="mt-2 text-sm text-gray-600 text-center">{description}</p>

        <div className="mt-6">
          <SurveyActions onClick={onPrimaryClick} variant="primary">
            {primaryText}
          </SurveyActions>
        </div>

        {secondaryText && onSecondaryClick ? (
          <div className="mt-3">
            <SurveyActions onClick={onSecondaryClick} variant="secondary">
              {secondaryText}
            </SurveyActions>
          </div>
        ) : null}
      </div>
    </div>
  );
}
