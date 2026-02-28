import useLoginModal from "@/hooks/useLoginModal";

import Modal from "../../Modal/Modal";
import type { LoginModalProps } from "../interface";

import ForgotForm from "./ForgotForm";
import LoginForm from "./LoginForm";


export default function LoginModal({ open, onClose, onOpenRegister, onLoginSuccess }: LoginModalProps) {
  const {
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
  } = useLoginModal({ open, onClose, onLoginSuccess });

  const title = mode === 'login' ? 'Faça seu login' : 'Recupere sua senha';
  const subtitle = mode === 'login'
    ? 'Para terminar o envio da cesta de presentes, é preciso fazer o login'
    : 'Informe seu email e enviaremos um link para redefinir a sua senha';

  const handleRegister = () => { resetForm(); onClose(); onOpenRegister(); };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4">
        <h2 className="mb-1 text-xl font-bold text-color-blue-10">{title}</h2>
        <p className="mb-6 text-sm text-gray-500">{subtitle}</p>

        {mode === 'login' ? (
          <LoginForm
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            showPassword={showPassword} setShowPassword={setShowPassword}
            error={error}
            isLoading={isLoading}
            onSubmit={handleLogin}
            onForgot={goToForgot}
            onRegister={handleRegister}
          />
        ) : (
          <ForgotForm
            email={email} setEmail={setEmail}
            error={error}
            success={success}
            isLoading={isLoading}
            onSubmit={handleForgotPassword}
            onBack={goToLogin}
          />
        )}
      </div>
    </Modal>
  );
}
