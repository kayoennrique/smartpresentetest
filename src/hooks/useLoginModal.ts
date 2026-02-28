import { useEffect, useState } from 'react';

import type { LoginModalProps } from '@/components/GeneralComponents/Modals/LoginModal/interface';
import { loginUser, requestPasswordReset } from '@/services/auth';
import { saveSession } from '@/utils/auth';


type LoginMode = 'login' | 'forgot';

const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) { return err.message; }
  return 'Não foi possível solicitar a recuperação de senha';
};

const useLoginModal = ({ open, onClose, onLoginSuccess }: Pick<LoginModalProps, 'open' | 'onClose' | 'onLoginSuccess'>) => {
  const [mode, setMode] = useState<LoginMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setMode('login');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setError('');
    setSuccess('');
    setIsLoading(false);
  };

  useEffect(() => {
    if (!open) { resetForm(); }
  }, [open]);

  const clearMessages = () => { setError(''); setSuccess(''); };

  const goToForgot = () => { setMode('forgot'); setPassword(''); clearMessages(); };
  const goToLogin = () => { setMode('login'); clearMessages(); };

  const handleLogin = async () => {
    clearMessages();
    if (!email || !password) { setError('Informe email e senha'); return; }

    try {
      setIsLoading(true);
      const { accessToken } = await loginUser({ email, password });
      saveSession(accessToken);
      onLoginSuccess();
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Email ou senha inválidos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    clearMessages();
    if (!email) { setError('Informe seu email para recuperar a senha'); return; }

    try {
      setIsLoading(true);
      await requestPasswordReset({ email });
      setSuccess('Se o email estiver cadastrado, enviaremos um link de recuperação.');
    } catch (err: unknown) {
      console.error(err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mode,
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    error,
    success,
    isLoading,
    resetForm,
    goToForgot,
    goToLogin,
    handleLogin,
    handleForgotPassword,
  };
};

export default useLoginModal;