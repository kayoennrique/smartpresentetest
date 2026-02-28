'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';

import SurveyActions from '@/components/GeneralComponents/ActionBtn/ActionBtn';
import ProgressBar from '@/components/GeneralComponents/ProgressBar/ProgressBar';
import QuestionsHeader from '@/components/PageQuestions/QuestionsHeader/QuestionsHeader';
import QuestionsTitle from '@/components/PageQuestions/QuestionsTitle/QuestionsTitle';

import type { ThirdStepConfirmPayload, ThirdStepProps } from './types';

function onlyDigits(v: string) {
  return (v || '').replace(/\D/g, '');
}

const UF_LIST = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const;

const schema = z.object({
  recipientAddressPostalCode: z
    .string()
    .transform((v) => onlyDigits(v))
    .refine((v) => v.length === 8, 'CEP deve conter exatamente 8 dígitos numéricos'),

  recipientAddressStreet: z.string().trim().min(2, 'Logradouro deve ter pelo menos 2 caracteres'),

  recipientAddressNumber: z
    .string()
    .trim()
    .min(1, 'Número é obrigatório')
    .max(10, 'Número deve ter no máximo 10 caracteres'),

  recipientAddressComplement: z
    .string()
    .trim()
    .max(20, 'Complemento deve ter no máximo 20 caracteres')
    .optional()
    .or(z.literal('')),

  recipientAddressNeighborhood: z.string().trim().min(2, 'Bairro deve ter pelo menos 2 caracteres'),

  recipientAddressCity: z.string().trim().min(2, 'Cidade deve ter pelo menos 2 caracteres'),

  recipientAddressState: z
    .string()
    .trim()
    .transform((v) => v.toUpperCase())
    .refine(
      (v) => (UF_LIST as readonly string[]).includes(v),
      'UF inválida. Use a sigla do estado, ex: SP, RJ, MG',
    ),

  recipientAddressCountry: z.string().trim().min(2, 'País inválido').default('Brasil'),
});

type FieldKey = keyof ThirdStepConfirmPayload;
type FormErrors = Partial<Record<FieldKey, string>>;

function cn(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ');
}

type ViaCepResponse = {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

export default function ThirdStep({
  currentStep = 3,
  totalSteps = 3,
  hintText = 'Aqui terá a dica que o presentador resolveu escrever para o presenteado.',
  selectedPreview = null,
  onBack,
  onConfirm,
  submitting = false,
  submitError = null,
}: ThirdStepProps) {
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [stateUF, setStateUF] = useState('');

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});

  const [cepLoading, setCepLoading] = useState(false);
  const [cepFetchError, setCepFetchError] = useState<string | null>(null);

  const refs = useRef<Partial<Record<FieldKey, HTMLDivElement | null>>>({});
  const lastCepFetchedRef = useRef<string>('');
  const cepCancelRef = useRef<AbortController | null>(null);

  const cardTitle = selectedPreview?.title || 'Dica';
  const cardSubtitle = selectedPreview?.subtitle || hintText;
  const cardImage = selectedPreview?.imageUrl || '/amarelo.png';
  const [imgSrc, setImgSrc] = useState(() => cardImage);

  useEffect(() => {
    setImgSrc(cardImage);
  }, [cardImage]);

  const rawPayload: ThirdStepConfirmPayload = useMemo(
    () => ({
      recipientAddressStreet: street,
      recipientAddressNumber: number,
      recipientAddressComplement: complement,
      recipientAddressNeighborhood: neighborhood,
      recipientAddressCity: city,
      recipientAddressState: stateUF,
      recipientAddressPostalCode: postalCode,
      recipientAddressCountry: 'Brasil',
    }),
    [street, number, complement, neighborhood, city, stateUF, postalCode],
  );

  function setRef(key: FieldKey) {
    return (el: HTMLDivElement | null) => {
      refs.current[key] = el;
    };
  }

  function scrollToField(key: FieldKey) {
    const el = refs.current[key];
    if (!el) {return;}
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function mapZodErrors(issues: z.ZodIssue[]): FormErrors {
    const next: FormErrors = {};
    for (const issue of issues) {
      const key = issue.path?.[0] as FieldKey | undefined;
      if (key && !next[key]) {next[key] = issue.message;}
    }
    return next;
  }

  function validateAll(showAllErrors = false): { ok: boolean; data?: ThirdStepConfirmPayload } {
    const parsed = schema.safeParse(rawPayload);

    if (!parsed.success) {
      const nextErrors = mapZodErrors(parsed.error.issues);
      setFieldErrors(nextErrors);

      if (showAllErrors) {
        const allTouched: Partial<Record<FieldKey, boolean>> = {};
        (Object.keys(nextErrors) as FieldKey[]).forEach((k) => (allTouched[k] = true));
        setTouched((prev) => ({ ...prev, ...allTouched }));
      }

      return { ok: false };
    }

    const data = parsed.data;
    const normalized: ThirdStepConfirmPayload = {
      ...data,
      recipientAddressComplement: data.recipientAddressComplement?.trim()
        ? data.recipientAddressComplement.trim()
        : undefined,
    };

    setFieldErrors({});
    return { ok: true, data: normalized };
  }

  function validateField(key: FieldKey) {
    const parsed = schema.safeParse(rawPayload);

    if (parsed.success) {
      setFieldErrors((prev) => {
        if (!prev[key]) {return prev;}
        const next = { ...prev };
        delete next[key];
        return next;
      });
      return;
    }

    const nextErrors = mapZodErrors(parsed.error.issues);

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (nextErrors[key]) {next[key] = nextErrors[key]!;}
      else {delete next[key];}
      return next;
    });
  }

  function markTouched(key: FieldKey) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    validateField(key);
  }

  function inputClass(hasError?: boolean) {
    return cn(
      'w-full h-11 rounded-xl border bg-white px-4 text-sm outline-none focus:ring-2',
      hasError ? 'border-red-400 focus:ring-red-200' : 'border-[#E9ECEF] focus:ring-[#71C19B]/30',
    );
  }

  function showError(key: FieldKey) {
    return Boolean(touched[key] && fieldErrors[key]);
  }

  async function fetchAddressByCep(cepDigits: string) {
    if (lastCepFetchedRef.current === cepDigits) {return;}

    setCepLoading(true);
    setCepFetchError(null);

    if (cepCancelRef.current) {cepCancelRef.current.abort();}
    const controller = new AbortController();
    cepCancelRef.current = controller;

    try {
      const { data } = await axios.get<ViaCepResponse>(
        `https://viacep.com.br/ws/${cepDigits}/json/`,
        { signal: controller.signal },
      );

      if (data?.erro) {
        setCepFetchError('CEP não encontrado. Verifique e tente novamente.');
        return;
      }

      lastCepFetchedRef.current = cepDigits;

      if (data.logradouro) {setStreet(data.logradouro);}
      if (data.bairro) {setNeighborhood(data.bairro);}
      if (data.localidade) {setCity(data.localidade);}
      if (data.uf) {setStateUF(data.uf);}

      validateField('recipientAddressStreet');
      validateField('recipientAddressNeighborhood');
      validateField('recipientAddressCity');
      validateField('recipientAddressState');
    } catch (err) {
      if (!axios.isCancel(err) && !(err instanceof DOMException && err.name === 'AbortError')) {
        setCepFetchError('Não foi possível consultar o CEP agora. Tente novamente.');
      }
    } finally {
      setCepLoading(false);
    }
  }

  useEffect(() => {
    const cepDigits = onlyDigits(postalCode);
    if (cepDigits.length !== 8) {
      setCepFetchError(null);
      setCepLoading(false);
      lastCepFetchedRef.current = '';
      if (cepCancelRef.current) {cepCancelRef.current.abort();}
      return;
    }

    const t = setTimeout(() => {
      fetchAddressByCep(cepDigits);
    }, 350);

    return () => clearTimeout(t);
  }, [postalCode]);

  const handleConfirm = () => {
    if (submitting) {return;}

    if (cepLoading) {
      setTouched((prev) => ({ ...prev, recipientAddressPostalCode: true }));
      setFieldErrors((prev) => ({
        ...prev,
        recipientAddressPostalCode: 'Aguarde a consulta do CEP finalizar',
      }));
      scrollToField('recipientAddressPostalCode');
      return;
    }

    const res = validateAll(true);

    if (!res.ok) {
      const parsed = schema.safeParse(rawPayload);
      if (!parsed.success) {
        const mapped = mapZodErrors(parsed.error.issues);
        const first =
          (Object.keys(mapped)[0] as FieldKey | undefined) ?? 'recipientAddressPostalCode';
        scrollToField(first);
      }
      return;
    }

    onConfirm(res.data!);
  };

  return (
    <>
      <QuestionsHeader />

      <div className="w-full max-w-3xl mt-4 mx-auto px-6">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <QuestionsTitle
          title="Informe o endereço de envio "
          subtitle="Nós repassaremos esse endereço para seu presenteado."
        />

        <div className="max-w-2xl -mt-6 mx-auto rounded-2xl bg-white p-5 border border-[#E9ECEF]">
          <div className="rounded-xl border bg-white p-3 flex items-center gap-4 border-[#71C19B]/40">
            <div className="relative h-16 w-16 shrink-0">
              <Image
                src={imgSrc}
                alt={cardTitle}
                fill
                className="object-contain"
                sizes="64px"
                onError={() => setImgSrc('/amarelo.png')}
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{cardTitle}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{cardSubtitle}</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div ref={setRef('recipientAddressPostalCode')}>
              <label className="block text-[13px] font-semibold text-gray-600 mb-2">CEP:</label>

              <div className="relative">
                <input
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    if (touched.recipientAddressPostalCode)
                      {validateField('recipientAddressPostalCode');}
                  }}
                  onBlur={() => markTouched('recipientAddressPostalCode')}
                  placeholder="01001-000"
                  inputMode="numeric"
                  className={cn(inputClass(showError('recipientAddressPostalCode')), 'pr-10')}
                />

                {cepLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#71C19B]" />
                  </div>
                )}
              </div>

              {cepFetchError && <p className="mt-1 text-xs text-red-600">{cepFetchError}</p>}

              {showError('recipientAddressPostalCode') && !cepFetchError && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.recipientAddressPostalCode}
                </p>
              )}
            </div>

            <div ref={setRef('recipientAddressStreet')}>
              <label className="block text-[13px] font-semibold text-gray-600 mb-2">
                Logradouro:
              </label>
              <input
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                  if (touched.recipientAddressStreet) {validateField('recipientAddressStreet');}
                }}
                onBlur={() => markTouched('recipientAddressStreet')}
                placeholder="Rua das Flores"
                className={inputClass(showError('recipientAddressStreet'))}
              />
              {showError('recipientAddressStreet') && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.recipientAddressStreet}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={setRef('recipientAddressNumber')}>
                <label className="block text-[13px] font-semibold text-gray-600 mb-2">
                  Número:
                </label>
                <input
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                    if (touched.recipientAddressNumber) {validateField('recipientAddressNumber');}
                  }}
                  onBlur={() => markTouched('recipientAddressNumber')}
                  placeholder="123"
                  inputMode="numeric"
                  className={inputClass(showError('recipientAddressNumber'))}
                />
                {showError('recipientAddressNumber') && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.recipientAddressNumber}</p>
                )}
              </div>

              <div ref={setRef('recipientAddressComplement')}>
                <label className="block text-[13px] font-semibold text-gray-600 mb-2">
                  Complemento: <span className="font-normal text-gray-400">(opcional)</span>
                </label>
                <input
                  value={complement}
                  onChange={(e) => {
                    setComplement(e.target.value);
                    if (touched.recipientAddressComplement)
                      {validateField('recipientAddressComplement');}
                  }}
                  onBlur={() => markTouched('recipientAddressComplement')}
                  placeholder="Apto 12B"
                  maxLength={20}
                  className={inputClass(showError('recipientAddressComplement'))}
                />
                {showError('recipientAddressComplement') && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.recipientAddressComplement}
                  </p>
                )}
              </div>
            </div>

            <div ref={setRef('recipientAddressNeighborhood')}>
              <label className="block text-[13px] font-semibold text-gray-600 mb-2">Bairro:</label>
              <input
                value={neighborhood}
                onChange={(e) => {
                  setNeighborhood(e.target.value);
                  if (touched.recipientAddressNeighborhood)
                    {validateField('recipientAddressNeighborhood');}
                }}
                onBlur={() => markTouched('recipientAddressNeighborhood')}
                placeholder="Centro"
                className={inputClass(showError('recipientAddressNeighborhood'))}
              />
              {showError('recipientAddressNeighborhood') && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.recipientAddressNeighborhood}
                </p>
              )}
            </div>

            <div ref={setRef('recipientAddressCity')}>
              <label className="block text-[13px] font-semibold text-gray-600 mb-2">Cidade:</label>
              <input
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (touched.recipientAddressCity) {validateField('recipientAddressCity');}
                }}
                onBlur={() => markTouched('recipientAddressCity')}
                placeholder="São Paulo"
                className={inputClass(showError('recipientAddressCity'))}
              />
              {showError('recipientAddressCity') && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.recipientAddressCity}</p>
              )}
            </div>

            <div ref={setRef('recipientAddressState')}>
              <label className="block text-[13px] font-semibold text-gray-600 mb-2">
                Estado (UF):
              </label>
              <input
                value={stateUF}
                onChange={(e) => {
                  setStateUF(e.target.value);
                  if (touched.recipientAddressState) {validateField('recipientAddressState');}
                }}
                onBlur={() => markTouched('recipientAddressState')}
                placeholder="SP"
                maxLength={2}
                className={cn(inputClass(showError('recipientAddressState')), 'uppercase')}
              />
              {showError('recipientAddressState') && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.recipientAddressState}</p>
              )}
            </div>

            {submitError && <p className="mt-4 text-sm text-red-600">{submitError}</p>}
          </div>
        </div>

        <div className="flex justify-center pb-8">
          <div className="w-full max-w-2xl">
            <div className="w-full h-px bg-[#CED4DA] my-6" />
            <SurveyActions
              onBack={onBack}
              onNext={handleConfirm}
              nextLabel={submitting ? 'Enviando...' : 'Finalizar'}
              nextDisabled={submitting || cepLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
