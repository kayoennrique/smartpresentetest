import { Icon } from '@iconify/react';

import UserMenuDropdown from './UserMenuDropdown';

interface DesktopActionsProps {
  isLogged: boolean;
  openUserMenu: boolean;
  setOpenUserMenu: (v: boolean) => void;
  goToBuyerGiftLists: () => void;
  handleLogout: () => void;
  userMenuRef: React.RefObject<HTMLDivElement>;
  userButtonRef: React.RefObject<HTMLButtonElement>;
  onOpenLogin: () => void;
  onOpenToken: () => void;
}

const DesktopActions = ({
  isLogged,
  openUserMenu,
  setOpenUserMenu,
  goToBuyerGiftLists,
  handleLogout,
  userMenuRef,
  userButtonRef,
  onOpenLogin,
  onOpenToken,
}: DesktopActionsProps) => (
  <div className="hidden lg:flex items-center gap-3 ml-auto">
    {!isLogged ? (
      <button
        onClick={onOpenLogin}
        className="group w-[3.875rem] h-[2rem] flex items-center justify-center bg-red-gradient rounded-xl p-[1px]"
        type="button"
      >
        <span className="w-full h-full flex items-center justify-center bg-white rounded-[0.625rem] text-red-500 group-hover:bg-red-100">
          Login
        </span>
      </button>
    ) : (
      <UserMenuDropdown
        openUserMenu={openUserMenu}
        setOpenUserMenu={setOpenUserMenu}
        goToBuyerGiftLists={goToBuyerGiftLists}
        handleLogout={handleLogout}
        userMenuRef={userMenuRef}
        userButtonRef={userButtonRef}
      />
    )}

    <button
      onClick={onOpenToken}
      type="button"
      className="h-[2rem] px-6 bg-red-gradient text-white rounded-xl inline-flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
    >
      <span className="leading-none">Token</span>
      <Icon icon="ph:arrow-circle-right-light" width="22" />
    </button>
  </div>
);

export default DesktopActions;