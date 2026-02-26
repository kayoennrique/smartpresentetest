'use client';

import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import { PlatformContactModalProps } from './interface';
import { useRouter } from 'next/navigation';

export default function PlatformContactModal({
  open,
  onClose,
  setIsPreviewOpen,
}: PlatformContactModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow || 'auto';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target !== e.currentTarget) return;
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        className="
          relative w-full
          max-w-[360px] sm:max-w-[520px]
          rounded-2xl bg-white
          shadow-xl
          overflow-hidden
        "
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push('/');
          }}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar"
        >
          <Icon icon="ph:x" width="20" />
        </button>

        <div className="p-10 text-center">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-gray-800 mb-2">
            A plataforma vai entrar em contato com o presenteado
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
            Você receberá um retorno por Whatsapp quando o presenteado escolher o presente
          </p>

          <div className="w-full h-px bg-gray-200 mb-6" />
          <div className="flex flex-col gap-3">
            <SurveyActions onClick={() => router.push('/')} variant="primary">
              Entendi
              <Icon icon={'ph:check'} width={22} />
            </SurveyActions>

            <SurveyActions onClick={setIsPreviewOpen} variant="secondary">
              Veja como o presenteado visualiza a lista de presentes
            </SurveyActions>
          </div>
        </div>
      </div>
    </div>
  );
}
