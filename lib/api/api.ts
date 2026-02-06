import { API_PROXY_PREFIX } from './config';

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
  raw?: any;
}

/**
 * Unwraps Frappe API response structure
 * Frappe often returns: { message: { data: ... } } or { message: ... }
 */
export function unwrapFrappeMessage(raw: any): any {
  if (raw?.message?.data !== undefined) {
    return raw.message.data;
  }
  if (raw?.message !== undefined) {
    return raw.message;
  }
  return raw;
}

/**
 * Safe fetch wrapper that normalizes Frappe responses
 */
export async function fetchJson<T = any>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_PROXY_PREFIX}${path}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        raw: null,
      };
    }

    const raw = await response.json();
    const data = unwrapFrappeMessage(raw);

    return {
      ok: true,
      data,
      raw,
    };
  } catch (err: any) {
    return {
      ok: false,
      error: err.message || 'Network error',
      raw: null,
    };
  }
}
