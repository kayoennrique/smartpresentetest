"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CarouselProps } from "./interface";

export function ImageCarousel({ images, alt }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  const getVisibleImages = () => {
    const prev = (current - 1 + images.length) % images.length;
    const next = (current + 1) % images.length;
    return [prev, current, next];
  };

  const visibleIndices = getVisibleImages();

  return (
    <div className="relative overflow-hidden flex items-center justify-center py-10 w-full hidden lg:block">
      <div className="flex items-center justify-center gap-10">
        {visibleIndices.map((index, position) => {
          const isCenter = position === 1;

          return (
            <div
              key={`${index}-${position}`}
              className={`relative overflow-hidden rounded-xl transition-all duration-700 ${
                isCenter ? "z-20" : "z-0"
              }`}
              style={{
                width: isCenter ? "55.625rem" : "20rem",
                height: "26.875rem",
              }}
            >
              <Image
                src={images[index]}
                alt={alt[index] ?? `Imagem ${index + 1}`}
                fill
                sizes={isCenter ? "55.625rem" : "20rem"}
                className={`object-cover rounded-xl transition-all duration-700 ${
                  isCenter ? "blur-sm opacity-20" : ""
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
