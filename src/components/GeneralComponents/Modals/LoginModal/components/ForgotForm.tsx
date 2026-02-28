import { Icon } from '@iconify/react';

import type { ForgotFormProps } from '../interface';

const ForgotForm = ({
  email, setEmail,
  error,
  success,
  isLoading,
  onSubmit,
  onBack,
}: ForgotFormProps) => (
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

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
    </div>

    <div className="my-6 h-px bg-gray-200" />

    <button
      type="button"
      onClick={onSubmit}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-gradient py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
      <Icon icon="ph:paper-plane-tilt" width={20} />
    </button>

    <button type="button" onClick={onBack} className="mt-3 w-full text-center text-sm text-color-blue-10 hover:underline">
      Voltar para o login
    </button>
  </>
);

export default ForgotForm;
