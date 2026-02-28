import { Icon } from '@iconify/react';

import type { MobileUserAccountProps } from '../interfaces';

const MobileUserAccount = ({
  openUserMenu,
  setOpenUserMenu,
  goToBuyerGiftLists,
  handleLogout,
  userMenuRef,
}: MobileUserAccountProps) => (
  <div className="border border-white/10 rounded-xl overflow-hidden">
    <button
      type="button"
      onClick={() => setOpenUserMenu(!openUserMenu)}
      className="w-full h-[2.625rem] bg-white/10 hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
    >
      <Icon icon="ph:user-circle" width="20" color="#ffffff" />
      Minha Conta
    </button>

    {openUserMenu && (
      <div
        ref={userMenuRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-transparent backdrop-blur text-white overflow-hidden"
        role="menu"
      >
        <button
          type="button"
          onClick={goToBuyerGiftLists}
          className="w-full p-4 text-[13px] text-left text-white/90 hover:bg-white/10 transition-colors flex items-center gap-2"
          role="menuitem"
        >
          <Icon icon="ph:user" width="20" />
          Área logada
        </button>

        <div className="h-px bg-white/10" />

        <button
          type="button"
          onClick={handleLogout}
          className="w-full p-4 text-[13px] text-left text-white hover:bg-white/10 transition-colors flex items-center gap-2"
          role="menuitem"
        >
          <Icon icon="ph:sign-out" width="20" className="text-red-600" />
          Sair
        </button>
      </div>
    )}
  </div>
);

export default MobileUserAccount;
