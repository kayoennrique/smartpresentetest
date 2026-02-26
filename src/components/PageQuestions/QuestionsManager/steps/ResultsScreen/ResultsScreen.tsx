'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ResultsScreenProps } from './interfaces';
import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import { Container } from '@/components/GeneralComponents/Container/Container';
import Link from 'next/link';

export default function ResultsScreen({ products, onRestart, onSendList }: ResultsScreenProps) {
  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] px-4 py-8 sm:py-10">
      <Container>
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Link
              href="/"
              className="w-full h-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo/vermelho-logo.png"
                alt="Logo SmartPresente"
                width={120}
                height={120}
              />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9ECEF] px-4 pt-4 pb-6 sm:px-8 sm:pt-5 sm:pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-color-blue-10">
                Resultado da lista de presentes
                <span className="text-color-red-10">.</span>
              </h2>

              <div className="w-full sm:w-[240px]">
                <SurveyActions
                  backLabel="Voltar"
                  nextLabel="Enviar Lista"
                  onBack={onRestart}
                  onNext={onSendList}
                  containerClassName="flex-col gap-2"
                  backButtonClassName="py-2 text-sm"
                  nextButtonClassName="py-2 text-sm"
                />
              </div>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-[#6C757D]">Nenhum produto encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="bg-white rounded-xl border border-[#E9ECEF] shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="relative w-full h-40 bg-[#F1F3F5] p-4">
                      <Image
                        src={product.imageUrl}
                        alt={product.productName}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                        {product.productName}
                      </h3>

                      <p className="text-sm font-bold mb-1">
                        R$ {(product.price / 100).toFixed(2).replace('.', ',')}
                      </p>

                      <p className="text-xs text-gray-500">{product.retailer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
