import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface HeaderModalsProps {
  openLogin: boolean;
  openRegister: boolean;
  openToken: boolean;
  setOpenLogin: (v: boolean) => void;
  setOpenRegister: (v: boolean) => void;
  setOpenToken: (v: boolean) => void;
  router: AppRouterInstance;
}


export interface MobileMenuProps {
  openMenu: boolean;
  isLogged: boolean;
  openUserMenu: boolean;
  setOpenUserMenu: (v: boolean) => void;
  goToBuyerGiftLists: () => void;
  handleLogout: () => void;
  onOpenLogin: () => void;
  onOpenToken: () => void;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
  userMenuRef: React.RefObject<HTMLDivElement>;
}

export interface MobileUserAccountProps {
  openUserMenu: boolean;
  setOpenUserMenu: (v: boolean) => void;
  goToBuyerGiftLists: () => void;
  handleLogout: () => void;
  userMenuRef: React.RefObject<HTMLDivElement>;
}

export interface UserMenuDropdownProps {
  openUserMenu: boolean;
  setOpenUserMenu: (v: boolean) => void;
  goToBuyerGiftLists: () => void;
  handleLogout: () => void;
  userMenuRef: React.RefObject<HTMLDivElement>;
  userButtonRef: React.RefObject<HTMLButtonElement>;
}