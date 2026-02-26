export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: any;
};

export type RequestRecoverPasswordInput = {
  email: string;
};

export type ResetPasswordInput = {
  token: string;
  newPassword: string;
};
