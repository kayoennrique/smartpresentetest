'use client';

import { Container } from '@/components/GeneralComponents/Container/Container';
import Image from 'next/image';
import { testimonials } from './testimonials';

export default function TestimonialsSection() {
  return (
    <section className="mt-8 w-full p-10 justify-between flex">
      <Container>
        <div className="max-w-5xl px-4 mx-auto">
          <h1 className="font-sora text-[2rem] font-semibold leading-tight text-center text-color-blue-10 mb-16">
            Quem usa, recomenda
            <span className="text-color-red-10">.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-8">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-[#F4F4F5] border border-gray-200 shadow-sm rounded-xl p-5 px-6 
                shadow-sm w-full md:w-[90%] mx-auto"
              >
                <p className="text-black font-normal leading-relaxed mb-5">{item.text}</p>

                <div className="flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-black">{item.name}</p>
                    <p className="text-sm text-[#404040]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
