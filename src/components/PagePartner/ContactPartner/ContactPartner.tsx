'use client';

import emailjs from '@emailjs/browser';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import type { FormEvent} from 'react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Container } from '@/components/GeneralComponents/Container/Container';

export default function ContactPartner() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current || isLoading) {return;}

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      );

      toast.success('Solicitação de parceria enviada com sucesso!');

      formRef.current.reset();
    } catch (error) {
      console.error(error);
      toast.error('Não foi possível enviar sua solicitação de parceria. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-20 mt-12 lg:mt-24">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-color-red-10 p-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-between">
              <div className="space-y-5">
                <h2 className="text-3xl font-semibold text-color-blue-10">Seja nosso parceiro</h2>

                <p className="text-gray-500 text-sm max-w-md">
                  Conectamos marcas a pessoas que já estão buscando o presente certo.​ Seus produtos
                  podem fazer parte dessas sugestões.​
                </p>
              </div>

              <div className="bg-gray-100 rounded-xl p-6 text-sm text-gray-600 leading-relaxed mt-12 lg:mt-16">
                “Entramos na plataforma e passamos a aparecer para clientes que já estavam decididos
                a comprar um presente. Isso mudou nossa taxa de conversão.”
              </div>

              <div className="flex items-center gap-4 mt-4 lg:mt-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src="/hero-home-images/testimonials/larissa-duarte.png"
                    alt="Foto de Maria Romano"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-color-blue-10">Luiza Simionato</p>
                  <p className="text-xs text-gray-500">Parceira</p>
                </div>
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
              aria-busy={isLoading}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-semibold text-color-blue-10">
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  aria-required="true"
                  autoComplete="name"
                  placeholder="Digite seu nome completo"
                  className="h-9 rounded-md border border-color-red-20 px-3 text-sm placeholder:text-gray-400 outline-none focus:border-red-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-semibold text-color-blue-10">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  autoComplete="email"
                  placeholder="seuemail@empresa.com"
                  className="h-9 rounded-md border border-color-red-20 px-3 text-sm placeholder:text-gray-400 outline-none focus:border-red-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="company" className="text-sm font-semibold text-color-blue-10">
                  Nome da empresa
                </label>
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Nome da empresa (opcional)"
                  className="h-9 rounded-md border border-color-red-20 px-3 text-sm placeholder:text-gray-400 outline-none focus:border-red-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm font-semibold text-color-blue-10">
                  Celular de contato
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(11) 91234-5678"
                  className="h-9 rounded-md border border-color-red-20 px-3 text-sm placeholder:text-gray-400 outline-none focus:border-red-400"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-2 py-6 flex items-center justify-center gap-2 rounded-xl mt-12 transition-opacity
                  ${
                    isLoading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-red-gradient text-white hover:opacity-90'
                  }`}
              >
                {isLoading ? 'Enviando...' : 'Solicitar parceria'}
                {!isLoading && <Icon icon="ph:arrow-circle-right-light" width={24} />}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
