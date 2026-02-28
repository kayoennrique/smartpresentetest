'use client';





import PlatformContactModal from '@/components/GeneralComponents/Modals/PlatformContactModal/PlatformContactModal';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';


import { PatternFormat } from 'react-number-format';
import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import LoginModal from '@/components/GeneralComponents/Modals/LoginModal/LoginModal';
import RegisterModal from '@/components/GeneralComponents/Modals/RegisteModal/RegisterModal';
import TokenModal from '@/components/GeneralComponents/Modals/TokenModal/TokenModal';
import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import PreviewModal from '@/components/PageQuestions/PreviewModal/PreviewModal';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';
import { api } from '@/services/api';
import type { ApiError } from '@/types/lists';
import { normalizePhoneToE164 } from '@/utils/phone';

import type { HeaderPayload, ItemPayload, WhatsappQuestionProps } from './interface';

const ENDPOINT = '/buyer/gift-lists';

const HEADER_KEY = 'gift-list-header';
const ITEMS_KEY = 'gift-list-items';
const GIFT_LIST_META_KEY = 'gift-list-meta';

const SURVEY_KEY = 'survey-answers';
const LEGACY_KEYS_TO_REMOVE = ['rq-de', 'rq-para', 'rq-lista_presente'];

function getAuthToken(): string | null {
  if (typeof window === 'undefined') {return null;}
  return localStorage.getItem('acess_token') || localStorage.getItem('access_token');
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) {return null;}
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

type ItemsPayload = { items: ItemPayload[] };

function normalizeItemsForApi(items: ItemPayload[]): Array<Record<string, any>> {
  return (items || [])
    .filter((it) => it && typeof it.productId === 'string' && it.productId.trim())
    .map((it) => {
      const hint = typeof it.giftHintMessage === 'string' ? it.giftHintMessage.trim() : '';
      const base: Record<string, any> = { productId: it.productId };

      if (hint.length > 0) {base.giftHintMessage = hint;}
      if (it.giftHintSource) {base.giftHintSource = it.giftHintSource;}

      return base;
    });
}

function clearDraftGiftList() {
  if (typeof window === 'undefined') {return;}
  localStorage.removeItem(HEADER_KEY);
  localStorage.removeItem(ITEMS_KEY);
}

function clearGiftListMeta() {
  if (typeof window === 'undefined') {return;}
  localStorage.removeItem(GIFT_LIST_META_KEY);
}

function clearLegacyFromSurveyAnswers() {
  if (typeof window === 'undefined') {return;}

  const current = safeParse<Record<string, any>>(localStorage.getItem(SURVEY_KEY)) || {};
  let changed = false;

  for (const k of LEGACY_KEYS_TO_REMOVE) {
    if (k in current) {
      delete current[k];
      changed = true;
    }
  }

  if (!changed) {return;}

  if (Object.keys(current).length > 0) {
    localStorage.setItem(SURVEY_KEY, JSON.stringify(current));
  } else {
    localStorage.removeItem(SURVEY_KEY);
  }
}

export default function WhatsappQuestion({
  onBack,
  currentStep = 10,
  totalSteps = 10,
  products,
  onFinishCleanup,
}: WhatsappQuestionProps) {
  const [contactByClient, setContactByClient] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [tips, setTips] = useState<Record<string, string>>({});

  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientPhoneError, setRecipientPhoneError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const [tokenOpen, setTokenOpen] = useState(false);
  const [platformContactOpen, setPlatformContactOpen] = useState(false);

  const [shareCode, setShareCode] = useState('');
  const [pendingSend, setPendingSend] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    const itensNotParsed = localStorage.getItem(ITEMS_KEY);
    if (!itensNotParsed) {return;}

    const itensParsed = safeParse<{ items: ItemPayload[] }>(itensNotParsed);
    if (!itensParsed?.items?.length) {return;}

    const restoredTips: Record<string, string> = {};
    for (const item of itensParsed.items) {
      restoredTips[item.productId] = item.giftHintMessage ?? '';
    }

    setTips((prev) => ({ ...prev, ...restoredTips }));
  }, [products]);

  const handleFinishCleanup = () => {
    clearDraftGiftList();
    clearGiftListMeta();

    clearLegacyFromSurveyAnswers();

    onFinishCleanup?.();
  };

  const createListAndOpenToken = async () => {
    const phoneRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
    if (!phoneRegex.test(recipientPhone) && !contactByClient) {
      setRecipientPhoneError(true);
      return;
    }

    setRecipientPhoneError(false);
    setLoading(true);
    setSubmitError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        setPendingSend(true);
        setLoginOpen(true);
        return;
      }

      const header = safeParse<HeaderPayload>(localStorage.getItem(HEADER_KEY)) || null;
      const itemsData = safeParse<ItemsPayload>(localStorage.getItem(ITEMS_KEY)) || null;

      if (!header?.senderName || !header?.recipientName) {
        throw new Error("Faltou 'De' ou 'Para'. Volte um passo e preencha.");
      }

      if (!itemsData?.items?.length) {
        throw new Error('Items não encontrados. Volte no SendList e preencha as dicas.');
      }

      const normalizedItems = normalizeItemsForApi(itemsData.items);
      if (!normalizedItems.length) {
        throw new Error('Items inválidos. Verifique os produtos gerados.');
      }

      const payload = {
        senderName: header.senderName,
        recipientName: header.recipientName,
        recipientPhone: normalizePhoneToE164(recipientPhone),
        hideGifts: Boolean(header.hideGifts),
        contactResponsible: contactByClient ? 'CLIENT' : 'PLATFORM',
        items: normalizedItems,
      };

      const { data: created } = await api.post(ENDPOINT, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const code = String((created as any)?.shareCode ?? '');

      clearDraftGiftList();

      localStorage.setItem(
        GIFT_LIST_META_KEY,
        JSON.stringify({
          recipientPhone,
          giftListId: (created as any)?.id,
          shareCode: code,
          expiresAt: (created as any)?.expiresAt,
        }),
      );

      setShareCode(code);

      if (contactByClient) {setTokenOpen(true);}
      else {setPlatformContactOpen(true);}
    } catch (e: any) {
      const apiErr = e as ApiError;
      setSubmitError(apiErr?.message || e?.message || 'Erro ao enviar.');
    } finally {
      setLoading(false);
      setPendingSend(false);
    }
  };

  const handleNext = async () => {
    if (loading) {return;}

    const token = getAuthToken();
    if (!token) {
      setPendingSend(true);
      setLoginOpen(true);
      return;
    }

    await createListAndOpenToken();
  };

  const nextDisabled = loading || contactByClient;

  return (
    <>
      <QuestionsHeader variant="light">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <QuestionsTitle
          title="Escolha como o presenteado receberá a lista de presentes"
          variant="light"
          className="w-full"
        />
        <div className=" flex flex-col">
          <p className="text-sm text-gray-500 mb-4 text-left" />

          <label className="flex items-center gap-2 text-xs text-gray-500 mb-4 -mt-2">
            <input
              type="checkbox"
              checked={contactByClient}
              onChange={(e) => {
                setSubmitError(null);
                setContactByClient(e.target.checked);
              }}
              className="accent-green-600"
            />
            Entrarei em contato para informar o token (identificador) de acesso à lista de presentes
            no site: smartpresente.com.br
          </label>

          {!contactByClient && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-2 -mt-2">
                Informe o celular do presenteado para que a plataforma envie o link e o token
                (identificador) de acesso de forma simples e segura.
                <span className="block mt-2 text-xs text-gray-500 mb-4">
                  O número será utilizado exclusivamente para o envio do acesso à lista de
                  presentes.
                </span>
              </label>

              <PatternFormat
                format="(##) #####-####"
                type="tel"
                placeholder="(00) 00000-0000"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                className="w-full rounded-xl border-2 px-4 py-3 text-sm "
              />

              {recipientPhoneError && (
                <p className="text-xs text-red-500 mt-1">
                  Informe o celular com DDD (ex: 21 9xxxx-xxxx)
                </p>
              )}
            </div>
          )}

          {contactByClient && (
            <div className="mb-3">
              <SurveyActions
                variant="primary"
                onClick={handleNext}
                disabled={loading}
                className={`flex-1 py-3 px-3 rounded-xl font-medium transition-all duration-200 flex 
                                items-center justify-center gap-2
                                ${loading ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-90'} bg-red-gradient text-white`}
              >
                {loading ? 'Enviando...' : 'Obter token'}
                <Icon
                  icon={loading ? 'svg-spinners:ring-resize' : 'ph:arrow-circle-right-light'}
                  width={22}
                />
              </SurveyActions>
            </div>
          )}

          {submitError && <p className="text-sm text-red-600 mb-3">{submitError}</p>}

          {!contactByClient ? (
            <div className="w-full flex justify-center mb-6">
              <Image
                src="/group08.png"
                alt="Prévia de mensagem no WhatsApp"
                width={320}
                height={420}
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="mb-2" />
          )}

          <div className="w-full h-px bg-[#CED4DA] mb-4" />

          <SurveyActions
            variant="primary"
            onBack={onBack}
            onNext={handleNext}
            nextDisabled={nextDisabled}
            nextLabel={loading ? 'Enviando...' : 'Enviar lista'}
          />
        </div>
      </QuestionsHeader>

      <LoginModal
        open={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          setPendingSend(false);
        }}
        onOpenRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
        onLoginSuccess={() => {
          setLoginOpen(false);
          if (pendingSend) {createListAndOpenToken();}
        }}
      />

      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onOpenLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

      <TokenModal
        setIsPreviewOpen={() => setIsPreviewOpen(true)}
        open={tokenOpen}
        token={shareCode}
        onClose={() => {
          setTokenOpen(false);
          handleFinishCleanup();
        }}
      />

      <PlatformContactModal
        setIsPreviewOpen={() => setIsPreviewOpen(true)}
        open={platformContactOpen}
        onClose={() => {
          setPlatformContactOpen(false);
          handleFinishCleanup();
        }}
      />

      {isPreviewOpen && (
        <PreviewModal onClose={() => setIsPreviewOpen(false)} products={products} tips={tips} />
      )}
    </>
  );
}
