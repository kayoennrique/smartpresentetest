import { PriceOptionId } from "./priceOptions";

export const PRICE_MAP: Record<PriceOptionId, { min: string; max: string }> = {
  "rq-250": { min: "0.00", max: "250.00" },
  "rq-251_500": { min: "251.00", max: "500.00" },
  "rq-501_1000": { min: "501.00", max: "1000.00" },
  "rq-1001_1500": { min: "1001.00", max: "1500.00" },
  "rq-1501_2000": { min: "1501.00", max: "2000.00" },
};
