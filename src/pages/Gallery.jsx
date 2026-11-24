import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SmartImage from '../components/SmartImage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { galleryFilters, galleryImages } from '../data/content';
import { img } from '../data/images';

export default function Gallery() {
  useDocumentMeta('Gallery', 'A look at our burgers, pizza, desserts, coffee, milkshakes, café interiors and kitchen.');
  const [filter, setFilter] = useState('All');
  const [openIdx, setOpenIdx] = useState(null);
  const triggerRef = useRef(null);
  const list = filter === 'All' ? galleryImages : galleryImages.filter((g) => g.cat === filter);

  const close = useCallback(() => {
    setOpenIdx(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback((d) => setOpenIdx((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (openIdx === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openIdx, close, step]);

  const current = openIdx !== null ? list[openIdx] : null;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Gallery</span>
          <h1>A Taste of Our World</h1>
          <p>Burgers, pizza, desserts, coffee and the café itself. Tap any photo to enlarge.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="filter-row" role="group" aria-label="Filter gallery" style={{ marginBottom: 32 }}>
            {galleryFilters.map((f) => (
              <button key={f} className={`chip ${filter === f ? 'active' : ''}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="masonry">
            {list.map((g, i) => (
              <button
                key={g.id}
                className={`masonry-item ${g.h}`}
                onClick={(e) => { triggerRef.current = e.currentTarget; setOpenIdx(i); }}
                aria-label={`Enlarge photo: ${g.alt}`}
              >
                <SmartImage name={g.photo} alt={g.alt} w={700} />
                <span className="cap">{g.cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={close}>
          <button className="lb-btn lb-close" onClick={close} aria-label="Close image viewer" autoFocus><X size={22} /></button>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image" style={{ transform: 'translateY(-50%)' }}><ChevronLeft size={24} /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={img(current.photo, 1400)} alt={current.alt} />
            <figcaption>{current.alt} · {openIdx + 1} / {list.length}</figcaption>
          </figure>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image" style={{ transform: 'translateY(-50%)' }}><ChevronRight size={24} /></button>
        </div>
      )}
    </>
  );
}
