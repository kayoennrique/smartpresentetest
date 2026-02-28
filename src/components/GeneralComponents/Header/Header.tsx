'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import  { useEffect, useRef, useState } from 'react';

import { Container } from '@/components/GeneralComponents/Container/Container';
import { isLogged as isLoggedAuth, logout as logoutAuth } from '@/utils/auth';

import LoginModal from '../Modals/LoginModal/LoginModal';
import RegisterModal from '../Modals/RegisteModal/RegisterModal';
import TokenAccessModal from '../Modals/TokenAccessModal/TokenAccessModal';


const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openToken, setOpenToken] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsLogged(isLoggedAuth());
  }, []);

  useEffect(() => {
    const sync = () => setIsLogged(isLoggedAuth());

    window.addEventListener('focus', sync);
    document.addEventListener('visibilitychange', sync);

    return () => {
      window.removeEventListener('focus', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLAnchorElement>(`a[href="${pathname}"]`);

    if (!activeLink || !navRef.current || !dividerRef.current || !activeRef.current) {
      return;
    }

    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const dividerRect = dividerRef.current.getBoundingClientRect();

    const left = navRect.left - dividerRect.left + (linkRect.left - navRect.left);

    activeRef.current.style.width = `${linkRect.width}px`;
    activeRef.current.style.left = `${left}px`;
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openMenu &&
        !mobileMenuRef.current?.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }

      if (
        openUserMenu &&
        !userMenuRef.current?.contains(event.target as Node) &&
        !userButtonRef.current?.contains(event.target as Node)
      ) {
        setOpenUserMenu(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenu, openUserMenu]);

  const goToBuyerGiftLists = () => {
    setOpenUserMenu(false);
    setOpenMenu(false);
    router.push('/buyer/gift-lists');
  };

  const handleLogout = () => {
    logoutAuth();

    setIsLogged(false);
    setOpenUserMenu(false);
    setOpenMenu(false);

    router.push('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-color-red-20">
        <div className="shadow-xl">
          <Container>
            <div className="flex items-center py-8">
              <Link
                href="/"
                className="flex items-center transition-transform duration-200 hover:scale-[1.03] -mt-6 -mb-4 lg:-mt-6 lg:-mb-2"
              >
                <Image src="/logo/branco-logo.png" alt="Logo" width={140} height={20} priority />
              </Link>

              {/* DESKTOP */}
              <nav
                ref={navRef}
                className="hidden lg:flex items-center gap-6 ml-6 text-[1rem] text-white"
              >
                <Link href="/questions">Descubra o presente</Link>
                <Link href="/parceiros">Seja parceiro</Link>
                <a href="mailto:contato@smartpresente.com.br">Fale conosco</a>
                <Link href="/faq">FAQ</Link>
              </nav>

              <div className="hidden lg:flex items-center gap-3 ml-auto">
                {!isLogged ? (
                  <button
                    onClick={() => setOpenLogin(true)}
                    className="group w-[3.875rem] h-[2rem] flex items-center justify-center bg-red-gradient rounded-xl p-[1px]"
                    type="button"
                  >
                    <span className="w-full h-full flex items-center justify-center bg-white rounded-[0.625rem] text-red-500 group-hover:bg-red-100">
                      Login
                    </span>
                  </button>
                ) : (
                  <div className="relative">
                    <button
                      ref={userButtonRef}
                      type="button"
                      onClick={() => setOpenUserMenu((v) => !v)}
                      className="
                        w-9 h-9
                        rounded-full
                        bg-white/10 hover:bg-white/15
                        border border-white/15
                        flex items-center justify-center
                        transition-colors
                      "
                      aria-haspopup="menu"
                      aria-expanded={openUserMenu}
                      aria-label="Menu do usuário"
                    >
                      <Icon icon="ph:user" width="22" color="#ffffff" />
                    </button>

                    {openUserMenu && (
                      <div
                        ref={userMenuRef}
                        onClick={(e) => e.stopPropagation()}
                        className="
                          absolute right-0 mt-2 w-40
                          rounded-xl border border-white/10
                          bg-[#111827]/80 backdrop-blur
                          shadow-2xl overflow-hidden z-50
                        "
                        role="menu"
                      >
                        <button
                          type="button"
                          onClick={goToBuyerGiftLists}
                          className="
                            w-full px-3 py-2
                            text-[13px] text-left text-white
                            hover:bg-white/10 transition-colors
                            flex items-center gap-2
                          "
                          role="menuitem"
                        >
                          <Icon icon="ph:user" width="20" />
                          Área logada
                        </button>

                        <div className="h-px bg-white/10" />

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="
                            w-full px-3 py-2
                            text-[13px] text-left text-white
                            hover:bg-white/10 transition-colors
                            flex items-center gap-2
                          "
                          role="menuitem"
                        >
                          <Icon icon="ph:sign-out" width="20" className="text-red-600" />
                          Sair
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setOpenToken(true)}
                  type="button"
                  className="
                    h-[2rem]
                    px-6
                    bg-red-gradient text-white
                    rounded-xl
                    inline-flex items-center justify-center
                    gap-3
                    hover:opacity-90 transition-opacity
                  "
                >
                  <span className="leading-none">Token</span>
                  <Icon icon="ph:arrow-circle-right-light" width="22" />
                </button>
              </div>

              <button
                ref={menuButtonRef}
                onClick={() => setOpenMenu(!openMenu)}
                className="lg:hidden ml-auto"
                type="button"
              >
                <Icon icon={openMenu ? 'ph:x-bold' : 'ph:list-bold'} width="28" color="#ffffff" />
              </button>
            </div>

            <div
              ref={dividerRef}
              className="hidden lg:block relative w-full h-[2px] bottom-4 bg-color-gray-50"
            >
              <span
                ref={activeRef}
                className="absolute top-0 h-full bg-color-orange-10 transition-all duration-300"
              />
            </div>

            {/* MOBILE */}
            <div
              ref={mobileMenuRef}
              className={`lg:hidden overflow-hidden transition-all duration-300 ${
                openMenu ? 'max-h-[400px]' : 'max-h-0'
              }`}
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-white">
                <Link href="/questions">Descubra o presente</Link>
                <Link href="/parceiros">Seja parceiro</Link>
                <a href="mailto:contato@smartpresente.com.br">Fale conosco</a>
                <Link href="/faq">FAQ</Link>

                <div className="flex flex-col gap-4">
                  {!isLogged ? (
                    <button
                      onClick={() => setOpenLogin(true)}
                      className="w-full h-[2.625rem] bg-red-gradient rounded-xl p-[1px]"
                      type="button"
                    >
                      <span className="w-full h-full bg-white rounded-[0.625rem] flex items-center justify-center text-red-500">
                        Login
                      </span>
                    </button>
                  ) : (
                    <div className="border border-white/10 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenUserMenu((v) => !v)}
                        className="w-full h-[2.625rem] bg-white/10 hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                      >
                        <Icon icon="ph:user-circle" width="20" color="#ffffff" />
                        Minha Conta
                      </button>

                      {openUserMenu && (
                        <div
                          ref={userMenuRef}
                          onClick={(e) => e.stopPropagation()}
                          className="
                            w-full
                            bg-transparent backdrop-blur
                            text-white overflow-hidden
                          "
                          role="menu"
                        >
                          <button
                            type="button"
                            onClick={goToBuyerGiftLists}
                            className="
                              w-full p-4
                              text-[13px] text-left text-white/90
                              hover:bg-white/10 transition-colors
                              flex items-center gap-2
                            "
                            role="menuitem"
                          >
                            <Icon icon="ph:user" width="20" />
                            Área logada
                          </button>

                          <div className="h-px bg-white/10" />

                          <button
                            type="button"
                            onClick={handleLogout}
                            className="
                              w-full p-4
                              text-[13px] text-left text-white
                              hover:bg-white/10 transition-colors
                              flex items-center gap-2
                            "
                            role="menuitem"
                          >
                            <Icon icon="ph:sign-out" width="20" className="text-red-600" />
                            Sair
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setOpenMenu(false);
                      setOpenToken(true);
                    }}
                    className="w-full h-[2.625rem] bg-red-gradient text-white rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    type="button"
                  >
                    Token
                    <Icon icon="ph:arrow-circle-right-light" width="22" />
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onOpenRegister={() => setOpenRegister(true)}
        onLoginSuccess={() => {
          setIsLogged(true);
          router.push('/buyer/gift-lists');
        }}
      />

      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        onOpenLogin={() => setOpenLogin(true)}
      />

      <TokenAccessModal open={openToken} onClose={() => setOpenToken(false)} />
    </>
  );
};

export default Header;
