export type SeasonalProduct = {
  id: string;
  imageUrl?: string | null;
  active?: boolean;
  priority?: number;
};

export type SeasonalListResponse = {
  items: SeasonalProduct[];
};
