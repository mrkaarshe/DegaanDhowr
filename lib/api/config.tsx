export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://172.28.42.172:8000").replace(/\/$/, "");
export const API_PROXY_PREFIX = "/api/external"; // keep proxy
export const ASSET_BASE_URL = API_BASE_URL; // for images like `${ASSET_BASE_URL}${path}`
