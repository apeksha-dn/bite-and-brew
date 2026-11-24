// Central, easy-to-edit café settings. Change values here (or via VITE_* env vars)
// and the whole site updates: name, contact details, hours, fees, social links.

const env = import.meta.env;

const name = env.VITE_SITE_NAME || 'Bite & Brew';
const whatsappNumber = (env.VITE_WHATSAPP_NUMBER || '919999999999').replace(/\D/g, '');

export const siteConfig = {
  name,
  shortName: name.split(/\s|&/)[0],
  tagline: 'Good Food. Good Mood.',
  description:
    'A neighbourhood café serving handcrafted burgers, wood-fired pizza, fresh pasta, desserts, milkshakes, Indian comfort food and specialty coffee.',

  phone: env.VITE_CONTACT_PHONE || '+91 99999 99999',
  email: env.VITE_CONTACT_EMAIL || 'hello@biteandbrew.example',
  whatsappNumber,
  whatsappGreeting: `Hi ${name}! I'd like to know more.`,

  address: {
    line1: '12, Garden Street (placeholder address)',
    line2: 'Your Locality',
    city: 'Your City',
    state: 'Karnataka',
    pincode: '000000',
  },
  // Paste the "src" URL from Google Maps → Share → Embed a map. Empty = placeholder shown.
  mapEmbedUrl: env.VITE_GOOGLE_MAPS_EMBED_URL || '',
  mapSearchQuery: 'Bite & Brew café',

  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 10:30 PM' },
    { days: 'Saturday – Sunday', time: '8:00 AM – 11:30 PM' },
  ],
  reservationSlots: [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
  ],
  maxGuests: 12,

  social: {
    instagram: 'https://www.instagram.com/biteandbrew.example',
    facebook: 'https://www.facebook.com/biteandbrew.example',
    x: 'https://x.com/biteandbrew_example',
  },

  // Ordering rules
  currency: '₹',
  taxRate: 0.05, // 5% GST (confirm with your accountant)
  deliveryFee: 40,
  freeDeliveryAbove: 499,
  minOrder: 0,

  announcement: 'Free delivery on orders above ₹499 · Use code BREW10 at the café for 10% off dessert',

  offers: [
    {
      id: 'combo',
      title: 'Burger + Fries + Shake Combo',
      text: 'Any signature burger with fries and a classic shake.',
      price: '₹399',
      was: '₹499',
    },
    {
      id: 'happy',
      title: 'Weekday Coffee Hour',
      text: 'Buy any coffee, get a mini cookie free between 3–5 PM.',
      price: 'Free cookie',
      was: '',
    },
    {
      id: 'family',
      title: 'Weekend Family Platter',
      text: 'Two pizzas, pasta, garlic bread and four drinks for the table.',
      price: '₹1,199',
      was: '₹1,499',
    },
  ],
};

export const whatsappLink = (message) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message || siteConfig.whatsappGreeting,
  )}`;

export const telLink = `tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`;
export const mailLink = `mailto:${siteConfig.email}`;

export const fullAddress = () => {
  const a = siteConfig.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.state} ${a.pincode}`;
};
