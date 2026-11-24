# Bite & Brew — Café Website

A multi-page, responsive café website built with React + Vite. Café name, contact details, hours, fees and social links are all configurable in one file.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

Requires Node 18+ (built and tested on Node 22).

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/menu` | Menu (9 categories, search, veg/non-veg filter) |
| `/about` | About |
| `/gallery` | Gallery with lightbox |
| `/order` | Order online (cart + checkout) |
| `/reservations` | Table reservations |
| `/contact` | Contact |

## Changing the café details

Edit **`src/data/siteConfig.js`**: name, tagline, phone, email, WhatsApp number, address, opening hours, reservation slots, delivery fee, free-delivery threshold, GST rate, offers, social links and the Google Maps embed URL. Several values can also be set with `VITE_*` variables (see `.env.example`).

- **Menu:** `src/data/menu.js`
- **Photos:** `src/data/images.js` (swap URLs for files in `public/images/`)
- **Testimonials, team, gallery:** `src/data/content.js`
- **Colours/typography:** CSS variables at the top of `src/styles/global.css`

## Project structure

```
src/
  components/   Navbar, Footer, AnnouncementBar, HeroSection, FoodCard, CategoryCard,
                SectionHeading, TestimonialCard, CartItem, Newsletter, LoadingState,
                EmptyState, ScrollToTop, ...
  pages/        Home, Menu, About, Gallery, Order, Reservations, Contact, NotFound
  context/      CartContext (reducer + localStorage)
  hooks/        useMenu, useDebounce, useDocumentMeta, useLocalStorage
  data/         siteConfig, menu, images, content
  services/     supabaseClient, api (orders, reservations, messages, newsletter), menuService
  utils/        pricing, validation, orderMessage
supabase/schema.sql
```

## Backend (Supabase) setup

Without credentials the site runs in **demo mode**: nothing is stored, and every confirmation screen says so.

1. Create a project at supabase.com.
2. Open **SQL Editor** and run `supabase/schema.sql`. It creates menu, customers, orders, order items, reservations, contact messages and newsletter tables with Row Level Security (public site can only *insert* orders/reservations/messages and *read* the menu).
3. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Project Settings → API).
4. Restart `npm run dev`.
5. (Optional) Seed the `menu_categories` / `menu_items` tables from `src/data/menu.js` so the menu is editable in the dashboard. Until then the site uses the local menu file.

Before building an admin dashboard, restrict the "staff" policies in the schema to specific admin accounts (see the comment in `schema.sql`).

## Features: working now vs. needs external setup

**Working now (no setup)**
- All 7 routes, mobile hamburger nav, page titles and meta descriptions
- Menu filtering by category, search, veg/non-veg; bestseller badges
- Cart: add, remove, quantity, subtotal, delivery fee, GST, total; persisted in localStorage
- Checkout, reservation, contact and newsletter forms with validation
- Gallery lightbox (click, arrows, Esc)
- WhatsApp links (including a "send order on WhatsApp" fallback that really places an order via chat)
- Lazy-loaded images with graceful fallback

**Needs external setup**
- Saving orders, reservations, messages, subscribers → Supabase (above)
- Online payments → a payment gateway (e.g. Razorpay) and a server to create/verify payments. The UI shows "Pay online (coming soon)" as a disabled placeholder.
- Order status updates, admin dashboard, menu management → not built; the schema is ready for them
- Email/SMS confirmations → needs an email/SMS provider (e.g. Supabase Edge Function + Resend)
- Live map → paste the Google Maps embed URL into `mapEmbedUrl`
- Real content → café name, address, phone, WhatsApp, social handles, photos, testimonials and team are placeholders

## Deployment

Any static host works (Netlify, Vercel, Cloudflare Pages). SPA rewrites are included (`public/_redirects` for Netlify, `vercel.json` for Vercel).
