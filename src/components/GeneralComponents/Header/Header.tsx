'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Container } from '@/components/GeneralComponents/Container/Container';


import DesktopActions from './components/DesktopActions';
import HeaderModals from './components/HeaderModals';
import MobileMenu from './components/MobileMenu';
import useActiveLink from './hooks/useActiveLink';
import useClickOutside from './hooks/useClickOutside';
import useHeaderState from './hooks/useHeaderState';

const Header = () => {
  const pathname = usePathname();

  const {
    openMenu, setOpenMenu,
    openLogin, setOpenLogin,
    openRegister, setOpenRegister,
    openToken, setOpenToken,
    isLogged,
    openUserMenu, setOpenUserMenu,
    goToBuyerGiftLists,
    handleLogout,
    router,
  } = useHeaderState();

  const { navRef, dividerRef, activeRef } = useActiveLink(pathname);

  const { mobileMenuRef, menuButtonRef, userMenuRef, userButtonRef } = useClickOutside({
    openMenu,
    openUserMenu,
    onCloseMenu: () => setOpenMenu(false),
    onCloseUserMenu: () => setOpenUserMenu(false),
  });

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-color-red-20">
        <div className="shadow-xl">
          <Container>
            <div className="flex items-center py-8">
              <Link href="/" className="flex items-center transition-transform duration-200 hover:scale-[1.03] -mt-6 -mb-4 lg:-mt-6 lg:-mb-2">
                <Image src="/logo/branco-logo.png" alt="Logo" width={140} height={20} priority />
              </Link>

              <nav ref={navRef} className="hidden lg:flex items-center gap-6 ml-6 text-[1rem] text-white">
                <Link href="/questions">Descubra o presente</Link>
                <Link href="/parceiros">Seja parceiro</Link>
                <a href="mailto:contato@smartpresente.com.br">Fale conosco</a>
                <Link href="/faq">FAQ</Link>
              </nav>

              <DesktopActions
                isLogged={isLogged}
                openUserMenu={openUserMenu}
                setOpenUserMenu={setOpenUserMenu}
                goToBuyerGiftLists={goToBuyerGiftLists}
                handleLogout={handleLogout}
                userMenuRef={userMenuRef}
                userButtonRef={userButtonRef}
                onOpenLogin={() => setOpenLogin(true)}
                onOpenToken={() => setOpenToken(true)}
              />

              <button ref={menuButtonRef} onClick={() => setOpenMenu(!openMenu)} className="lg:hidden ml-auto" type="button">
                <Icon icon={openMenu ? 'ph:x-bold' : 'ph:list-bold'} width="28" color="#ffffff" />
              </button>
            </div>

            <div ref={dividerRef} className="hidden lg:block relative w-full h-[2px] bottom-4 bg-color-gray-50">
              <span ref={activeRef} className="absolute top-0 h-full bg-color-orange-10 transition-all duration-300" />
            </div>

            <MobileMenu
              openMenu={openMenu}
              isLogged={isLogged}
              openUserMenu={openUserMenu}
              setOpenUserMenu={setOpenUserMenu}
              goToBuyerGiftLists={goToBuyerGiftLists}
              handleLogout={handleLogout}
              onOpenLogin={() => setOpenLogin(true)}
              onOpenToken={() => { setOpenMenu(false); setOpenToken(true); }}
              mobileMenuRef={mobileMenuRef}
              userMenuRef={userMenuRef}
            />
          </Container>
        </div>
      </header>

      <HeaderModals
        openLogin={openLogin}
        openRegister={openRegister}
        openToken={openToken}
        setOpenLogin={setOpenLogin}
        setOpenRegister={setOpenRegister}
        setOpenToken={setOpenToken}
        router={router}
      />
    </>
  );
};

export default Header;