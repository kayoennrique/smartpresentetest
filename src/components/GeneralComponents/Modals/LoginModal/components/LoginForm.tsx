import { Icon } from '@iconify/react';

import type { LoginFormProps } from '../interface';

const LoginForm = ({
  email, setEmail,
  password, setPassword,
  showPassword, setShowPassword,
  error,
  isLoading,
  onSubmit,
  onForgot,
  onRegister,
}: LoginFormProps) => (
  <>
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
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <Icon icon={showPassword ? 'ph:eye-slash' : 'ph:eye'} width={20} />
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>

    <div className="my-6 h-px bg-gray-200" />

    <button
      type="button"
      onClick={onSubmit}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-gradient py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? 'Entrando...' : 'Acessar conta'}
      <Icon icon="ph:arrow-circle-right-light" width={20} />
    </button>

    <button type="button" onClick={onForgot} className="mt-3 w-full text-center text-sm text-color-blue-10 hover:underline">
      Esqueci minha senha
    </button>

    <p className="mt-4 text-center text-sm text-gray-600">
      Não possui uma conta?{' '}
      <button type="button" onClick={onRegister} className="text-color-green-30 hover:underline">
        Faça seu cadastro
      </button>
    </p>
  </>
);

export default LoginForm;
