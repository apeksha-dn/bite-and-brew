import { formatPrice } from './pricing';
import { siteConfig } from '../data/siteConfig';

// Builds a plain-text order summary. Used for the "Send via WhatsApp" fallback,
// which is a real, working way to place an order without any backend.
export function buildOrderMessage({ customer, items, totals, reference }) {
  const lines = items.map((i) => `• ${i.qty} × ${i.name} — ${formatPrice(i.price * i.qty)}`);
  return [
    `New order for ${siteConfig.name}${reference ? ` (ref ${reference})` : ''}`,
    '',
    ...lines,
    '',
    `Subtotal: ${formatPrice(totals.subtotal)}`,
    `Delivery: ${totals.delivery ? formatPrice(totals.delivery) : 'Free'}`,
    `GST (${Math.round(siteConfig.taxRate * 100)}%): ${formatPrice(totals.tax)}`,
    `Total: ${formatPrice(totals.total)}`,
    '',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address}`,
    customer.notes ? `Notes: ${customer.notes}` : '',
    'Payment: Cash on Delivery',
  ].filter((l) => l !== undefined).join('\n');
}
