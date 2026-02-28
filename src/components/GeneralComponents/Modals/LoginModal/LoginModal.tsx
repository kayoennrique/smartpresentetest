'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

import { loginUser, requestPasswordReset } from '@/services/auth';

import Modal from '../Modal/Modal';

import type { LoginModalProps } from './interface';

type LoginMode = 'login' | 'forgot';

export default function LoginModal({
  open,
  onClose,
  onOpenRegister,
  onLoginSuccess,
}: LoginModalProps) {
  const [mode, setMode] = useState<LoginMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function resetForm() {
    setMode('login');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setError('');
    setSuccess('');
    setIsLoading(false);
  }

  useEffect(() => {
    if (!open) {resetForm();}
  }, [open]);

  async function handleLogin() {
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Informe email e senha');
      return;
    }

    try {
      setIsLoading(true);
      await loginUser({ email, password });

      onLoginSuccess();

      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Email ou senha inválidos');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError('');
    setSuccess('');

    if (!email) {
      setError('Informe seu email para recuperar a senha');
      return;
    }

    try {
      setIsLoading(true);
      await requestPasswordReset({ email });
      setSuccess('Se o email estiver cadastrado, enviaremos um link de recuperação.');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Não foi possível solicitar a recuperação de senha');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4">
        <h2 className="mb-1 text-xl font-bold text-color-blue-10">
          {mode === 'login' ? 'Faça seu login' : 'Recupere sua senha'}
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          {mode === 'login'
            ? 'Para terminar o envio da cesta de presentes, é preciso fazer o login'
            : 'Informe seu email e enviaremos um link para redefinir a sua senha'}
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-color-blue-10">Email:</label>
            <input
              type="email"
              placeholder="seuemail@xxx.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {mode === 'login' && (
            <div>
              <label className="text-sm font-medium text-color-blue-10">Senha:</label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  <Icon icon={showPassword ? 'ph:eye-slash' : 'ph:eye'} width={20} />
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </div>

        <div className="my-6 h-px bg-gray-200" />

        {mode === 'login' ? (
          <>
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-gradient py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Entrando...' : 'Acessar conta'}
              <Icon icon="ph:arrow-circle-right-light" width={20} />
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('forgot');
                setPassword('');
                setError('');
                setSuccess('');
              }}
              className="mt-3 w-full text-center text-sm text-color-blue-10 hover:underline"
            >
              Esqueci minha senha
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Não possui uma conta?{' '}
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                  onOpenRegister();
                }}
                className="text-color-green-30 hover:underline"
              >
                Faça seu cadastro
              </button>
            </p>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-gradient py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
              <Icon icon="ph:paper-plane-tilt" width={20} />
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
              className="mt-3 w-full text-center text-sm text-color-blue-10 hover:underline"
            >
              Voltar para o login
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
