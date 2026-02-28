'use client';

import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

import type { SearchButtonProps } from './interface';

export default function SearchButton({
  href = '/questions',
  text,
  className = '',
}: SearchButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className={`mt-8 w-full max-w-xs flex items-center justify-center gap-4 
        border rounded-xl p-2 shadow-sm hover:shadow-md 
        transition-all text-color-gray-20 bg-white ${className}`}
    >
      <FiSearch className="text-xl" />
      <span className="text-[1rem] font-normal -ml-2">{text}</span>
    </button>
  );
}
