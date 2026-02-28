export function getFirstQuestionAnswer(): string | null {
  if (typeof window === "undefined") {return null;}

  const stored = localStorage.getItem("survey-answers");
  if (!stored) {return null;}

  try {
    const data = JSON.parse(stored);
    return data["rq-tipo_presenteado"] ?? null;
  } catch {
    return null;
  }
}

export function mapPersonToTipKey(value: string | null) {
  if (!value) {return "pessoa_qualquer";}

  const map: Record<string, string> = {
    NAMORADO: "namorado",
    NAMORADA: "namorada",
    MARIDO: "esposo",
    ESPOSO: "esposo",
    ESPOSA: "esposa",
    AMIGO: "amigo",
    AMIGA: "amiga",
    PAI: "pai",
    MAE: "mae",
    FILHO: "filho",
    FILHA: "filha",
    SOGRO: "sogro",
    SOGRA: "sogra",
    OUTRA: "pessoa_qualquer",
  };

  return map[value] ?? "pessoa_qualquer";
}
