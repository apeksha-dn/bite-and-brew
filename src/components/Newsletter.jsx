import { useState } from 'react';
import { Mail } from 'lucide-react';
import { subscribeNewsletter } from '../services/api';
import { validEmail } from '../utils/validation';
import { isBackendConnected } from '../services/supabaseClient';
import { siteConfig } from '../data/siteConfig';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done
  const [persisted, setPersisted] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const err = validEmail(email);
    setError(err);
    if (err) return;
    setState('sending');
    const res = await subscribeNewsletter(email.trim());
    if (!res.ok) {
      setState('idle');
      setError(res.error?.includes('duplicate') ? 'This email is already subscribed.' : 'Could not subscribe right now. Please try again.');
      return;
    }
    setPersisted(res.persisted);
    setState('done');
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="container newsletter-inner">
        <div>
          <span className="eyebrow light">Stay in the loop</span>
          <h2 id="newsletter-title">Fresh offers, straight to your inbox</h2>
          <p>New dishes, weekend specials and café events from {siteConfig.name}. No spam.</p>
        </div>
        {state === 'done' ? (
          <div className="newsletter-done" role="status">
            <strong>Thanks for subscribing!</strong>
            {!persisted && <p>Demo mode: this email was not saved. Connect Supabase to collect subscribers.</p>}
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="newsletter-form">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <div className="nl-input">
              <Mail size={18} aria-hidden="true" />
              <input id="nl-email" type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? 'nl-error' : undefined} autoComplete="email" />
            </div>
            <button className="btn btn-light" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Subscribing…' : 'Subscribe'}</button>
            {error && <p id="nl-error" className="field-error light" role="alert">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
