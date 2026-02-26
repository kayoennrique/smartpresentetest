'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/GeneralComponents/Container/Container';

// Images in /public
const arrowUp = '/arrow-up.png';
const arrowDown = '/arrow-down.png';
import { faqs } from './questions';

export default function FaqHome() {
  const [openQuestion, setOpenQuestion] = useState<number>(0);

  const toggleQuestion = (index: number) => {
    window.requestAnimationFrame(() => {
      setOpenQuestion(openQuestion === index ? 0 : index);
    });
  };

  return (
    <section className="w-full flex justify-center -mt-12">
      <Container>
        <div className="max-w-screen-3xl w-full flex flex-col items-center justify-center mx-auto">
          <div className="lg:w-[60%] text-center mb-12 md:mb-0">
            <h1 className="font-sora text-color-red-10 font-bold text-[.75rem] leading-[4.125rem]">
              FAQ
            </h1>
            <h2 className="font-sora text-color-blue-10 text-[2.5rem] leading-8">
              Dúvidas frequentes<span className="text-color-red-10">.</span>
            </h2>
          </div>

          <div className="w-full max-w-[750px] mx-auto md:mt-10 pb-6 px-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="max-w-full min-h-[4.375rem] border-b border-separator-200 text-black"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left flex justify-between items-center py-4 gap-4"
                >
                  <span className="font-sora text-black leading-6 text-[1.125rem] font-semibold">
                    {faq.question}
                  </span>

                  <span
                    className={`flex-shrink-0 transform transition-transform ${
                      openQuestion === index ? 'rotate-360' : ''
                    }`}
                  >
                    <Image
                      src={openQuestion === index ? arrowDown : arrowUp}
                      alt="Alternar pergunta"
                      width={32}
                      height={32}
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </span>
                </button>

                {openQuestion === index && (
                  <div className="text-black text-[0.875rem] leading-[1.375rem] pb-4 flex flex-col gap-3">
                    {Array.isArray(faq.answer) ? (
                      <>
                        <p>{faq.answer[0]}</p>

                        <ol className="list-decimal pl-6 flex flex-col gap-2">
                          {faq.answer.slice(1, faq.answer.length - 1).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ol>

                        <p>{faq.answer[faq.answer.length - 1]}</p>
                      </>
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
