'use client';

import { GiftVisibilityOptionsProps } from './types';

export default function GiftVisibilityOptions({ value, onChange }: GiftVisibilityOptionsProps) {
  return (
    <div className="space-y-3 mb-6 w-full">
      <p className="text-sm text-gray-700">
        Agora você decide: manter a surpresa ou permitir que o presenteado veja a lista de
        presentes.
      </p>

      <label className="flex items-start space-x-3 cursor-pointer">
        <input
          type="radio"
          name="gift-option"
          value="send-now"
          checked={value === 'send-now'}
          onChange={() => onChange('send-now')}
          className="mt-1 w-4 h-4 text-[#FF6B6B] focus:ring-[#FF6B6B]"
        />
        <span className="text-sm text-gray-700">
          Quero manter a surpresa dando dicas sobre o presente
        </span>
      </label>

      <label className="flex items-start space-x-3 cursor-pointer">
        <input
          type="radio"
          name="gift-option"
          value="send-list"
          checked={value === 'send-list'}
          onChange={() => onChange('send-list')}
          className="mt-1 w-4 h-4 text-[#FF6B6B] focus:ring-[#FF6B6B]"
        />
        <span className="text-sm text-gray-700">Quero que o presenteado veja os presentes</span>
      </label>
    </div>
  );
}
