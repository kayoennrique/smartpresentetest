import { Icon } from '@iconify/react';
import Link from 'next/link';

import type { MobileMenuProps } from '../interfaces';

import MobileUserAccount from './MobileUserAccount';


const MobileMenu = ({
  openMenu,
  isLogged,
  openUserMenu,
  setOpenUserMenu,
  goToBuyerGiftLists,
  handleLogout,
  onOpenLogin,
  onOpenToken,
  mobileMenuRef,
  userMenuRef,
}: MobileMenuProps) => (
  <div
    ref={mobileMenuRef}
    className={`lg:hidden overflow-hidden transition-all duration-300 ${openMenu ? 'max-h-[400px]' : 'max-h-0'}`}
  >
    <div className="px-6 py-4 flex flex-col gap-4 text-white">
      <Link href="/questions">Descubra o presente</Link>
      <Link href="/parceiros">Seja parceiro</Link>
      <a href="mailto:contato@smartpresente.com.br">Fale conosco</a>
      <Link href="/faq">FAQ</Link>

      <div className="flex flex-col gap-4">
        {!isLogged ? (
          <button
            onClick={onOpenLogin}
            className="w-full h-[2.625rem] bg-red-gradient rounded-xl p-[1px]"
            type="button"
          >
            <span className="w-full h-full bg-white rounded-[0.625rem] flex items-center justify-center text-red-500">
              Login
            </span>
          </button>
        ) : (
          <MobileUserAccount
            openUserMenu={openUserMenu}
            setOpenUserMenu={setOpenUserMenu}
            goToBuyerGiftLists={goToBuyerGiftLists}
            handleLogout={handleLogout}
            userMenuRef={userMenuRef}
          />
        )}

        <button
          onClick={onOpenToken}
          className="w-full h-[2.625rem] bg-red-gradient text-white rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          type="button"
        >
          Token
          <Icon icon="ph:arrow-circle-right-light" width="22" />
        </button>
      </div>
    </div>
  </div>
);

export default MobileMenu;
