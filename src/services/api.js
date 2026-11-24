import { supabase, isBackendConnected } from './supabaseClient';

const demoRef = (prefix) => `${prefix}-${Date.now().toString(36).toUpperCase().slice(-6)}`;

// Every submit function returns { ok, persisted, reference, error }.
//  persisted === true  -> the record really was written to Supabase.
//  persisted === false -> demo mode: nothing was stored. The UI must say so.

async function insert(table, row, prefix) {
  if (!isBackendConnected) {
    return { ok: true, persisted: false, reference: demoRef(prefix) };
  }
  const { error } = await supabase.from(table).insert(row);
  if (error) return { ok: false, persisted: false, error: error.message };
  return { ok: true, persisted: true, reference: row.id ? row.id.slice(0, 8).toUpperCase() : demoRef(prefix) };
}

export async function submitOrder({ customer, items, totals, paymentMethod }) {
  const id = crypto.randomUUID(); // generated client-side: anon users cannot read rows back
  const order = {
    id,
    customer_name: customer.name,
    phone: customer.phone,
    address: customer.address,
    notes: customer.notes || null,
    payment_method: paymentMethod,
    subtotal: totals.subtotal,
    delivery_fee: totals.delivery,
    tax: totals.tax,
    total: totals.total,
    status: 'pending',
  };
  const res = await insert('orders', order, 'ORD');
  if (!res.ok || !res.persisted) return res;
  const lines = items.map((i) => ({
    order_id: id,
    menu_item_id: i.id,
    name: i.name,
    unit_price: i.price,
    quantity: i.qty,
  }));
  const { error } = await supabase.from('order_items').insert(lines);
  if (error) return { ok: false, persisted: false, error: error.message };
  return res;
}

export const submitReservation = (r) =>
  insert(
    'reservations',
    {
      id: crypto.randomUUID(),
      customer_name: r.name,
      phone: r.phone,
      email: r.email,
      reservation_date: r.date,
      reservation_time: r.time,
      guests: Number(r.guests),
      special_requests: r.requests || null,
      status: 'pending',
    },
    'RSV',
  );

export const submitContactMessage = (m) =>
  insert('contact_messages', { id: crypto.randomUUID(), name: m.name, email: m.email, phone: m.phone || null, message: m.message }, 'MSG');

export const subscribeNewsletter = (email) =>
  insert('newsletter_subscribers', { id: crypto.randomUUID(), email }, 'NWS');
