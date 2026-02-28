'use client';

import type { QuestionsTitleProps } from './type';

const THEME = {
  light: {
    title: 'text-xl font-bold text-gray-800 mb-2',
    subtitle: 'text-sm text-gray-500 mb-6',
  },
  dark: {
    title: 'text-xl font-bold text-[#F8F9FA] mb-2',
    subtitle: 'text-sm text-[#ADB5BD] mb-6',
  },
} as const;

export default function QuestionsTitle({
  title,
  subtitle,
  children,
  className = 'px-6 pb-6 flex flex-col items-start',
  variant = 'light',
}: QuestionsTitleProps) {
  const theme = THEME[variant];

  return (
    <div className={className}>
      <h1 className={theme.title}>{title}</h1>

      {subtitle ? <p className={theme.subtitle}>{subtitle}</p> : null}

      {children}
    </div>
  );
}
