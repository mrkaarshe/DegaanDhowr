import { fetchJson } from '../api';

export interface OrderItem {
  item_code: string;
  qty: number;
  price: number;
}

export interface CreateOrderPayload {
  order: {
    customer_full_name: string;
    customer_phone: string;
    region: string;
    district: string;
    address?: string;
    items: OrderItem[];
    total: number;
    notes?: string;
  };
}

/**
 * Creates an order and processes payment
 */
export async function createOrderAndPay(payload: CreateOrderPayload) {
  return fetchJson("/method/degaan_shop.degaan_shop.api.order.create_order_and_pay", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
