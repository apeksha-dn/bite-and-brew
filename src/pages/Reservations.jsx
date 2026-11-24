import { useState } from 'react';
import { AlertCircle, CalendarCheck, Check, Clock, Info, MapPin, Phone } from 'lucide-react';
import FormField from '../components/FormField';
import SmartImage from '../components/SmartImage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { submitReservation } from '../services/api';
import { isBackendConnected } from '../services/supabaseClient';
import { fullAddress, siteConfig, telLink } from '../data/siteConfig';
import { formatTime12, hasErrors, todayISO, validEmail, validFutureDate, validName, validPhone } from '../utils/validation';

const initial = { name: '', phone: '', email: '', date: '', time: '', guests: '2', requests: '' };

export default function Reservations() {
  useDocumentMeta('Reserve a Table', `Reserve a table at ${siteConfig.name}. Choose your date, time and party size.`);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(null);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }));
  };

  const validate = () => ({
    name: validName(form.name),
    phone: validPhone(form.phone),
    email: validEmail(form.email),
    date: validFutureDate(form.date),
    time: form.time ? '' : 'Please choose a time',
    guests: Number(form.guests) >= 1 && Number(form.guests) <= siteConfig.maxGuests ? '' : `Guests must be 1–${siteConfig.maxGuests}`,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (hasErrors(errs)) {
      document.getElementById(Object.keys(errs).find((k) => errs[k]))?.focus();
      return;
    }
    setStatus('sending');
    setSubmitError('');
    const res = await submitReservation({ ...form, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() });
    setStatus('idle');
    if (!res.ok) {
      setSubmitError('We could not submit your request. Please try again or call us.');
      return;
    }
    setDone({ ...form, reference: res.reference, persisted: res.persisted });
    setForm(initial);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Reservations</span>
          <h1>Reserve Your Table</h1>
          <p>Celebrations, catch-ups or a quiet coffee. Tell us when you’re coming.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container two-col">
          <div className="form-card">
            {done ? (
              <div className="success-panel">
                <div className="tick"><Check size={34} /></div>
                <h2>{done.persisted ? 'Request received' : 'Demo confirmation'}</h2>
                <span className="ref">Ref: {done.reference}</span>
                <p><strong>{done.guests} guest{done.guests === '1' ? '' : 's'}</strong> · {new Date(`${done.date}T00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} · {formatTime12(done.time)}</p>
                {done.persisted ? (
                  <div className="alert info" style={{ textAlign: 'left' }}><Info size={18} aria-hidden="true" /><span><strong>Not yet confirmed.</strong> This is a booking request. We’ll confirm by phone or email shortly.</span></div>
                ) : (
                  <div className="alert info" style={{ textAlign: 'left' }}><Info size={18} aria-hidden="true" /><span><strong>This is a frontend demo, not a real booking.</strong> The site isn’t connected to a reservation system yet, so nothing was sent to the café. To reserve a table, please call us.</span></div>
                )}
                <div className="contact-actions" style={{ justifyContent: 'center' }}>
                  <a href={telLink} className="btn btn-primary"><Phone size={16} aria-hidden="true" /> Call {siteConfig.phone}</a>
                  <button className="btn btn-outline" onClick={() => setDone(null)}>Make another request</button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2>Booking Details</h2>
                {!isBackendConnected && (
                  <div className="alert info"><Info size={18} aria-hidden="true" /><span>Demo mode: requests aren’t stored or sent to the café until a backend is connected.</span></div>
                )}
                {submitError && <div className="alert error" role="alert"><AlertCircle size={18} aria-hidden="true" /><span>{submitError}</span></div>}
                <FormField id="name" label="Full name" required error={errors.name}>
                  <input id="name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                </FormField>
                <div className="form-row">
                  <FormField id="phone" label="Phone number" required error={errors.phone}>
                    <input id="phone" type="tel" inputMode="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                  </FormField>
                  <FormField id="email" label="Email" required error={errors.email}>
                    <input id="email" type="email" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                  </FormField>
                </div>
                <div className="form-row">
                  <FormField id="date" label="Date" required error={errors.date}>
                    <input id="date" type="date" min={todayISO()} value={form.date} onChange={set('date')} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'date-error' : undefined} />
                  </FormField>
                  <FormField id="time" label="Time" required error={errors.time}>
                    <select id="time" value={form.time} onChange={set('time')} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? 'time-error' : undefined}>
                      <option value="">Select a time</option>
                      {siteConfig.reservationSlots.map((t) => <option key={t} value={t}>{formatTime12(t)}</option>)}
                    </select>
                  </FormField>
                </div>
                <FormField id="guests" label="Number of guests" required error={errors.guests}>
                  <select id="guests" value={form.guests} onChange={set('guests')}>
                    {Array.from({ length: siteConfig.maxGuests }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
                  </select>
                </FormField>
                <FormField id="requests" label="Special requests (optional)">
                  <textarea id="requests" rows={3} value={form.requests} onChange={set('requests')} placeholder="Birthday, high chair, window seat…" />
                </FormField>
                <button className="btn btn-primary btn-block" type="submit" disabled={status === 'sending'}>
                  <CalendarCheck size={18} aria-hidden="true" /> {status === 'sending' ? 'Submitting…' : 'Request Reservation'}
                </button>
              </form>
            )}
          </div>

          <div className="side-stack">
            <div className="split-media"><SmartImage name="interior3" alt="Cosy table setting at the café" w={800} h={600} style={{ aspectRatio: '4 / 3' }} /></div>
            <div className="info-card">
              <h3>Good to Know</h3>
              <p className="info-line"><Clock size={18} aria-hidden="true" /><span>{siteConfig.hours.map((h) => `${h.days}: ${h.time}`).join(' · ')}</span></p>
              <p className="info-line"><MapPin size={18} aria-hidden="true" /><span>{fullAddress()}</span></p>
              <p className="info-line"><Phone size={18} aria-hidden="true" /><span>For parties above {siteConfig.maxGuests} guests, please call <a href={telLink}>{siteConfig.phone}</a>.</span></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
