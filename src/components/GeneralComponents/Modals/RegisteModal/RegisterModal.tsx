'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../Modal/Modal';
import { registerUser } from '@/services/auth';
import { registerSchema, RegisterFormData } from '@/schemas/register.schema';
import { normalizePhoneToE164 } from '@/utils/phone';
import { RegisterModalProps } from './interface';

export default function RegisterModal({ open, onClose, onOpenLogin }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const password = watch('password') || '';

  function getPasswordStrength() {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    return strength;
  }

  const strength = getPasswordStrength();

  async function onSubmit(data: RegisterFormData) {
    try {
      setLoading(true);

      const payload = {
        name: data.name,
        email: data.email,
        phone_e164: normalizePhoneToE164(data.phone),
        password: data.password,
      };

      await registerUser(payload);

      reset();

      onClose();
      onOpenLogin();
    } catch (error) {
      console.error('❌ Erro ao cadastrar', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-bold text-color-blue-10 mb-2">Faça seu cadastro</h2>

        <p className="text-sm text-gray-500 mb-4">
          Para terminar o envio da cesta de presentes, é preciso fazer o login
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-color-blue-10">Nome completo:</label>
            <input
              {...register('name')}
              placeholder="Escreva seu nome"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-color-blue-10">Email:</label>
            <input
              {...register('email')}
              type="email"
              placeholder="seuemail@xxx.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-color-blue-10">Celular:</label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="(xx) xxxxx-xxxx"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-color-blue-10">Senha:</label>

            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <Icon icon={showPassword ? 'ph:eye-slash' : 'ph:eye'} width={18} />
              </button>
            </div>

            {/* Força da senha */}
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
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="my-6 h-px bg-gray-200" />

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full rounded-xl bg-red-gradient py-3 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
            <Icon icon="ph:arrow-circle-right-light" width={20} />
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Já possui uma conta?{' '}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="text-color-green-30 hover:underline"
          >
            Faça o login
          </button>
        </p>
      </div>
    </Modal>
  );
}
