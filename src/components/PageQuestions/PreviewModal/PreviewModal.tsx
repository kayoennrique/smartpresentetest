"use client";

import { Icon } from "@iconify/react";
import { useEffect } from "react";
import Image from "next/image";
import { PreviewModalProps } from "./interface";

const giftImages = [
  "/amarelo.png",
  "/azul-escuro.png",
  "/azul.png",
  "/roxo.png",
  "/verde.png",
  "/vinho.png",
];

export default function PreviewModal({
  onClose,
  products,
  tips,
}: PreviewModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-sm rounded-2xl bg-white overflow-hidden
          md:max-w-5xl md:max-h-[90vh] md:flex md:flex-col
        "
      >
        <div className="p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <Icon icon="ph:x" width="20" />
          </button>

          <h2 className="text-[18px] font-bold text-color-blue-10 mb-1 mt-2 md:ml-3">
            Veja como as dicas aparecerão
          </h2>

          <p className="text-[14px] text-gray-500 font-semibold max-w-xl md:ml-3">
            Esta é a tela que o presenteado irá ver, caso opte por mostrar
            somente as dicas
          </p>
        </div>

        <div
          className="
            p-6 -mt-8
            md:px-10 md:py-8 md:flex-1 md:overflow-y-auto
          "
        >
          <div className="border rounded-xl p-3 md:p-6">
            <p className="text-[14px] text-gray-800 font-bold mb-2">
              Selecione o presente que você mais gostou
            </p>

            <p className="text-[14px] text-gray-500 font-medium mb-6 max-w-2xl">
              Após selecionar, a pessoa que irá te presentear prosseguirá o
              processo para que você tenha seu presente
            </p>

            <div
              className="
                flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide
                md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none
              "
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="
                    snap-start w-[125px] flex-shrink-0 border rounded-xl bg-gray-100 p-3
                    md:w-full md:p-4
                  "
                >
                  <div
                    className="
                      relative w-24 h-24 mx-auto -mt-4
                      md:w-36 md:h-36 md:-mt-4
                    "
                  >
                    <Image
                      src={giftImages[index % giftImages.length]}
                      alt={`Surpresa ${index + 1}`}
                      fill
                      className="object-contain p-6"
                    />
                  </div>

                  <p className="text-sm font-semibold text-color-blue-10 mb-2">
                    Surpresa {index + 1}
                  </p>

                  <div className="w-full min-h-[50px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-500">
                    {tips[product.id] || "A dica aparecerá aqui"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
