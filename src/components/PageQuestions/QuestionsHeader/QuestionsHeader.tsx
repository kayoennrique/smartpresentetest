'use client';

import { Container } from '@/components/GeneralComponents/Container/Container';
import { QuestionsHeaderProps } from './type';

import Link from 'next/link';
import Image from 'next/image';

const THEME = {
  light: {
    wrapper: 'flex items-center justify-center mx-auto p-2',
    content: 'w-full max-w-md overflow-hidden',
    logoSrc: '/logo/vermelho-logo.png',
    logoAlt: 'Logo SmartPresente',
    divider: 'bg-[#CED4DA]',
  },
  dark: {
    wrapper: 'flex items-center justify-center mx-auto p-2 min-h-screen w-full bg-[#181A25]',
    content: 'w-full max-w-md',
    logoSrc: '/logo/branco-logo.png',
    logoAlt: 'Logo SmartPresente',
    divider: 'bg-[#2B2E3F]',
  },
} as const;

export default function QuestionsHeader({ children, variant = 'light' }: QuestionsHeaderProps) {
  const cfg = THEME[variant];

  return (
    <div className={cfg.wrapper}>
      <Container>
        <div className={cfg.content}>
          <div className="mx-auto flex flex-col items-center justify-center">
            <div className="w-full h-full mt-4 flex items-center justify-center">
              <Link
                href="/"
                className="w-full h-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src={cfg.logoSrc}
                  alt={cfg.logoAlt}
                  width={120}
                  height={120}
                  className="object-contain w-auto h-auto"
                  priority
                />
              </Link>
            </div>
          </div>

          {children}
        </div>
      </Container>
    </div>
  );
}
