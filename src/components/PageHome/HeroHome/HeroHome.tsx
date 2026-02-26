'use client';

import { Container } from '@/components/GeneralComponents/Container/Container';
import { ImageCarousel } from './ImageCarousel';
import SearchButton from '@/components/GeneralComponents/SearchButton/SearchButton';

export default function HeroHome() {
  return (
    <section
      className="w-full bg-transparent pb-20 lg:mt-24 mt-16 flex items-center 
    justify-center overflow-hidden"
    >
      <div
        className="relative flex flex-col items-center text-center
       max-w-5xl w-full lg:mb-24"
      >
        <div className="absolute -z-10">
          <ImageCarousel
            images={[
              '/hero-home-images/image1.png',
              '/hero-home-images/image2.png',
              '/hero-home-images/image4.png',
              '/hero-home-images/image3.png',
            ]}
            alt={[
              'Mulher feliz segurando presentes, simbolizando acerto ao escolher o presente ideal com o PresenteSobMedida',
              'Caixas de presentes elegantes representando opções de presentes sob medida sugeridas pelo PresenteSobMedida',
              'Homem em dúvida sobre qual presente escolher, representando o uso do PresenteSobMedida para encontrar o presente ideal com IA ',
              'Vários presentes embrulhados simbolizando sugestões de​ presentes personalizados do PresenteSobMedida',
            ]}
          />
        </div>

        <Container>
          <div
            className="relative z-10 flex flex-col items-center justify-center 
          mx-auto w-sm lg:max-w-3xl mt-16 lg:mt-32"
          >
            <h1
              className="text-[2.25rem] lg:text-[2.375rem] font-bold 
            text-color-red-10 leading-tight font-sora"
            >
              Descubra o presente ideal e surpreenda a pessoa especial
            </h1>

            <h2 className="text-color-blue-10 lg:text-[1rem] text-[14px] mt-4 max-w-2xl">
              Com apoio de Inteligência Artificial, transformamos suas respostas em sugestões que
              realmente fazem sentido para quem vai receber.
            </h2>

            <SearchButton text="Quem você quer presentear?" />
          </div>
        </Container>
      </div>
    </section>
  );
}
