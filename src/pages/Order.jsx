import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Check, Info, MessageCircle, Search, ShoppingBag } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import FormField from '../components/FormField';
import useMenu from '../hooks/useMenu';
import useDebounce from '../hooks/useDebounce';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';
import { isBackendConnected } from '../services/supabaseClient';
import { formatPrice } from '../utils/pricing';
import { hasErrors, validAddress, validName, validPhone } from '../utils/validation';
import { buildOrderMessage } from '../utils/orderMessage';
import { siteConfig, whatsappLink } from '../data/siteConfig';

const empty = { name: '', phone: '', address: '', notes: '' };

export default function Order() {
  useDocumentMeta('Order Online', `Order your favourite dishes from ${siteConfig.name} for delivery or takeaway.`);
  const { loading, categories, items: menu } = useMenu();
  const { items, totals, clearCart } = useCart();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const q = useDebounce(query.trim().toLowerCase());

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [payment] = useState('cod');
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [submitError, setSubmitError] = useState('');
  const [placed, setPlaced] = useState(null); // { reference, persisted, message }

  const list = useMemo(
    () => menu.filter((i) => (category === 'all' || i.category === category) && (!q || `${i.name} ${i.desc}`.toLowerCase().includes(q))),
    [menu, category, q],
  );

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }));
  };

  const validate = () => ({ name: validName(form.name), phone: validPhone(form.phone), address: validAddress(form.address) });

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (hasErrors(errs)) {
      document.getElementById(Object.keys(errs).find((k) => errs[k]))?.focus();
      return;
    }
    if (items.length === 0) return;
    setStatus('sending');
    setSubmitError('');
    const snapshot = { customer: { ...form, name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() }, items, totals };
    const res = await submitOrder({ ...snapshot, paymentMethod: payment });
    if (!res.ok) {
      setStatus('error');
      setSubmitError('We could not place your order. Please try again or order via WhatsApp.');
      return;
    }
    setPlaced({ reference: res.reference, persisted: res.persisted, message: buildOrderMessage({ ...snapshot, reference: res.reference }), total: totals.total });
    clearCart();
    setForm(empty);
    setStatus('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (placed) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="form-card success-panel">
            <div className="tick"><Check size={34} /></div>
            <h2>{placed.persisted ? 'Order received' : 'Demo order recorded locally'}</h2>
            <span className="ref">Ref: {placed.reference}</span>
            <p>Order total: <strong>{formatPrice(placed.total)}</strong> · Cash on Delivery</p>
            {placed.persisted ? (
              <p>Thank you! Our team will call you shortly to confirm your order and delivery time.</p>
            ) : (
              <div className="alert info" style={{ textAlign: 'left' }}>
                <Info size={18} aria-hidden="true" />
                <span><strong>This is a demo.</strong> The website isn’t connected to a database yet, so this order has <u>not</u> been sent to the café. To actually place it, send it by WhatsApp below or call us.</span>
              </div>
            )}
            <div className="contact-actions" style={{ justifyContent: 'center' }}>
              <a className="btn btn-whatsapp" href={whatsappLink(placed.message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /> Send order on WhatsApp</a>
              <Link to="/menu" className="btn btn-outline">Back to Menu</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Order online</span>
          <h1>Hungry? We’ve Got You.</h1>
          <p>Add your favourites, review your cart and check out in a minute.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container order-layout">
          <div className="menu-col">
            <div className="search-box" style={{ margin: '0 0 14px', maxWidth: 'none' }}>
              <Search size={18} aria-hidden="true" />
              <label htmlFor="order-search" className="sr-only">Search dishes</label>
              <input id="order-search" type="search" placeholder="Search dishes…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="chip-row" style={{ marginBottom: 20 }} role="group" aria-label="Categories">
              <button className={`chip ${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')} aria-pressed={category === 'all'}>All</button>
              {categories.map((c) => (
                <button key={c.id} className={`chip ${category === c.id ? 'active' : ''}`} onClick={() => setCategory(c.id)} aria-pressed={category === c.id}>{c.name}</button>
              ))}
            </div>
            {loading ? <LoadingState label="Loading menu…" /> : list.length === 0 ? (
              <EmptyState title="No dishes found" text="Try another search or category." actionLabel="Reset" onAction={() => { setQuery(''); setCategory('all'); }} />
            ) : (
              <div className="food-grid">{list.map((it) => <FoodCard key={it.id} item={it} />)}</div>
            )}
          </div>

          <aside className="cart-col" aria-label="Your cart">
            <div className="cart-panel">
              <h2>Your Cart <small style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--grey)' }}>{totals.count} item{totals.count === 1 ? '' : 's'}</small></h2>

              {items.length === 0 ? (
                <EmptyState icon={<ShoppingBag size={34} />} title="Your cart is empty" text="Add a few dishes from the menu to get started." />
              ) : (
                <>
                  <ul className="cart-list">{items.map((i) => <CartItem key={i.id} item={i} />)}</ul>
                  <button className="link-btn" onClick={clearCart} style={{ marginTop: 10 }}>Clear cart</button>

                  <div className="totals" aria-live="polite">
                    <div><span>Subtotal</span><span>{formatPrice(totals.subtotal)}</span></div>
                    <div><span>Delivery</span><span>{totals.delivery ? formatPrice(totals.delivery) : 'Free'}</span></div>
                    <div><span>GST ({Math.round(siteConfig.taxRate * 100)}%)</span><span>{formatPrice(totals.tax)}</span></div>
                    <div className="grand"><span>Total</span><span>{formatPrice(totals.total)}</span></div>
                  </div>
                  <p className={`free-ship ${totals.freeDeliveryGap === 0 ? 'ok' : ''}`}>
                    {totals.freeDeliveryGap === 0 ? 'You’ve unlocked free delivery!' : `Add ${formatPrice(totals.freeDeliveryGap)} more for free delivery.`}
                  </p>

                  <h3 className="checkout-title">Checkout</h3>
                  {!isBackendConnected && (
                    <div className="alert info"><Info size={18} aria-hidden="true" /><span>Demo mode: orders are not stored or sent to the café until a backend is connected. You can send the order via WhatsApp after checkout.</span></div>
                  )}
                  {submitError && <div className="alert error" role="alert"><AlertCircle size={18} aria-hidden="true" /><span>{submitError}</span></div>}

                  <form onSubmit={onSubmit} noValidate>
                    <FormField id="name" label="Full name" required error={errors.name}>
                      <input id="name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                    </FormField>
                    <FormField id="phone" label="Phone number" required error={errors.phone} hint="10-digit mobile number">
                      <input id="phone" type="tel" inputMode="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                    </FormField>
                    <FormField id="address" label="Delivery address" required error={errors.address}>
                      <textarea id="address" rows={3} value={form.address} onChange={set('address')} autoComplete="street-address" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'address-error' : undefined} />
                    </FormField>
                    <FormField id="notes" label="Order notes (optional)">
                      <textarea id="notes" rows={2} value={form.notes} onChange={set('notes')} placeholder="Less spicy, ring the bell, etc." />
                    </FormField>

                    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                      <legend style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Payment method</legend>
                      <div className="radio-group">
                        <label className="radio-card">
                          <input type="radio" name="payment" value="cod" checked={payment === 'cod'} readOnly />
                          <span>Cash on Delivery<small>Pay when your order arrives</small></span>
                        </label>
                        <label className="radio-card" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                          <input type="radio" name="payment" value="online" disabled />
                          <span>Pay online (coming soon)<small>Placeholder: no payment gateway is connected yet</small></span>
                        </label>
                      </div>
                    </fieldset>

                    <button className="btn btn-primary btn-block" type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Placing order…' : `Place Order · ${formatPrice(totals.total)}`}
                    </button>
                  </form>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
