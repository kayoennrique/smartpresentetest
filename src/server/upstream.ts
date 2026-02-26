export function getApiBaseUrl(): string {
  const base = (process.env.NEXT_PUBLIC_API_URL || '').trim();

  if (!base) {
    throw new Error('Defina NEXT_PUBLIC_API_URL no .env');
  }

  return base.replace(/\/+$/, '');
}

export function upstream(pathname: string): string {
  const base = getApiBaseUrl();
  const path = String(pathname || '')
    .trim()
    .replace(/^\/+/, '');
  return `${base}/${path}`;
}
