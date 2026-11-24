import { siteConfig } from '../data/siteConfig';

export const formatPrice = (n) =>
  `${siteConfig.currency}${Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(n) ? 0 : 2 })}`;

// Pure function so it is easy to test. Money is rounded to whole paise.
export function calculateTotals(items, cfg = siteConfig) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const delivery = subtotal === 0 ? 0 : subtotal >= cfg.freeDeliveryAbove ? 0 : cfg.deliveryFee;
  const tax = Math.round(subtotal * cfg.taxRate * 100) / 100;
  const total = Math.round((subtotal + delivery + tax) * 100) / 100;
  return { subtotal, delivery, tax, total, count, freeDeliveryGap: Math.max(0, cfg.freeDeliveryAbove - subtotal) };
}
