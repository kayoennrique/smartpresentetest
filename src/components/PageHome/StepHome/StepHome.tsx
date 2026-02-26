'use client';

import { Container } from '@/components/GeneralComponents/Container/Container';
import { useState, useRef, useEffect } from 'react';
import { steps } from './stepsLists';

export default function StepsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const updateIndex = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', updateIndex);
    return () => container.removeEventListener('scroll', updateIndex);
  }, []);

  return (
    <section className="w-full flex justify-center py-3 md:mb-8 mt-4 bg-transparent">
      <div className="w-full max-w-7xl px-4">
        <Container>
          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-2 -mt-12">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="bg-white border border-gray-200 shadow-sm rounded-xl 
                p-6 flex flex-col gap-3"
              >
                <div>{step.icon}</div>

                <h3 className="font-sora font-semibold text-black mt-4">
                  {index + 1}. {step.title}
                </h3>

                <p className="text-sm text-color-gray-30 leading-relaxed mt-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* MOBILE  */}
          <div
            ref={ref}
            className="
    block md:hidden
    overflow-x-scroll
    snap-x snap-mandatory
    scroll-smooth
    flex gap-4 
    no-scrollbar
    touch-pan-x
    -mt-16
  "
          >
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="
        min-w-full snap-start
        bg-white border border-gray-200 shadow-sm
        rounded-xl p-6
        flex flex-col gap-3
      "
              >
                <div>{step.icon}</div>

                <h3 className="font-semibold text-black mt-4">
                  {index + 1}. {step.title}
                </h3>

                <p className="text-sm text-color-gray-30 leading-relaxed mt-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* DOTS MOBILE */}
          <div className="md:hidden flex justify-center mt-8 gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`
        w-2 h-2 rounded-full transition-all
        ${currentIndex === i ? 'bg-gray-800' : 'bg-gray-300'}
      `}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
