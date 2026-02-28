import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { logout as logoutAuth } from '@/utils/auth';

import useIsLogged from './useIsLogged';

const useHeaderState = () => {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const isLogged = useIsLogged();

  const goToBuyerGiftLists = () => {
    setOpenUserMenu(false);
    setOpenMenu(false);
    router.push('/buyer/gift-lists');
  };

  const handleLogout = () => {
    logoutAuth();
    setOpenUserMenu(false);
    setOpenMenu(false);
    router.push('/');
  };

  return {
    openMenu, setOpenMenu,
    openLogin, setOpenLogin,
    openRegister, setOpenRegister,
    openToken, setOpenToken,
    isLogged,
    openUserMenu, setOpenUserMenu,
    goToBuyerGiftLists,
    handleLogout,
    router,
  };
};

export default useHeaderState;
