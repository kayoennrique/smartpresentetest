'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ResetPasswordFormData } from '@/schemas/resetPassword.schema';
import { resetPasswordSchema } from '@/schemas/resetPassword.schema';
import { resetPassword } from '@/services/auth';

import type { ResetPasswordFormProps } from './types';

function normalizeToken(raw: string) {
  return (raw || '').trim().replaceAll(' ', '+');
}

export default function ResetPasswordForm({ token: tokenProp }: ResetPasswordFormProps) {
  const searchParams = useSearchParams();

  const tokenFromQuery = searchParams.get('token') || '';
  const token = useMemo(
    () => normalizeToken(tokenProp || tokenFromQuery),
    [tokenProp, tokenFromQuery],
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [success, setSuccess] = useState('');
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password') || '';

  function getPasswordStrength(pwd: string) {
    if (pwd.length === 0) {return 0;}
    if (pwd.length < 6) {return 1;}
    if (pwd.length < 10) {return 2;}
    return 3;
  }

  const strength = getPasswordStrength(password);

  async function onSubmit(data: ResetPasswordFormData) {
    setApiError('');
    setSuccess('');

    if (!token) {
      setApiError('Token inválido ou ausente. Solicite um novo link de recuperação.');
      return;
    }

    try {
      await resetPassword({ token, newPassword: data.password });

      setSuccess('Senha redefinida com sucesso! Agora você já pode fazer login.');
      reset();
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (err: any) {
      console.error(err);
      setApiError(err?.message || 'Não foi possível redefinir sua senha.');
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-lg items-center justify-center px-4 py-10">
      <section className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-color-blue-10">Redefinir senha</h1>
        <p className="mb-6 text-sm text-gray-500">
          Digite sua nova senha para concluir a recuperação de conta.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-color-blue-10">
              Nova senha
            </label>

            <div className="relative">
              <input
                id="password"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none"
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Icon icon={showPassword ? 'ph:eye-slash' : 'ph:eye'} width={18} />
              </button>
            </div>

            <div className="mt-2 flex gap-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded ${
                    strength >= level
                      ? level === 1
                        ? 'bg-red-400'
                        : level === 2
                          ? 'bg-yellow-400'
                          : 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-color-blue-10">
              Confirmar nova senha
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none"
                placeholder="Repita a nova senha"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showConfirmPassword ? 'Ocultar confirmação' : 'Mostrar confirmação'}
              >
                <Icon icon={showConfirmPassword ? 'ph:eye-slash' : 'ph:eye'} width={18} />
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {apiError && <p className="text-sm text-red-500">{apiError}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-xl bg-red-gradient py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Redefinindo...' : 'Redefinir senha'}
          </button>
        </form>

        <Link href="/" className="mt-4 inline-block text-sm text-color-blue-10 hover:underline">
          Voltar para a página inicial
        </Link>
      </section>
    </main>
  );
}
