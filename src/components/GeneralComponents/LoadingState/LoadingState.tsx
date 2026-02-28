'use client';

import { Container } from '../Container/Container';

import type { Props } from './type';

export default function LoadingState({ text = 'Carregando...' }: Props) {
  return (
    <Container>
      <div className="min-h-[100dvh] grid place-items-center bg-[#F6F7F9] px-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#71C19B] mx-auto" />
          <p className="mt-4 text-sm text-gray-600">{text}</p>
        </div>
      </div>
    </Container>
  );
}
