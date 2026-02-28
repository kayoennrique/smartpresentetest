'use client';

import React from 'react';

import { Container } from '../Container/Container';

type Props = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <Container>
      <div className="min-h-[100dvh] grid place-items-center bg-[#F6F7F9] px-6 mx-auto">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 text-center">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Container>
  );
}
