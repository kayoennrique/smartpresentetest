export const PRICE_OPTIONS = [
  { id: "rq-250", label: "Até R$ 250" },
  { id: "rq-251_500", label: "R$ 251 a R$ 500" },
  { id: "rq-501_1000", label: "R$ 501 a R$ 1.000" },
  { id: "rq-1001_1500", label: "R$ 1.001 a R$ 1.500" },
  { id: "rq-1501_2000", label: "R$ 1.501 a R$ 2.000" },
] as const;

export type PriceOptionId = (typeof PRICE_OPTIONS)[number]["id"];
