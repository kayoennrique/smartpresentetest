'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { Container } from '@/components/GeneralComponents/Container/Container';

import type { ServiceWedoHome } from './interface';
import { servicesWedoHome } from './serviceWedoHome';

export default function WedoHome() {
  const [showImage, setShowImage] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceWedoHome>(servicesWedoHome[0]);

  const handleButtonClick = () => {
    requestAnimationFrame(() => setShowImage((prev) => !prev));
  };

  return (
    <section className="relative w-full flex justify-center mb-12">
      <div className="w-full max-w-7xl px-4 mt-8">
        <h1 className="font-sora text-[1.5rem] font-semibold leading-tight text-center text-color-blue-10">
          Escolher o presente certo pode ser mais simples do que parece
          <span className="text-color-red-10">.</span>
        </h1>
        <div className="max-w-[70%] mt-4 mx-auto">
          <h2 className="text-[1rem] font-normal leading-tight text-center text-color-gray-20">
            Respondendo algumas perguntas, a Inteligência Artificial ajuda a entender​ o perfil da
            pessoa e sugerir presentes que realmente combinam com ela.​ Depois, você decide como
            seguir.
          </h2>
        </div>

        <Container>
          <div className="flex flex-col lg:flex-row mt-12 gap-32">
            <div className="flex flex-col gap-6 w-full lg:w-[37.5rem]">
              {servicesWedoHome.map((servicesWedoHome) => (
                <div key={servicesWedoHome.id}>
                  <div
                    onClick={() => {
                      handleButtonClick();
                      setSelectedService(servicesWedoHome);
                    }}
                    className={`flex items-start gap-6 cursor-pointer transition-all duration-300 p-7
                       rounded-lg shadow-md hover:shadow-lg
                      ${
                        selectedService?.id === servicesWedoHome.id
                          ? 'bg-white'
                          : 'hover:opacity-100 bg-white'
                      }`}
                  >
                    {servicesWedoHome.icon}
                    <div className="flex flex-col items-start text-left">
                      <h3 className="font-sora text-lg font-semibold text-black ">
                        {servicesWedoHome.name}
                      </h3>

                      {selectedService?.id === servicesWedoHome.id && (
                        <>
                          <p className="text-sm text-color-gray-30 mt-4 whitespace-pre-line">
                            {servicesWedoHome.description}
                          </p>
                          {/* <button
                            className="text-[0.875rem] text-[#383838] mt-4 flex items-center 
                          gap-1 hover:text-red-500"
                          >
                            Saiba mais
                            <Icon
                              icon="ph:arrow-circle-right-light"
                              width="18"
                            />
                          </button> */}
                        </>
                      )}
                    </div>
                  </div>

                  {selectedService?.id === servicesWedoHome.id && (
                    <div className="lg:hidden w-full flex justify-center mt-6">
                      <Image
                        src={servicesWedoHome.image.url}
                        alt={servicesWedoHome.image.alt}
                        width={servicesWedoHome.image.width}
                        height={servicesWedoHome.image.height}
                        className="rounded-xl"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedService?.image && (
              <div className="hidden lg:flex w-full lg:w-[34.375rem] justify-center items-center">
                <div className="relative">
                  <Image
                    src={selectedService.image.url}
                    alt={selectedService.image.alt}
                    width={selectedService.image.width}
                    height={selectedService.image.height}
                    className="rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
