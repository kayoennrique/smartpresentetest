import Image from 'next/image';
import { FiPhone, FiMail, FiInstagram } from 'react-icons/fi';

function FooterDecorations() {
  return (
    <>
      <Image
        src="/Vector2.png"
        alt=""
        width={100}
        height={100}
        className="absolute left-0 bottom-0 pointer-events-none select-none"
      />
      <Image
        src="/Vector.png"
        alt=""
        width={100}
        height={100}
        className="absolute right-0 top-0 pointer-events-none select-none h-auto w-auto"
      />
    </>
  );
}

function FooterLinks() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <a href="mailto:contato@presentesobmedida.com.br" className="hover:underline">
        Fale conosco
      </a>
      <a href="/parceiros" className="hover:underline">
        Seja um parceiro
      </a>
      <a href="/faq" className="hover:underline">
        FAQ
      </a>
    </div>
  );
}

function FooterContacts() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center justify-center md:justify-start gap-2">
        <FiPhone className="text-lg" />
        <a
          href="https://wa.me/5511988494535"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          (11) 99159-9634
        </a>
      </div>

      <div className="flex items-center justify-center md:justify-start gap-2">
        <FiMail className="text-lg" />
        <a href="mailto:contato@smartpresente.com.br" className="hover:underline">
          contato@smartpresente.com.br
        </a>
      </div>

      <div className="flex items-center justify-center md:justify-start gap-2">
        <FiInstagram className="text-lg" />
        <a
          href="https://www.instagram.com/smartpresente"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          smartpresente
        </a>
      </div>
    </div>
  );
}

function FooterLegal() {
  return (
    <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left justify-between text-xs text-white/80 gap-4 ml-0 md:ml-16 lg:ml-0 mb-8 md:mb-0">
      <p>
        © 2026 SmartPresente. Administrado por{' '}
        <a
          href="https://www.techevery.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Techevery
        </a>{' '}
        - CNPJ : 33.376.290/0001-21
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-color-red-20 text-white py-6 px-6 relative overflow-hidden">
      <FooterDecorations />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left lg:justify-between gap-8">
          <div className="flex flex-col items-center lg:items-start gap-3">
            <Image
              src="/logo/vermelho-logo.png"
              alt="Logo da SmartPresente"
              width={130}
              height={60}
              className="h-auto w-auto"
            />
          </div>

          <FooterLinks />
          <FooterContacts />
        </div>

        <hr className="border-t border-white/20 my-8" />

        <FooterLegal />
      </div>
    </footer>
  );
}