'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { LogoItemProps } from './type';

export function LogoItem({ src }: LogoItemProps) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-40 w-40 rounded-3xl bg-white/95 backdrop-blur-sm overflow-hidden shadow-md">
        {!src || broken ? (
          <div className="h-full w-full bg-white/80" />
        ) : (
          <Image
            src={src}
            alt=""
            fill
            className="object-contain p-4"
            onError={() => setBroken(true)}
          />
        )}
      </div>
    </div>
  );
}
