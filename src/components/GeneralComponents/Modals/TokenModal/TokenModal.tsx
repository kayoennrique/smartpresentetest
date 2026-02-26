'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import { TokenModalProps } from './interface';
import { useRouter } from 'next/navigation';

function splitToken(token: string, size = 6) {
  const t = (token || '').replace(/\s/g, '').toUpperCase();
  const chars = t.slice(0, size).split('');
  while (chars.length < size) chars.push('X');
  return chars;
}

export default function TokenModal({ open, token, onClose, setIsPreviewOpen }: TokenModalProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const tokenChars = splitToken(token, 6);

  const handleCopy = async () => {
    if (!token || isCopying) return;

    setIsCopying(true);
    setCopied(false);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(token);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = token;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Erro ao copiar token:', err);
    } finally {
      setIsCopying(false);
    }
  };

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
            Envie este token para a pessoa presenteada
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
            Este código permite que ela acesse a lista de sugestões no site, botão token.​ Depois
            que escolher o presente, você receberá as informações para ​ concluir a compra.
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-7">
            {tokenChars.map((ch, idx) => (
              <div
                key={idx}
                className="
                  flex items-center justify-center
                  w-10 h-12 sm:w-12 sm:h-14
                  rounded-lg
                  bg-green-200/60
                  border border-green-300/40
                  text-gray-800 font-extrabold
                  text-base sm:text-lg
                "
              >
                {ch}
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-gray-200 mb-6 sm:mb-7" />

          <div className="flex flex-col gap-3">
            <SurveyActions
              variant="primary"
              onClick={handleCopy}
              disabled={isCopying}
              className={`
                w-full py-3 rounded-xl font-medium transition-all duration-200
                flex items-center justify-center gap-2 shadow-sm
                ${isCopying ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-gradient text-white hover:opacity-90'}
              `}
            >
              {copied ? 'Copiado' : isCopying ? 'Copiando...' : 'Copiar token'}
              <Icon
                icon={isCopying ? 'svg-spinners:ring-resize' : copied ? 'ph:check' : 'ph:copy'}
                width={22}
              />
            </SurveyActions>

            <SurveyActions variant="secondary" onClick={setIsPreviewOpen}>
              Veja como o presenteado visualiza a lista de presentes
            </SurveyActions>
          </div>
        </div>
      </div>
    </div>
  );
}
