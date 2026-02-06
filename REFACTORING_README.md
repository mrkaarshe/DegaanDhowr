# API Refactoring & Route Restructure

This document outlines the refactoring changes made to improve code organization, remove hardcoded URLs, and restructure routes.

## Environment Configuration

### Setting API Base URL

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

**Note:** Do not include a trailing slash. The default value is `http://127.0.0.1:8000` if not set.

## API Service Layer

All API calls now go through a centralized service layer located in `lib/api/`:

### Configuration (`lib/api/config.ts`)
- `API_BASE_URL`: Base URL for Frappe backend (from env or default)
- `API_PROXY_PREFIX`: Proxy prefix `/api/external` for Next.js rewrites
- `ASSET_BASE_URL`: Base URL for images/assets

### HTTP Client (`lib/api/http.ts`)
- `fetchJson<T>(path, options)`: Safe fetch wrapper that:
  - Builds URLs via `${API_PROXY_PREFIX}${path}`
  - Normalizes Frappe responses (handles `{ message: { data: ... } }` structure)
  - Returns consistent shape: `{ ok: boolean, data?: T, error?: string, raw?: any }`
- `unwrapFrappeMessage(raw)`: Extracts data from Frappe response structure

### Services

#### Products Service (`lib/api/services/products.ts`)
- `getProducts()`: Fetches all products
- `getProductDetail(code)`: Fetches product detail by code

#### Orders Service (`lib/api/services/orders.ts`)
- `createOrderAndPay(payload)`: Creates order and processes payment

## New Route Structure

### Shop Routes
- **Products List**: `/shop/products` → `app/shop/products/page.tsx`
- **Product Detail**: `/shop/products/detail/[code]` → `app/shop/products/detail/[code]/page.jsx`
- **Checkout Payment**: `/shop/checkout/payment` → `app/shop/checkout/payment/page.jsx`
- **Order Confirmation**: `/shop/checkout/confirmation` → `app/shop/checkout/confirmation/page.jsx`

### Redirects (Old Routes)
The following old routes now redirect to new routes:
- `/products` → `/shop/products`
- `/shop/product/detail/[code]` → `/shop/products/detail/[code]`
- `/checkout` → `/shop/checkout/payment`
- `/Checkaut/payment` → `/shop/checkout/payment`
- `/confirmation` → `/shop/checkout/confirmation`
- `/Checkaut/confirmation` → `/shop/checkout/confirmation`

### Preserved Routes
- `/` (home)
- `/about`
- `/services`
- `/career`
- `/contact`
- `/cart`

## Checkout Flow

The checkout page (`/shop/checkout/payment`) now uses a **single form** (no multi-step) with:
- Payment method selection (Mobile Money or Card - card disabled but shown)
- Full name (required)
- Phone number (required)
- Region (default: Banadir)
- District (default: Hodan)
- "Pay Now" button

On successful payment:
- Cart is cleared
- Order info stored in localStorage
- Redirects to `/shop/checkout/confirmation`

## Next.js Configuration

The `next.config.mjs` rewrite proxy now uses the environment variable:

```javascript
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
// Rewrites to: ${API}/api/:path*
```

## Cleanup

### Removed Hardcoded URLs
- All instances of `http://192.168.8.11:8000/` removed
- All instances of `http://127.0.0.1:8000` (except in config files) removed
- All API calls now use the service layer

### Updated Links
- All product links now point to `/shop/products/detail/[code]`
- All checkout links point to `/shop/checkout/payment`
- All product list links point to `/shop/products`

## Migration Notes

1. **Update `.env.local`**: Set `NEXT_PUBLIC_API_BASE_URL` to your Frappe backend URL
2. **Update any custom components**: If you have custom components linking to old routes, update them
3. **Test checkout flow**: Verify the new single-form checkout works correctly
4. **Verify redirects**: Old routes should automatically redirect to new ones

## API Response Format

All service functions return:
```typescript
{
  ok: boolean;
  data?: T;        // Extracted/normalized data
  error?: string;  // Error message if ok === false
  raw?: any;       // Raw response from API
}
```

The HTTP client automatically unwraps Frappe's response structure:
- `{ message: { data: ... } }` → `data`
- `{ message: ... }` → `data`
- Otherwise → raw response
