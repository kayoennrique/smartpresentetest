'use client';

import { Container } from '@/components/GeneralComponents/Container/Container';
import SearchButton from '@/components/GeneralComponents/SearchButton/SearchButton';
import Image from 'next/image';

export default function CtaHome() {
  return (
    <section className="w-full flex justify-center px-4 py-10 overflow-hidden">
      <div className="max-w-7xl bg-color-red-10 rounded-xl">
        <Container>
          <div
            className="overflow-hidden flex flex-col md:flex-row items-stretch 
            pt-6 px-6 pb-6 md:pt-10 md:px-10 md:pb-0 gap-6"
          >
            <div className="hidden md:block w-full md:w-[40%] flex flex-col justify-start pb-0">
              <div className="w-full h-full">
                <Image
                  src="/gift-image.png"
                  alt="Presente"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ objectPosition: 'center bottom' }}
                />
              </div>
            </div>

            <div className="w-full md:w-[60%] text-white flex flex-col justify-center mx-auto gap-2 pb-2 md:pb-8">
              <h2 className="font-sora text-[28px] sm:text-[36px] font-bold leading-tight">
                Descubra o presente ideal
              </h2>

              <p className="text-sm sm:text-base opacity-90 mt-2 max-w-xl leading-relaxed">
                Escolher um presente para alguém nem sempre é fácil — muitas vezes surge​ a dúvida
                sobre o que realmente vai agradar. ​ O smartpresente nasce para resolver essa dor.
                Em poucos passos, você​ conta sobre a pessoa e recebe sugestões alinhadas ao perfil,
                com apoio de​ Inteligência Artificial e MBTI (veja o que é na fac). ​ Presentear
                fica simples, rápido e com muito mais chance de acerto.
              </p>

              <div className="w-full mt-4 sm:mt-6 flex justify-start">
                <SearchButton text="Quem você quer presentear?" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
