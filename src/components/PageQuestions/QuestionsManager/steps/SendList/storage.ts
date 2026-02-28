import type { ItemPayload } from "./interface";

export const ITEMS_KEY = "gift-list-items";

export function saveItems(items: ItemPayload[]) {
  if (typeof window === "undefined") {return;}
  localStorage.setItem(ITEMS_KEY, JSON.stringify({ items }));
}
