import { Icon } from '@iconify/react';

import type { UserMenuDropdownProps } from '../interfaces';

const UserMenuDropdown = ({
  openUserMenu,
  setOpenUserMenu,
  goToBuyerGiftLists,
  handleLogout,
  userMenuRef,
  userButtonRef,
}: UserMenuDropdownProps) => (
  <div className="relative">
    <button
      ref={userButtonRef}
      type="button"
      onClick={() => setOpenUserMenu(!openUserMenu)}
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center transition-colors"
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
        className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-[#111827]/80 backdrop-blur shadow-2xl overflow-hidden z-50"
        role="menu"
      >
        <button
          type="button"
          onClick={goToBuyerGiftLists}
          className="w-full px-3 py-2 text-[13px] text-left text-white hover:bg-white/10 transition-colors flex items-center gap-2"
          role="menuitem"
        >
          <Icon icon="ph:user" width="20" />
          Área logada
        </button>

        <div className="h-px bg-white/10" />

        <button
          type="button"
          onClick={handleLogout}
          className="w-full px-3 py-2 text-[13px] text-left text-white hover:bg-white/10 transition-colors flex items-center gap-2"
          role="menuitem"
        >
          <Icon icon="ph:sign-out" width="20" className="text-red-600" />
          Sair
        </button>
      </div>
    )}
  </div>
);

export default UserMenuDropdown;
