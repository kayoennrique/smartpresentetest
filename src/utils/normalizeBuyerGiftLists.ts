import type { BuyerListVM } from '@/types/dashboard';

function publicImageUrl(pathOrUrl: any) {
  const s = String(pathOrUrl || '').trim();
  if (!s) {return '';}
  if (/^https?:\/\//i.test(s)) {return s;}

  const BASE = 'bucket.api.smartpresente.com.br';
  return `${BASE}/${s.replace(/^\/+/, '')}`;
}

function pickArray(payload: any): any[] {
  if (Array.isArray(payload?.items)) {return payload.items;}
  if (Array.isArray(payload?.data)) {return payload.data;}
  if (Array.isArray(payload?.results)) {return payload.results;}
  return [];
}

function formatAddressAny(a: any): string {
  if (!a) {return 'Endereço ainda não informado.';}

  const street = a?.recipientAddressStreet ?? a?.logradouro ?? a?.street ?? '';
  const number = a?.recipientAddressNumber ?? a?.numero ?? a?.number ?? '';
  const complement = a?.recipientAddressComplement ?? a?.complemento ?? a?.complement ?? '';
  const neighborhood = a?.recipientAddressNeighborhood ?? a?.bairro ?? a?.neighborhood ?? '';
  const city = a?.recipientAddressCity ?? a?.cidade ?? a?.city ?? '';
  const state = a?.recipientAddressState ?? a?.estado ?? a?.state ?? '';
  const postalCode = a?.recipientAddressPostalCode ?? a?.cep ?? a?.postalCode ?? '';
  const country = a?.recipientAddressCountry ?? a?.pais ?? a?.country ?? '';

  const parts = [postalCode, street, number, complement, neighborhood, city, state, country]
    .map((x) => String(x || '').trim())
    .filter(Boolean);

  return parts.length ? parts.join(', ') : 'Endereço ainda não informado.';
}

function safeString(v: any) {
  return typeof v === 'string' ? v.trim() : '';
}

function safeNumber(v: any): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined;
}

function pickGiftHintMessage(v: any): string {
  return (
    safeString(
      v?.giftHintMessage ??
        v?.gift_hint_message ??
        v?.tip ??
        v?.hint ??
        v?.giftHint ??
        v?.gift_hint ??
        v?.giftHintText ??
        v?.message,
    ) || ''
  );
}

export function normalizeBuyerGiftLists(raw: any): BuyerListVM[] {
  const lists = pickArray(raw);

  return lists.map((l: any) => {
    const createdAtCandidate = l?.createdAt;
    const updatedAtCandidate = l?.updatedAt;
    const shareCodeUsedAtCandidate = l?.shareCodeUsedAt;

    const id = String(l?.id ?? l?.giftListId ?? '');
    const title = String(l?.name ?? l?.title ?? 'Lista');
    const shareCode = String(l?.shareCode ?? l?.share_code ?? l?.code ?? '');

    const createdAt =
      safeString(createdAtCandidate) ||
      safeString(updatedAtCandidate) ||
      safeString(shareCodeUsedAtCandidate) ||
      '';

    const recipientName = safeString(l?.recipientName ?? l?.recipient?.name) || 'Presenteado';

    const hideGifts = Boolean(l?.hideGifts ?? l?.hide_gifts ?? l?.isHidden ?? l?.hidden);

    const itemsRaw = Array.isArray(l?.items) ? l.items : [];

    const items: BuyerListVM['items'] = itemsRaw.map((it: any) => {
      const p = it?.product ?? it;

      const itemId = String(it?.id ?? '');
      const productId = it?.productId != null ? String(it.productId) : undefined;

      const name = String(p?.productName ?? p?.name ?? it?.productName ?? it?.name ?? 'Produto');
      const description = String(p?.description ?? it?.description ?? '');

      const giftHintMessage = pickGiftHintMessage(it) || pickGiftHintMessage(p) || '';

      const imageUrl = publicImageUrl(p?.imageUrl ?? p?.imagePath ?? it?.imageUrl ?? it?.imagePath);

      const priceCents = safeNumber(p?.priceCents) ?? safeNumber(it?.priceCents);
      const currencyType = safeString(p?.currencyType) || safeString(it?.currencyType) || undefined;

      const retailerName =
        safeString(p?.retailer?.name) ||
        safeString(it?.retailer?.name) ||
        (typeof p?.retailer === 'string' ? p.retailer.trim() : '') ||
        (typeof it?.retailer === 'string' ? it.retailer.trim() : '') ||
        undefined;

      const retailerLogoUrl = publicImageUrl(
        p?.retailer?.logoUrl ??
          p?.retailer?.logoPath ??
          it?.retailer?.logoUrl ??
          it?.retailer?.logoPath,
      );

      const isSelectedByRecipient = Boolean(it?.isSelectedByRecipient);

      return {
        id: itemId,
        productId,
        name,
        description,
        giftHintMessage,
        imageUrl,
        priceCents,
        currencyType,
        retailerName,
        retailerLogoUrl: retailerLogoUrl || undefined,
        isSelectedByRecipient,
      };
    });

    const selectedFromItems =
      itemsRaw.find((it: any) => it?.isSelectedByRecipient === true) ?? null;

    const selectedRaw =
      selectedFromItems ??
      l?.selectedItem ??
      l?.chosenItem ??
      l?.selected ??
      l?.recipientChoice ??
      itemsRaw.find(
        (it: any) =>
          it?.isSelected === true ||
          it?.selected === true ||
          it?.status === 'SELECTED' ||
          it?.status === 'CHOSEN' ||
          it?.selectedAt,
      ) ??
      null;

    const selected = selectedRaw
      ? (() => {
          const p = selectedRaw?.product ?? selectedRaw;

          const selectedId = String(
            selectedRaw?.id ?? selectedRaw?.itemId ?? selectedRaw?.giftListItemId ?? '',
          );

          const selectedImageUrl = publicImageUrl(
            p?.imageUrl ?? p?.imagePath ?? selectedRaw?.imageUrl ?? selectedRaw?.imagePath,
          );

          const priceCents = safeNumber(p?.priceCents) ?? safeNumber(selectedRaw?.priceCents);

          const currencyType =
            safeString(p?.currencyType) || safeString(selectedRaw?.currencyType) || undefined;

          const retailerName =
            safeString(p?.retailer?.name) ||
            safeString(selectedRaw?.retailer?.name) ||
            (typeof p?.retailer === 'string' ? p.retailer.trim() : '') ||
            (typeof selectedRaw?.retailer === 'string' ? selectedRaw.retailer.trim() : '') ||
            undefined;

          const retailerLogoUrl = publicImageUrl(
            p?.retailer?.logoUrl ??
              p?.retailer?.logoPath ??
              selectedRaw?.retailer?.logoUrl ??
              selectedRaw?.retailer?.logoPath,
          );

          const giftHintMessage = pickGiftHintMessage(selectedRaw) || pickGiftHintMessage(p) || '';

          return {
            id: selectedId,
            name: String(p?.productName ?? p?.name ?? selectedRaw?.name ?? 'Produto'),
            description: String(p?.description ?? selectedRaw?.description ?? ''),
            giftHintMessage,
            imageUrl: selectedImageUrl,

            priceCents,
            currencyType,
            retailerName,
            retailerLogoUrl: retailerLogoUrl || undefined,
          };
        })()
      : null;

    const addressCandidate =
      l?.address ?? l?.shippingAddress ?? l?.recipientAddress ?? l?.deliveryAddress ?? l ?? null;

    return {
      id,
      title,
      shareCode,
      createdAt,
      recipientName,
      hideGifts,
      items,
      selected,
      addressText: formatAddressAny(addressCandidate),
    };
  });
}
