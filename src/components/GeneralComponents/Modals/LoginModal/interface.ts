export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  onLoginSuccess: () => void;
}


export interface ForgotFormProps {
  email: string;
  setEmail: (v: string) => void;
  error: string;
  success: string;
  isLoading: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export interface LoginFormProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  error: string;
  isLoading: boolean;
  onSubmit: () => void;
  onForgot: () => void;
  onRegister: () => void;
}