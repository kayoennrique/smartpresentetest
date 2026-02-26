function pick(obj: any, keys: string[]) {
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (typeof v === 'number' && Number.isFinite(v)) return String(v);
  }
  return '';
}

function normalizeCep(raw: string) {
  const digits = (raw || '').replace(/\D/g, '');
  if (digits.length === 8) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return String(raw || '').trim();
}

export type AddressVM = {
  hasAny: boolean;
  postalCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
};

function parseAddressText(addressText: unknown): AddressVM | null {
  const raw = typeof addressText === 'string' ? addressText.trim() : '';
  if (!raw) return null;

  const parts = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length < 2) return null;

  const postalCode = parts[0] || '';
  const street = parts[1] || '';
  const number = parts[2] || '';
  const complement = parts[3] || '';
  const neighborhood = parts[4] || '';
  const city = parts[5] || '';
  const state = parts[6] || '';
  const country = parts[7] || '';

  const hasAny = Boolean(
    postalCode || street || number || complement || neighborhood || city || state || country,
  );

  return {
    hasAny,
    postalCode: normalizeCep(postalCode),
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    country,
  };
}

export function readAddress(list: any): AddressVM {
  const src =
    list?.address ||
    list?.recipientAddress ||
    list?.recipient?.address ||
    list?.giftRecipientAddress ||
    null;

  const a = src ?? {};

  const postalCode = pick(a, ['postalCode', 'zipCode', 'cep', 'recipientAddressPostalCode']);
  const street = pick(a, ['street', 'addressLine1', 'logradouro', 'recipientAddressStreet']);
  const number = pick(a, ['number', 'streetNumber', 'numero', 'recipientAddressNumber']);
  const complement = pick(a, [
    'complement',
    'addressLine2',
    'complemento',
    'recipientAddressComplement',
  ]);
  const neighborhood = pick(a, [
    'neighborhood',
    'district',
    'bairro',
    'recipientAddressNeighborhood',
  ]);
  const city = pick(a, ['city', 'cidade', 'recipientAddressCity']);
  const state = pick(a, ['state', 'uf', 'estado', 'recipientAddressState']);
  const country = pick(a, ['country', 'pais', 'recipientAddressCountry']);

  const hasAny = Boolean(
    postalCode || street || number || complement || neighborhood || city || state || country,
  );

  if (hasAny) {
    return {
      hasAny: true,
      postalCode: normalizeCep(postalCode),
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
    };
  }

  const parsed = parseAddressText(list?.addressText);
  if (parsed?.hasAny) return parsed;

  return {
    hasAny: false,
    postalCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: '',
  };
}
