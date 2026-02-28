'use client';

import { useState, useMemo } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { MdOutlineMessage } from 'react-icons/md';

import { Container } from '@/components/GeneralComponents/Container/Container';

import type { SectionFaqProps } from '../interfaces';

import type { TabId } from './faqItems';
import { faqByTab } from './faqItems';


const tabs: { id: TabId; label: string }[] = [
  { id: 'comofunciona', label: 'Como Funciona' },
  { id: 'listas', label: 'Listas de presentes' },
  { id: 'presente', label: 'Escolhendo o presente' },
  { id: 'parcerias', label: 'Parcerias' },
];

export default function SectionFaq({ searchTerm }: SectionFaqProps) {
  const [activeTab, setActiveTab] = useState<TabId>('comofunciona');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = faqByTab[activeTab];

  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) {return questions;}

    const words = searchTerm.toLowerCase().split(' ').filter(Boolean);

    return questions.filter((item) =>
      words.every((word) => `${item.title} ${item.content}`.toLowerCase().includes(word)),
    );
  }, [questions, searchTerm]);

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setOpenIndex(null);
  };

  return (
    <section className="w-full py-6">
      <Container>
        <div className="w-full max-w-4xl mx-auto">
          {/* TABS MOBILE (scroll horizontal nativo) */}
          <div className="lg:hidden mb-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      flex items-center justify-center gap-2
                      px-2 py-2
                      rounded-md border
                      text-sm font-semibold
                      transition-colors
                      whitespace-nowrap
                      flex-shrink-0
                      ${
                        isActive
                          ? 'bg-color-red-10 text-white border-color-red-10'
                          : 'bg-white text-color-red-10 border-gray-200'
                      }
                    `}
                  >
                    <MdOutlineMessage
                      className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-color-red-10'}`}
                    />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TABS DESKTOP (sem drag) */}
          <div className="hidden lg:block mb-6">
            <div className="flex flex-wrap gap-6 justify-center">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      flex items-center gap-2
                      px-8 py-2
                      rounded-md border
                      text-sm font-semibold
                      transition
                      ${
                        isActive
                          ? 'bg-color-red-10 text-white border-color-red-10'
                          : 'bg-white text-color-red-10 border-gray-200 hover:bg-gray-50'
                      }
                    `}
                  >
                    <MdOutlineMessage className={isActive ? 'text-white' : 'text-color-red-10'} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-color-red-10 rounded-xl p-5">
            <div className="flex flex-col divide-y divide-red-200 px-4 sm:px-6">
              {filteredQuestions.length === 0 && (
                <p className="py-6 text-center text-sm text-gray-500">
                  Nenhum resultado encontrado.
                </p>
              )}

              {filteredQuestions.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={index}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-gray-800">{item.title}</span>

                      <FiChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-color-red-10 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-4 pr-4 sm:pr-6 text-sm text-gray-600 font-medium leading-relaxed">
                        {item.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
