import { useEffect, useRef } from 'react';

interface ClickOutsideConfig {
  openMenu: boolean;
  openUserMenu: boolean;
  onCloseMenu: () => void;
  onCloseUserMenu: () => void;
}

const useClickOutside = ({ openMenu, openUserMenu, onCloseMenu, onCloseUserMenu }: ClickOutsideConfig) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const isOutside = (target: Node, ...els: (HTMLElement | null)[]) =>
      els.every((el) => !el?.contains(target));

    const handleClickOutside = (event: MouseEvent) => {
      const t = event.target as Node;
      if (openMenu && isOutside(t, mobileMenuRef.current, menuButtonRef.current)) { onCloseMenu(); }
      if (openUserMenu && isOutside(t, userMenuRef.current, userButtonRef.current)) { onCloseUserMenu(); }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenu, openUserMenu, onCloseMenu, onCloseUserMenu]);

  return { mobileMenuRef, menuButtonRef, userMenuRef, userButtonRef };
};

export default useClickOutside;
