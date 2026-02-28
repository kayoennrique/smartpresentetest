'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';

import type { TokenAccessModalProps } from './type';

function normalizeCode(raw: string) {
  return (raw || '')
    .replace(/\s/g, '')
    .replace(/[^a-z0-9]/gi, '')
    .toUpperCase();
}

function splitToFixed(token: string, size = 6) {
  const t = normalizeCode(token).slice(0, size);
  const chars = t.split('');
  while (chars.length < size) {chars.push('');}
  return chars;
}

export default function TokenAccessModal({ open, onClose }: TokenAccessModalProps) {
  const router = useRouter();

  const [chars, setChars] = useState<string[]>(() => Array(6).fill(''));
  const [touched, setTouched] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const code = useMemo(() => chars.join(''), [chars]);
  const normalized = useMemo(() => normalizeCode(code), [code]);
  const isValid = normalized.length === 6;

  const focusIndex = (idx: number) => {
    const el = inputsRef.current[idx];
    if (!el) {return;}
    el.focus();
    el.select();
  };

  const handleGo = () => {
    const finalCode = normalizeCode(code);
    if (finalCode.length !== 6) {
      setTouched(true);
      return;
    }

    onClose();
    router.push(`/gift-lists/share/${encodeURIComponent(finalCode)}`);
  };

  useEffect(() => {
    if (!open) {return;}

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {onClose();}
      if (e.key === 'Enter' && isValid) {handleGo();}
    };

    window.addEventListener('keydown', onKeyDown);

    setTimeout(() => focusIndex(0), 0);

    return () => {
      document.body.style.overflow = prevOverflow || 'auto';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, isValid]);

  useEffect(() => {
    if (!open) {
      setChars(Array(6).fill(''));
      setTouched(false);
    }
  }, [open]);

  if (!open) {return null;}

  const setCharAt = (idx: number, value: string) => {
    setChars((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const handleChange = (idx: number, raw: string) => {
    setTouched(true);

    const v = normalizeCode(raw);

    if (v.length > 1) {
      const filled = splitToFixed(v, 6);
      setChars(filled);

      const nextEmpty = filled.findIndex((c) => !c);
      focusIndex(nextEmpty === -1 ? 5 : nextEmpty);
      return;
    }

    const ch = v.slice(0, 1);
    setCharAt(idx, ch);

    if (ch && idx < 5) {
      focusIndex(idx + 1);
    }
  };

  const handleKeyDownInput = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setTouched(true);

      if (chars[idx]) {
        setCharAt(idx, '');
        return;
      }

      if (idx > 0) {
        setCharAt(idx - 1, '');
        focusIndex(idx - 1);
      }
    }

    if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault();
      focusIndex(idx - 1);
    }

    if (e.key === 'ArrowRight' && idx < 5) {
      e.preventDefault();
      focusIndex(idx + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTouched(true);

    const pasted = normalizeCode(e.clipboardData.getData('text')).slice(0, 6);
    const filled = splitToFixed(pasted, 6);
    setChars(filled);

    const nextEmpty = filled.findIndex((c) => !c);
    focusIndex(nextEmpty === -1 ? 5 : nextEmpty);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target !== e.currentTarget) {return;}
        e.preventDefault();
        e.stopPropagation();
        onClose();
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
            onClose();
          }}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar"
        >
          <Icon icon="ph:x" width="20" />
        </button>

        <div className="p-10 text-center">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-gray-800 mb-2">
            Cole o token para acessar a lista
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
            Digite ou cole o token que você recebeu para abrir a lista de​ presentes
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-7">
            {Array.from({ length: 6 }).map((_, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputsRef.current[idx] = el;
                }}
                value={chars[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDownInput(idx, e)}
                onPaste={handlePaste}
                inputMode="text"
                autoComplete={idx === 0 ? 'one-time-code' : 'off'}
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                maxLength={6}
                className="
                  w-10 h-12 sm:w-12 sm:h-14
                  rounded-lg
                  bg-green-200/60
                  border border-green-100
                  text-gray-800 font-extrabold
                  text-base sm:text-lg
                  text-center
                  outline-none
                  focus:ring-1 focus:ring-green-400
                "
                aria-label={`Token caractere ${idx + 1}`}
              />
            ))}
          </div>

          <div className="w-full h-px bg-gray-200 mb-6 sm:mb-7" />

          <div className="flex flex-col gap-3">
            <SurveyActions
              variant="primary"
              onClick={handleGo}
              disabled={!isValid}
              className={`
                w-full py-3 rounded-xl font-medium transition-all duration-200
                flex items-center justify-center gap-2 shadow-sm
                ${!isValid ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-gradient text-white hover:opacity-90'}
              `}
            >
              Acessar lista
              <Icon icon="ph:arrow-circle-right-light" width={22} />
            </SurveyActions>
          </div>
        </div>
      </div>
    </div>
  );
}
