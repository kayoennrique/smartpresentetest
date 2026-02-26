'use client';

import { GiftCardFormProps } from './types';

function signatureIndentPx(name: string) {
  // Ajuste fino: letras cursivas com “rabisco” inicial maior costumam precisar de mais recuo.
  const first = (name || '').trim().charAt(0).toUpperCase();

  if (['A', 'K', 'J', 'T', 'Z'].includes(first)) return 12;
  return 10;
}

export default function GiftCardForm(props: GiftCardFormProps) {
  const { fromName, toName } = props;
  const isReadOnly = props.readOnly === true;

  const fromIndent = signatureIndentPx(fromName);
  const toIndent = signatureIndentPx(toName);

  return (
    <div className="w-full mb-6">
      <div className="rounded-xl shadow-lg bg-gradient-to-br from-[#FF6B6B] to-[#C92A2A]">
        <div className="rounded-xl p-6 overflow-visible">
          <div className="space-y-6">
            {/* DE */}
            <div>
              <label className="text-white text-sm font-medium block mb-2">De:</label>

              {isReadOnly ? (
                <div className="w-full border-b border-white/30">
                  <span
                    className="inline-block text-white font-parisienne text-[32px] leading-[1.6] "
                    style={{ textIndent: `${fromIndent}px` }}
                  >
                    {fromName}
                  </span>
                </div>
              ) : (
                <input
                  type="text"
                  value={fromName}
                  onChange={(e) => props.onChangeFromName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50
                    focus:outline-none focus:border-white  font-parisienne text-[24px] leading-[1.6]"
                  style={{ textIndent: `${fromIndent}px` }}
                />
              )}
            </div>

            {/* PARA */}
            <div>
              <label className="text-white text-sm font-medium block mb-2">Para:</label>

              {isReadOnly ? (
                <div className="w-full border-b border-white/30">
                  <span
                    className="inline-block text-white font-parisienne text-[32px] leading-[1.6] "
                    style={{ textIndent: `${toIndent}px` }}
                  >
                    {toName}
                  </span>
                </div>
              ) : (
                <input
                  type="text"
                  value={toName}
                  onChange={(e) => props.onChangeToName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50
                    focus:outline-none focus:border-white  font-parisienne text-[24px] leading-[1.6]"
                  style={{ textIndent: `${toIndent}px` }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
