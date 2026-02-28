import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora, Parisienne } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
});

const parisienne = Parisienne({
  subsets: ['latin'],
  variable: '--font-parisienne',
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SmartPresente',
  description: 'Página Inicial',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable} ${parisienne.variable}`}>
      <body className="font-inter bg-color-white-10" suppressHydrationWarning>
        {children}
        <ToastContainer position="top-right" autoClose={4000} theme="light" />
      </body>
    </html>
  );
}
