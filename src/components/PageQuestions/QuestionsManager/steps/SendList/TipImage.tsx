"use client";

import Image from "next/image";

import type { TipImageProps } from "./interface";

export default function TipImage({ imageUrl, alt, className }: TipImageProps) {
  return (
    <div className={className}>
      <Image src={imageUrl} alt={alt} fill className="object-contain" />
    </div>
  );
}
