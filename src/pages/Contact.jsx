import { useState } from 'react';
import { AlertCircle, Check, Clock, Info, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import FormField from '../components/FormField';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { FacebookIcon, InstagramIcon, XIcon } from '../components/SocialIcons';
import { submitContactMessage } from '../services/api';
import { isBackendConnected } from '../services/supabaseClient';
import { fullAddress, mailLink, siteConfig, telLink, whatsappLink } from '../data/siteConfig';
import { hasErrors, validEmail, validMessage, validName, validPhone } from '../utils/validation';

const initial = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  useDocumentMeta('Contact', `Get in touch with ${siteConfig.name}: phone, email, WhatsApp, address and opening hours.`);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(null);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = {
      name: validName(form.name),
      email: validEmail(form.email),
      phone: form.phone.trim() ? validPhone(form.phone) : '',
      message: validMessage(form.message),
    };
    setErrors(errs);
    if (hasErrors(errs)) {
      document.getElementById(Object.keys(errs).find((k) => errs[k]))?.focus();
      return;
    }
    setStatus('sending');
    setSubmitError('');
    const res = await submitContactMessage({ ...form, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), message: form.message.trim() });
    setStatus('idle');
    if (!res.ok) {
      setSubmitError('We could not send your message. Please try WhatsApp or call us.');
      return;
    }
    setDone({ persisted: res.persisted, text: form.message });
    setForm(initial);
  };

  const mapSrc = siteConfig.mapEmbedUrl;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapSearchQuery)}`;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>We’d Love to Hear From You</h1>
          <p>Questions, feedback or party bookings. Reach out any way you like.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container two-col">
          <div className="form-card">
            {done ? (
              <div className="success-panel">
                <div className="tick"><Check size={34} /></div>
                <h2>{done.persisted ? 'Message sent' : 'Demo: message not sent'}</h2>
                {done.persisted ? <p>Thanks for reaching out. We’ll reply as soon as we can.</p> : (
                  <div className="alert info" style={{ textAlign: 'left' }}><Info size={18} aria-hidden="true" /><span>The site isn’t connected to a backend yet, so this message was <strong>not delivered</strong>. Please reach us on WhatsApp, phone or email.</span></div>
                )}
                <div className="contact-actions" style={{ justifyContent: 'center' }}>
                  <a className="btn btn-whatsapp" href={whatsappLink(done.text)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /> Send on WhatsApp</a>
                  <button className="btn btn-outline" onClick={() => setDone(null)}>Write another message</button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2>Send a Message</h2>
                {!isBackendConnected && <div className="alert info"><Info size={18} aria-hidden="true" /><span>Demo mode: messages aren’t delivered until a backend is connected. WhatsApp works right now.</span></div>}
                {submitError && <div className="alert error" role="alert"><AlertCircle size={18} aria-hidden="true" /><span>{submitError}</span></div>}
                <FormField id="name" label="Your name" required error={errors.name}>
                  <input id="name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                </FormField>
                <div className="form-row">
                  <FormField id="email" label="Email" required error={errors.email}>
                    <input id="email" type="email" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                  </FormField>
                  <FormField id="phone" label="Phone (optional)" error={errors.phone}>
                    <input id="phone" type="tel" inputMode="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                  </FormField>
                </div>
                <FormField id="message" label="Message" required error={errors.message}>
                  <textarea id="message" rows={5} value={form.message} onChange={set('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
                </FormField>
                <button className="btn btn-primary btn-block" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send Message'}</button>
              </form>
            )}
          </div>

          <div className="side-stack">
            <div className="info-card">
              <h3>Get in Touch</h3>
              <p className="info-line"><Phone size={18} aria-hidden="true" /><a href={telLink}>{siteConfig.phone}</a></p>
              <p className="info-line"><Mail size={18} aria-hidden="true" /><a href={mailLink}>{siteConfig.email}</a></p>
              <p className="info-line"><MapPin size={18} aria-hidden="true" /><span>{fullAddress()}</span></p>
              <p className="info-line"><Clock size={18} aria-hidden="true" /><span>{siteConfig.hours.map((h) => <span key={h.days} style={{ display: 'block' }}>{h.days}: {h.time}</span>)}</span></p>
              <div className="contact-actions">
                <a className="btn btn-whatsapp" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /> Chat on WhatsApp</a>
              </div>
              <div className="social-row" style={{ marginTop: 20, color: 'var(--espresso)' }}>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ borderColor: 'var(--line)' }}><InstagramIcon /></a>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ borderColor: 'var(--line)' }}><FacebookIcon /></a>
                <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{ borderColor: 'var(--line)' }}><XIcon /></a>
              </div>
            </div>

            <div className="map-box">
              {mapSrc ? (
                <iframe title={`Map showing ${siteConfig.name}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              ) : (
                <div className="map-placeholder">
                  <MapPin size={36} aria-hidden="true" />
                  <strong>Google Maps embed placeholder</strong>
                  <span>Add the café’s embed URL in <code>src/data/siteConfig.js</code> (mapEmbedUrl) to show the live map here.</span>
                  <a href={mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Open in Google Maps</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
