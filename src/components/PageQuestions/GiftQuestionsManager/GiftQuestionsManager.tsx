'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { GiftListShare, GiftQuestionsManagerProps } from './types';
import FirstStep from './steps/FirstStep/FirstStep';
import SecondStep from './steps/SecondStep/SecondStep';
import ThirdStep from './steps/ThirdStep/ThirdStep';

import { getSharedGiftList, selectGiftListItem } from '@/services/giftLists';
import { RecommendedProduct, TipItem } from './steps/SecondStep/types';
import type { ThirdStepConfirmPayload } from './steps/ThirdStep/types';

import SuccessModal from '@/components/GeneralComponents/Modals/SuccessModal/SuccessModal';
import LoadingState from '@/components/GeneralComponents/LoadingState/LoadingState';
import EmptyState from '@/components/GeneralComponents/EmptyState/EmptyState';

const giftImages = [
  '/amarelo.png',
  '/azul-escuro.png',
  '/azul.png',
  '/roxo.png',
  '/verde.png',
  '/vinho.png',
];

function storageKey(shareCode: string) {
  return `gift-recipient-choice:${shareCode}`;
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function buildImageUrl(rawPath: string): string {
  const path = (rawPath || '').trim();
  if (!path) return '';

  if (/^https?:\/\//i.test(path)) return path;

  const BUCKET_BASE = 'bucket.api.smartpresente.com.br';
  const cleanPath = path.replace(/^\//, '');

  return `${BUCKET_BASE}/${cleanPath}`;
}

function normalizeItemToProduct(item: any): RecommendedProduct | null {
  const p = item?.product;

  if (!item?.id || !p?.productName) return null;

  return {
    id: String(item.id),
    productName: String(p.productName || ''),
    description: String(p.description || ''),
    retailer: '',
    productUrl: '',
    imageUrl: buildImageUrl(p.imageUrl || ''),
    price: Number(p.priceCents || 0),
    currency: 'BRL' as const,
    featured: false,
  };
}

function normalizeProductsForDetails(itemsRaw: any[]): RecommendedProduct[] {
  return itemsRaw.map(normalizeItemToProduct).filter((p): p is RecommendedProduct => p !== null);
}

function normalizeItemsForTips(itemsRaw: any[]): TipItem[] {
  return itemsRaw.map((item) => ({
    id: item?.id != null ? String(item.id) : undefined,
    productId: item?.productId ?? item?.product?.id,
    giftHintMessage: item?.giftHintMessage ?? item?.tip ?? item?.hint ?? item?.giftHint ?? '',
  }));
}

export default function GiftQuestionsManager({ shareCode }: GiftQuestionsManagerProps) {
  const router = useRouter();

  const [data, setData] = useState<GiftListShare | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [successOpen, setSuccessOpen] = useState(false);

  const savedChoice = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return safeParse<{
      itemId?: string;
      productId?: string;
      imgIndex?: number;
      address?: Partial<ThirdStepConfirmPayload>;
    }>(localStorage.getItem(storageKey(shareCode)));
  }, [shareCode]);

  const [selectedItemId, setSelectedItemId] = useState<string>(
    savedChoice?.itemId ?? savedChoice?.productId ?? '',
  );

  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(() => {
    return typeof savedChoice?.imgIndex === 'number' ? savedChoice.imgIndex : 0;
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const senderName = useMemo(() => data?.senderName ?? 'Alguém', [data]);
  const recipientName = useMemo(() => data?.recipientName ?? 'você', [data]);

  const itemsRaw = useMemo<any[]>(() => {
    return Array.isArray(data?.items) ? data!.items : [];
  }, [data]);

  const hideGifts = useMemo(() => Boolean(data?.hideGifts), [data]);
  const mode: 'details' | 'tips' = hideGifts ? 'tips' : 'details';

  const tipItems = useMemo(() => normalizeItemsForTips(itemsRaw), [itemsRaw]);
  const productsForDetails = useMemo(() => normalizeProductsForDetails(itemsRaw), [itemsRaw]);

  const selectedHintText = useMemo(() => {
    if (mode === 'tips') {
      const selected = tipItems.find((t) => String(t.id ?? '') === String(selectedItemId));

      return (
        selected?.giftHintMessage?.trim() ||
        'Aqui terá a dica que o presentador resolveu escrever para o presenteado.'
      );
    }

    const selected = productsForDetails.find((p) => String(p.id) === String(selectedItemId));
    if (!selected) return 'Selecione um presente para continuar.';

    const parts = [selected.productName?.trim(), selected.description?.trim()].filter(Boolean);

    return parts.join(' — ') || 'Presente selecionado.';
  }, [mode, tipItems, productsForDetails, selectedItemId]);

  const selectedPreview = useMemo(() => {
    if (mode === 'tips') {
      const s = tipItems.find((t) => String(t.id ?? '') === String(selectedItemId));

      const img = giftImages[selectedImgIndex % giftImages.length] ?? giftImages[0];

      return {
        title: 'Dica',
        subtitle:
          s?.giftHintMessage?.trim() ||
          'Aqui terá a dica que o presentador resolveu escrever para o presenteado.',
        imageUrl: img,
      };
    }

    const p = productsForDetails.find((x) => String(x.id) === String(selectedItemId));
    if (!p) return null;

    return {
      title: p.productName || 'Presente selecionado',
      subtitle: p.description || undefined,
      imageUrl: p.imageUrl || '/amarelo.png',
    };
  }, [mode, tipItems, productsForDetails, selectedItemId, selectedImgIndex]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadError(null);

      try {
        const res = await getSharedGiftList(shareCode);

        if (!cancelled) {
          setData(res);
        }
      } catch {
        if (!cancelled) {
          setData(null);
          setLoadError('Lista não encontrada ou expirada.');
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [shareCode]);

  if (!data && !loadError) {
    return <LoadingState />;
  }

  if (loadError || !data) {
    return (
      <EmptyState
        title="Lista não encontrada"
        description={loadError ?? 'O código pode estar incorreto ou a lista pode ter expirado.'}
      />
    );
  }

  const goNext = () => setStep((s) => (s === 1 ? 2 : s === 2 ? 3 : 3));

  const goBack = () => {
    setSubmitError(null);
    setStep((s) => (s === 2 ? 1 : s === 3 ? 2 : 1));
  };

  const handleSelect = (id: string, imgIndex?: number) => {
    setSelectedItemId(id);
    setSubmitError(null);

    if (typeof imgIndex === 'number') {
      setSelectedImgIndex(imgIndex);
    }

    if (typeof window !== 'undefined') {
      if (!id) {
        localStorage.removeItem(storageKey(shareCode));
        return;
      }

      const prev = safeParse<any>(localStorage.getItem(storageKey(shareCode)));
      const next = {
        ...(prev || {}),
        itemId: id,
        ...(typeof imgIndex === 'number' ? { imgIndex } : {}),
      };

      localStorage.setItem(storageKey(shareCode), JSON.stringify(next));
    }
  };

  const confirmChoice = async () => {
    if (!selectedItemId || submitting) return;
    setSubmitError(null);
    setStep(3);
  };

  const finalizeChoice = async (payload: ThirdStepConfirmPayload) => {
    if (!selectedItemId) {
      setSubmitError('Selecione um presente para continuar.');
      setStep(2);
      return;
    }

    if (submitting || successOpen) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res: any = await selectGiftListItem(shareCode, selectedItemId, payload);

      if (!res?.id) {
        throw new Error('A API não confirmou a seleção do presente.');
      }

      if (typeof window !== 'undefined') {
        const prev = safeParse<any>(localStorage.getItem(storageKey(shareCode)));
        const next = {
          ...(prev || {}),
          itemId: selectedItemId,
          address: payload,
          imgIndex: selectedImgIndex,
        };
        localStorage.setItem(storageKey(shareCode), JSON.stringify(next));
      }

      setSuccessOpen(true);
    } catch (err: any) {
      setSubmitError(err?.message || 'Não foi possível finalizar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const goHome = () => {
    setSuccessOpen(false);
    router.push('/');
  };

  if (step === 1) {
    return (
      <FirstStep
        senderName={senderName}
        recipientName={recipientName}
        itemsCount={itemsRaw.length || 6}
        onNext={goNext}
      />
    );
  }

  if (step === 2) {
    return mode === 'tips' ? (
      <SecondStep
        mode="tips"
        items={tipItems}
        selectedProductId={selectedItemId}
        onSelect={(id: string, index: number) => handleSelect(id, index)}
        onBack={goBack}
        onConfirm={confirmChoice}
        submitting={submitting}
        submitError={submitError}
      />
    ) : (
      <SecondStep
        mode="details"
        products={productsForDetails}
        selectedProductId={selectedItemId}
        onSelect={(id: string) => handleSelect(id)}
        onBack={goBack}
        onConfirm={confirmChoice}
        submitting={submitting}
        submitError={submitError}
      />
    );
  }

  return (
    <>
      <ThirdStep
        currentStep={3}
        totalSteps={3}
        hintText={selectedHintText}
        selectedPreview={selectedPreview}
        onBack={goBack}
        onConfirm={finalizeChoice}
        submitting={submitting}
        submitError={submitError}
      />

      <SuccessModal
        open={successOpen}
        onPrimaryClick={goHome}
        title="Parabéns! 🎉"
        description="Sua escolha foi registrada com sucesso. Agora é só aguardar!"
        primaryText="Ir para a Home"
      />
    </>
  );
}
