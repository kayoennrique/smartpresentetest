'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnalyzingScreenProps } from './interface';
import { Container } from '@/components/GeneralComponents/Container/Container';

export default function AnalyzingScreen({ onNext }: AnalyzingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#F8F9FA] px-4">
      <Container>
        <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
          <div className="flex flex-col items-center mb-10">
            <Image
              src="/logo/vermelho-logo.png"
              alt="Logo SmartPresente"
              width={120}
              height={120}
              className="object-contain w-auto h-auto"
              priority
            />
          </div>

          <p className="text-sm text-[#343A40] leading-relaxed mb-14 px-6">
            Preparando sugestões de presentes para você, com o uso de inteligência artificial…
          </p>

          <div className="relative flex items-center justify-center mb-10">
            {/* Halo */}
            <div className="absolute w-32 h-32 rounded-full bg-[#FDE2DD] animate-pulse" />

            {/* Núcleo */}
            <motion.div
              className="w-16 h-16 rounded-full bg-[#E8590C]"
              animate={{ scale: [1, 1.55, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
