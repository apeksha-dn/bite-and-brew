// Small, dependency-free validators. Each returns an error string or ''.

export const required = (v, label = 'This field') => (String(v ?? '').trim() ? '' : `${label} is required`);

export const validName = (v) => {
  const s = String(v ?? '').trim();
  if (!s) return 'Name is required';
  if (s.length < 2) return 'Please enter your full name';
  return '';
};

// Accepts Indian mobile numbers: optional +91/91/0 prefix, then 10 digits starting 6-9.
export const validPhone = (v) => {
  const digits = String(v ?? '').replace(/[\s\-()]/g, '');
  if (!digits) return 'Phone number is required';
  if (!/^(?:\+?91|0)?[6-9]\d{9}$/.test(digits)) return 'Enter a valid 10-digit mobile number';
  return '';
};

export const validEmail = (v, { optional = false } = {}) => {
  const s = String(v ?? '').trim();
  if (!s) return optional ? '' : 'Email is required';
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) ? '' : 'Enter a valid email address';
};

export const validAddress = (v) => {
  const s = String(v ?? '').trim();
  if (!s) return 'Delivery address is required';
  return s.length < 10 ? 'Please enter a complete address' : '';
};

export const validMessage = (v) => {
  const s = String(v ?? '').trim();
  if (!s) return 'Message is required';
  return s.length < 10 ? 'Message should be at least 10 characters' : '';
};

export const todayISO = () => {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
};

export const validFutureDate = (v) => {
  if (!v) return 'Please choose a date';
  return v < todayISO() ? 'Date cannot be in the past' : '';
};

export const hasErrors = (errors) => Object.values(errors).some(Boolean);

export const formatTime12 = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${suffix}`;
};
