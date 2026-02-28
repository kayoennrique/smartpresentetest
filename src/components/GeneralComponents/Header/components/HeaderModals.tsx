

import LoginModal from '../../Modals/LoginModal/LoginModal';
import RegisterModal from '../../Modals/RegisteModal/RegisterModal';
import TokenAccessModal from '../../Modals/TokenAccessModal/TokenAccessModal';
import type { HeaderModalsProps } from '../interfaces';

const HeaderModals = ({
  openLogin,
  openRegister,
  openToken,
  setOpenLogin,
  setOpenRegister,
  setOpenToken,
  router,
}: HeaderModalsProps) => (
  <>
    <LoginModal
      open={openLogin}
      onClose={() => setOpenLogin(false)}
      onOpenRegister={() => setOpenRegister(true)}
      onLoginSuccess={() => router.push('/buyer/gift-lists')}
    />
    <RegisterModal
      open={openRegister}
      onClose={() => setOpenRegister(false)}
      onOpenLogin={() => setOpenLogin(true)}
    />
    <TokenAccessModal open={openToken} onClose={() => setOpenToken(false)} />
  </>
);

export default HeaderModals;
