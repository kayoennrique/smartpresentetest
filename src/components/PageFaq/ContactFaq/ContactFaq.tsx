'use client';

import emailjs from '@emailjs/browser';
import { Icon } from '@iconify/react';
import type { FormEvent} from 'react';
import { useRef, useState } from 'react';
import { FiHeadphones } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Container } from '@/components/GeneralComponents/Container/Container';

export default function ContactFaq() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current || isLoading) {return;}

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_USER_ID,
      );

      toast.success('Dúvida enviada com sucesso! ✨🎁');
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar mensagem. Tente novamente 😢');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-6 mb-5 bg-transparent mx-auto flex">
      <Container>
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-2xl shadow-sm p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center gap-6">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-red-100" />
                <div className="relative w-10 h-10 rounded-full bg-red-200 flex items-center justify-center">
                  <FiHeadphones size={24} className="text-red-500" />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900">
                Não encontrou sua dúvida e precisa de suporte?
              </h2>

              <p className="text-gray-500 text-sm max-w-md">
                Entre em contato com um de nossos especialistas.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Nome</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Nome completo"
                  className="h-11 rounded-md border border-gray-200 px-4 text-sm outline-none focus:border-red-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email@email.com"
                  className="h-11 rounded-md border border-gray-200 px-4 text-sm outline-none focus:border-red-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Sua dúvida</label>
                <textarea
                  name="message"
                  required
                  placeholder="Escreva sua dúvida"
                  className="min-h-[110px] rounded-md border border-gray-200 px-4 py-3 text-sm outline-none resize-none focus:border-red-400"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-2 py-6 flex items-center justify-center gap-2 rounded-xl transition-opacity
                  ${
                    isLoading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-red-gradient text-white hover:opacity-90'
                  }`}
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar dúvida
                    <Icon icon="ph:arrow-circle-right-light" width="24" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
