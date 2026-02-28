'use client';

type JwtPayload = {
  exp?: number;
  [k: string]: any;
};

function safeJsonParse(input: string) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

function decodeBase64Url(b64url: string) {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4;
  const padded = pad ? b64 + '='.repeat(4 - pad) : b64;

  const decoded = atob(padded);

  try {
    return decodeURIComponent(
      Array.from(decoded)
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    );
  } catch {
    return decoded;
  }
}

export function getJwtPayload(token: string): JwtPayload | null {
  const parts = String(token || '').split('.');
  if (parts.length < 2) {return null;}

  const json = decodeBase64Url(parts[1]);
  const payload = safeJsonParse(json);

  return payload && typeof payload === 'object' ? (payload as JwtPayload) : null;
}

export function saveSession(accessToken: string, userName?: string) {
  if (typeof window === 'undefined') {return;}

  const token = String(accessToken || '').trim();
  if (!token) {return;}

  localStorage.setItem('access_token', token);

  const name = String(userName || '').trim();
  if (name) {localStorage.setItem('user_name', name);}
}

export function logout() {
  if (typeof window === 'undefined') {return;}
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_name');
}

export function isLogged() {
  if (typeof window === 'undefined') {return false;}

  const token = localStorage.getItem('access_token') || '';
  if (!token) {return false;}

  const payload = getJwtPayload(token);
  const exp = typeof payload?.exp === 'number' ? payload.exp : 0;

  if (!exp) {return false;}

  const now = Math.floor(Date.now() / 1000);
  return exp > now + 10;
}

export function getUserName() {
  if (typeof window === 'undefined') {return '';}
  return String(localStorage.getItem('user_name') || '').trim();
}
