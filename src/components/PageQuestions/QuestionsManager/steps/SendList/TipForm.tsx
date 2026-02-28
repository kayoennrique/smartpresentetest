'use client';

import type { TipFormProps } from './interface';

export default function TipForm({
  productName,
  value,
  maxLen = 50,
  onChange,
  onGenerate,
}: TipFormProps) {
  return (
    <>
      <h2 className="text-sm font-semibold text-color-blue-10 mb-2">{productName}</h2>

      <textarea
        rows={3}
        placeholder="Escreva sua dica"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
      />

      <p className="text-xs mt-1 text-right text-gray-400">
        {value.length}/{maxLen}
      </p>

      <button
        className="mt-2 text-xs text-[#4E8872] hover:underline"
        onClick={onGenerate}
        type="button"
      >
        ✨ Gerar dica com IA
      </button>
    </>
  );
}
