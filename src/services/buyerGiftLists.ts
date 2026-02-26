import { api } from './api';

export async function getBuyerGiftLists(page = 1, limit = 10) {
  const res = await api.get('/buyer/gift-lists', {
    params: { page, limit },
  });
  return res.data;
}
