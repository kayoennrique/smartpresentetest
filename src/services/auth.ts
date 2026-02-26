import {
  AuthResponse,
  RequestRecoverPasswordInput,
  ResetPasswordInput,
} from '@/types/resetpassword';
import { api } from './api';
import { saveSession } from '@/utils/auth';

export async function registerUser(data: {
  name: string;
  email: string;
  phone_e164: string;
  password: string;
}) {
  const res = await api.post<AuthResponse>('/client-auth/register', data);

  const accessToken = (res.data as any)?.accessToken;
  if (!accessToken) throw new Error('Access token não retornado pela API');

  saveSession(accessToken, data.name);

  return res.data;
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await api.post<AuthResponse>('/client-auth/login', data);

  const accessToken = (res.data as any)?.accessToken;
  if (!accessToken) throw new Error('Access token não retornado pela API');

  saveSession(accessToken);

  return res.data;
}

export async function requestRecoverPassword(input: RequestRecoverPasswordInput) {
  const { data } = await api.post('/client-auth/recover-password/request', input);
  return data;
}

export const requestPasswordReset = requestRecoverPassword;

export async function resetPassword(input: ResetPasswordInput) {
  const { data } = await api.post('/client-auth/recover-password/reset', input);
  return data;
}
