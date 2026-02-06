import { fetchJson } from "../api";

/* ========= Request ========= */
export interface TrackDeliveryPayload {
  delivery_assignment_id: string;
  order_pin: string;
}

/* ========= Response ========= */
export interface DeliveryItem {
  item_code: string;
  item_name: string;
  qty: number;
  uom: string;
  price: number;
  amount: number;
  description?: string;
}

export interface DeliveryCustomer {
  name: string;
  customer_name: string;
  phone: string;
}

export interface DeliveryData {
  delivery_assignment_id: string;
  sales_order: string;
  order_status: string;
  district: string;
  region: string;
  customer: DeliveryCustomer;
  customer_message?: string | null;
  customer_number: string;
  delivery_person: string;
  delivery_number: string;
  delivery_message?: string | null;
  items: DeliveryItem[];
}

export interface TrackDeliveryResponse {
  message: {
    status: boolean;
    data: DeliveryData;
  };
}

/**
 * Track delivery assignment
 */
export async function getDeliveryAssignmentDetail(payload: TrackDeliveryPayload){
  return fetchJson(
    "/method/degaan_shop.degaan_shop.api.delivery.get_delivery_assignment_detail",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

