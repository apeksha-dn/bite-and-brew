import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { img } from '../data/images';

// Lazy-loaded image with a graceful fallback so a failed URL never leaves a broken icon.
export default function SmartImage({ name, alt, w = 800, h, className = '', eager = false, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <ImageOff size={28} aria-hidden="true" />
      </div>
    );
  }
  return (
    <img
      src={img(name, w, h)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
