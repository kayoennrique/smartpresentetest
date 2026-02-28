const USER_NAME_KEY = 'user_name';

export function saveUserName(name: string) {
  if (typeof window === 'undefined') {return;}
  const v = String(name || '').trim();
  if (!v) {return;}
  localStorage.setItem(USER_NAME_KEY, v);
}

export function getUserNameFromStorage(): string {
  if (typeof window === 'undefined') {return '';}
  return String(localStorage.getItem(USER_NAME_KEY) || '').trim();
}

function base64UrlDecode(input: string) {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');

  const pad = base64.length % 4;
  const padded = pad ? base64 + '='.repeat(4 - pad) : base64;

  try {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(padded), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
  } catch {
    try {
      return atob(padded);
    } catch {
      return '';
    }
  }
}

export function getJwtPayload(token: string): any | null {
  const t = String(token || '').trim();
  if (!t) {return null;}

  const parts = t.split('.');
  if (parts.length < 2) {return null;}

  const json = base64UrlDecode(parts[1]);
  if (!json) {return null;}

  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getAccessToken(): string {
  if (typeof window === 'undefined') {return '';}
  return String(localStorage.getItem('access_token') || '').trim();
}

export function getBestUserName(): string {
  const stored = getUserNameFromStorage();
  if (stored) {return stored;}

  const token = getAccessToken();
  const payload = getJwtPayload(token);

  const name =
    (typeof payload?.name === 'string' && payload.name.trim()) ||
    (typeof payload?.fullName === 'string' && payload.fullName.trim()) ||
    (typeof payload?.username === 'string' && payload.username.trim()) ||
    '';

  return name;
}
