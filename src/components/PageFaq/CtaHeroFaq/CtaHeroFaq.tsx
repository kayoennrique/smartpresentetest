'use client';

import { Container } from '@/components/GeneralComponents/Container/Container';
import { SearchInput } from '../SearchInput/SearchInput';
import { CtaHeroFaqProps } from '../interfaces';

export default function CtaHeroFaq({ searchTerm, setSearchTerm }: CtaHeroFaqProps) {
  return (
    <section className="w-full py-8">
      <Container>
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-red-gradient-10 rounded-xl mt-24 -mb-4">
            <div className="flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-[2rem] font-bold text-white mb-3">Perguntas Frequentes</h2>

              <p className="text-[1rem] font-normal text-white mt-3">
                Aqui você encontra respostas rápidas para entender como funciona o Smartpresente e
                como ele pode ajudar na​ escolha do presente certo.
              </p>

              <div className="my-6 w-full flex justify-center">
                <SearchInput value={searchTerm} onChange={setSearchTerm} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
