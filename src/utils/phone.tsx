export function normalizePhoneToE164(value: string) {
  const numbers = value.replace(/\D/g, "");

  if (!numbers) return "";

  if (numbers.startsWith("55")) {
    return `+${numbers}`;
  }

  return `+55${numbers}`;
}
