import { fetchJson } from '../api';

export interface Product {
  name: string;
  code: string;
  title: string;
  price: number;
  image: string;
  type: 'item' | 'package';
  description?: string;
  items?: Product[];
}

/**
 * Fetches all products
 */
export async function getProducts() {
  return fetchJson<Product[]>("/method/degaan_shop.degaan_shop.api.api.products");
}

/**
 * Fetches product detail by code
 */
export async function getProductDetail(code: string) {
  return fetchJson<Product>(`/method/degaan_shop.degaan_shop.api.api.product_detail?code=${encodeURIComponent(code)}`);
}
