import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from '@/types/lists';
import { logout } from '@/utils/auth';

const isBrowser = typeof window !== 'undefined';

// ✅ Browser chama o proxy do Next
const baseURL = '/api';

function readAccessToken() {
  if (!isBrowser) return '';
  return localStorage.getItem('access_token') || '';
}

export const api = axios.create({
  baseURL,
  timeout: 30000,
});

function isPublicAuthRoute(url: string) {
  return (
    url.includes('/client-auth/login') ||
    url.includes('/client-auth/register') ||
    url.includes('/client-auth/recover-password/request') ||
    url.includes('/client-auth/recover-password/reset')
  );
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = String(config.url || '');

  if (isBrowser && !isPublicAuthRoute(url)) {
    const token = readAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

function normalizeAxiosError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<any>;
    return {
      status: e.response?.status,
      message:
        e.response?.data?.message || e.response?.data?.error || e.message || 'Erro inesperado',
      details: e.response?.data,
    };
  }
  return { message: 'Erro inesperado' };
}

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const normalized = normalizeAxiosError(err);

    if (normalized.status === 401 && isBrowser) {
      logout();
    }

    return Promise.reject(normalized);
  },
);
