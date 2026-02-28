import GiftQuestionsManager from '@/components/PageQuestions/GiftQuestionsManager/GiftQuestionsManager';

import type { PageProps } from './types';

export default async function Page({ params }: PageProps) {
  const { shareCode } = await params;

  return (
    <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start select-none">
      <GiftQuestionsManager shareCode={shareCode} />
    </main>
  );
}
