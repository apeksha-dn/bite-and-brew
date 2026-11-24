import { Star } from 'lucide-react';

export default function TestimonialCard({ t }) {
  return (
    <figure className="testimonial">
      <div className="stars" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" aria-hidden="true" />)}
      </div>
      <blockquote>“{t.text}”</blockquote>
      <figcaption>
        <span className="avatar" aria-hidden="true">{t.name.split(' ').map((w) => w[0]).slice(-2).join('')}</span>
        <span><strong>{t.name}</strong><br /><small>{t.role}</small></span>
      </figcaption>
    </figure>
  );
}
