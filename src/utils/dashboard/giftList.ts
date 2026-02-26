export function formatBRLFromCents(cents: number) {
  return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
}

export type ItemVM = {
  id: string;
  title: string;
  description: string;
  giftHintMessage?: string;
  imageUrl: string;
  priceText: string;
  retailer: string;
  selected: boolean;
  raw: any;
};

export function getSortedItems(list: any): any[] {
  const items = Array.isArray(list?.items) ? [...list.items] : [];
  return items.sort((a, b) => {
    const sa = a?.isSelectedByRecipient ? 1 : 0;
    const sb = b?.isSelectedByRecipient ? 1 : 0;
    if (sa !== sb) return sb - sa;
    return String(a?.id ?? '').localeCompare(String(b?.id ?? ''));
  });
}

function pickHint(raw: any): string {
  return String(
    raw?.giftHintMessage ??
      raw?.gift_hint_message ??
      raw?.tip ??
      raw?.hint ??
      raw?.giftHint ??
      raw?.gift_hint ??
      '',
  ).trim();
}

export function toItemVM(it: any): ItemVM {
  const title = (it?.name || '').trim() || 'Produto';

  const description = (it?.description || '').trim();

  const giftHintMessage = pickHint(it) || undefined;

  const imageUrl = (it?.imageUrl || '').trim();

  const priceCents =
    typeof it?.priceCents === 'number' && Number.isFinite(it.priceCents) && it.priceCents > 0
      ? it.priceCents
      : null;

  const retailer =
    typeof it?.retailerName === 'string' && it.retailerName.trim() ? it.retailerName.trim() : '—';

  return {
    id: String(it?.id ?? ''),
    title,
    description,
    giftHintMessage,
    imageUrl,
    priceText: priceCents ? formatBRLFromCents(priceCents) : '—',
    retailer,
    selected: !!it?.isSelectedByRecipient,
    raw: it,
  };
}

export function getSelectedFromList(list: any) {
  const explicit = list?.selected ?? null;
  if (explicit) return explicit;

  const fromItems = Array.isArray(list?.items)
    ? list.items.find((x: any) => x?.isSelectedByRecipient)
    : null;

  return fromItems ?? null;
}
