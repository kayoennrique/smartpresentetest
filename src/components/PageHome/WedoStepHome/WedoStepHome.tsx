'use client';

import { Container } from '@/components/GeneralComponents/Container/Container';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { steps } from './serviceWedoStepHome';
import { useRouter } from 'next/navigation';

export default function WedoStepHome() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const mobileRef = useRef<HTMLDivElement | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 4;
  const pages = Math.ceil(steps.length / pageSize);

  useEffect(() => {
    const onScroll = (ref: HTMLDivElement | null) => {
      if (!ref) return;
      const idx = Math.round(ref.scrollLeft / ref.clientWidth);
      setCurrentIndex(idx);
    };

    const m = mobileRef.current;
    const d = desktopRef.current;

    const mHandler = () => onScroll(m);
    const dHandler = () => onScroll(d);

    if (m) m.addEventListener('scroll', mHandler);
    if (d) d.addEventListener('scroll', dHandler);

    return () => {
      if (m) m.removeEventListener('scroll', mHandler);
      if (d) d.removeEventListener('scroll', dHandler);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % pages;

        desktopRef.current?.scrollTo({
          left: desktopRef.current.clientWidth * next,
          behavior: 'smooth',
        });

        mobileRef.current?.scrollTo({
          left: mobileRef.current.clientWidth * next,
          behavior: 'smooth',
        });

        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [pages]);

  const goToPage = (i: number) => {
    setCurrentIndex(i);

    desktopRef.current?.scrollTo({
      left: desktopRef.current.clientWidth * i,
      behavior: 'smooth',
    });

    mobileRef.current?.scrollTo({
      left: mobileRef.current.clientWidth * i,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full flex justify-center mb-20 bg-transparent">
      <div className="w-full max-w-7xl px-4">
        <Container>
          <div className="w-full flex flex-col items-center mb-8 lg:mb-16">
            <h2 className="font-sora text-center text-[18px] md:text-[22px] font-semibold leading-none text-color-blue-10">
              Selecionamos parceiros confiáveis para ajudar você a encontrar o presente ideal — e
              novos parceiros estão chegando.
            </h2>
          </div>

          {/* DESKTOP SLIDER */}
          <div
            ref={desktopRef}
            className="hidden md:block overflow-x-auto no-scrollbar scroll-smooth"
          >
            <div className="flex w-full">
              {Array.from({ length: pages }).map((_, pageIndex) => {
                const start = pageIndex * pageSize;
                const items = steps.slice(start, start + pageSize);

                return (
                  <div key={pageIndex} className="flex-none w-full flex justify-center gap-20">
                    {items.map((step) => (
                      <div key={step.id} className="flex justify-center items-center">
                        <Image
                          src={step.image}
                          alt={`Step ${step.id}`}
                          width={190}
                          height={190}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          {/* MOBILE SLIDER */}
          <div
            ref={mobileRef}
            className="block md:hidden overflow-x-scroll snap-x snap-mandatory scroll-smooth flex no-scrollbar gap-1 mt-4"
            aria-hidden={false}
          >
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="min-w-full snap-start px-1 pb-1 flex justify-center -mt-0"
              >
                <Image
                  src={step.image}
                  alt={`Step ${index + 1}`}
                  width={350}
                  height={200}
                  className="object-contain block mt-0 w-full max-w-[320px] mx-auto"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* DOTS DESKTOP */}
          <div className="hidden md:flex justify-center mt-6 gap-3">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === i ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* DOTS MOBILE */}
          <div className="flex md:hidden justify-center mt-8 gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.round(currentIndex) === i ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="w-full flex justify-center mt-6">
            <button
              onClick={() => router.push('/parceiros')}
              className="font-sora flex items-center gap-1 text-[18px] text-color-blue-10 hover:text-gray-600 transition"
            >
              Torne-se parceiro
              <Icon icon="ph:arrow-circle-right-light" width="24" />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
