import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import TestimonialCard from '../components/TestimonialCard';
import Newsletter from '../components/Newsletter';
import SmartImage from '../components/SmartImage';
import LoadingState from '../components/LoadingState';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import { InstagramIcon } from '../components/SocialIcons';
import useMenu from '../hooks/useMenu';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { fullAddress, siteConfig, telLink, whatsappLink } from '../data/siteConfig';
import { instagramStrip, reasons, testimonials } from '../data/content';

export default function Home() {
  useDocumentMeta(
    `${siteConfig.name} — ${siteConfig.tagline}`,
    `${siteConfig.name}: burgers, pizza, pasta, desserts, milkshakes, Indian food and coffee. Dine in, order online or reserve a table.`,
  );
  const { loading, categories, items } = useMenu();
  const bestsellers = items.filter((i) => i.bestseller).slice(0, 4);

  return (
    <>
      <HeroSection />

      <section className="section alt" aria-labelledby="cat-title">
        <div className="container">
          <SectionHeading eyebrow="What we serve" title="Popular Food Categories" text="From a quick coffee to a full feast, pick your craving." />
          {loading ? <LoadingState /> : (
            <div className="category-grid">
              {categories.map((c, i) => <Reveal key={c.id} delay={(i % 4) * 0.05}><CategoryCard category={c} /></Reveal>)}
            </div>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="best-title">
        <div className="container">
          <SectionHeading eyebrow="Guest favourites" title="Our Bestselling Dishes" text="The plates our regulars keep coming back for." />
          {loading ? <LoadingState /> : <div className="food-grid">{bestsellers.map((it) => <FoodCard key={it.id} item={it} />)}</div>}
          <div className="center mt"><Link to="/menu" className="btn btn-outline">View Full Menu <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="about-title">
        <div className="container split">
          <Reveal className="split-media">
            <SmartImage name="interior1" alt="Warm and inviting café interior" w={900} h={970} />
            <SmartImage name="coffee1" alt="Freshly poured cappuccino" w={400} h={400} className="accent" />
          </Reveal>
          <Reveal className="split-copy">
            <span className="eyebrow">Our story</span>
            <h2 id="about-title">A café built around good food and good company</h2>
            <p>{siteConfig.name} started with a simple idea: serve the comfort food people love, made properly, in a space where you actually want to stay a while.</p>
            <p>Everything from our sauces to our desserts is prepared in-house with fresh ingredients, because good mood starts with good food.</p>
            <ul className="check-list">
              <li><Check size={18} aria-hidden="true" /> Fresh ingredients, prepared daily</li>
              <li><Check size={18} aria-hidden="true" /> Vegetarian and non-vegetarian options for everyone</li>
              <li><Check size={18} aria-hidden="true" /> Dine in, takeaway or doorstep delivery</li>
            </ul>
            <Link to="/about" className="btn btn-dark">Read Our Story</Link>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="offers-title">
        <div className="container">
          <SectionHeading eyebrow="Special offers" title="Treats Worth Sharing" text="Seasonal deals to make your next visit a little sweeter." />
          <div className="offer-grid">
            {siteConfig.offers.map((o, i) => (
              <Reveal key={o.id} delay={i * 0.08} className="offer">
                <span className="tag">Limited time</span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <div className="offer-price">{o.price}{o.was && <s>{o.was}</s>}</div>
                <Link to="/order" className="btn btn-primary btn-sm">Order Now</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark" aria-labelledby="why-title">
        <div className="container">
          <SectionHeading eyebrow="Why choose us" title="Made With Care, Served With a Smile" />
          <div className="feature-grid">
            {reasons.map((r) => (
              <div className="feature" key={r.title}>
                <div className="f-icon"><Icon name={r.icon} size={26} /></div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="reviews-title">
        <div className="container">
          <SectionHeading eyebrow="Kind words" title="What Our Guests Say" />
          <div className="testimonial-grid">{testimonials.map((t) => <TestimonialCard key={t.id} t={t} />)}</div>
          <p className="note">Sample testimonials shown. Replace with real customer reviews before launch.</p>
        </div>
      </section>

      <section className="section alt" aria-labelledby="insta-title">
        <div className="container">
          <SectionHeading eyebrow="On the gram" title="Follow Our Food Diary" text="Moments from our kitchen and tables." />
          <div className="insta-grid">
            {instagramStrip.map((p, i) => (
              <a key={p + i} href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Open our Instagram profile">
                <SmartImage name={p} alt="" w={400} h={400} />
                <span className="ig-hover"><InstagramIcon width={28} height={28} /></span>
              </a>
            ))}
          </div>
          <div className="center mt"><Link to="/gallery" className="btn btn-outline">Browse the Gallery</Link></div>
        </div>
      </section>

      <section className="section" aria-labelledby="visit-title">
        <div className="container">
          <SectionHeading eyebrow="Visit us" title="Opening Hours & Location" />
          <div className="info-grid">
            <div className="info-card">
              <h3>Opening Hours</h3>
              {siteConfig.hours.map((h) => (
                <div className="hours-row" key={h.days}><span>{h.days}</span><strong>{h.time}</strong></div>
              ))}
              <p className="info-line" style={{ marginTop: 16 }}><Clock size={18} aria-hidden="true" /> Kitchen closes 30 minutes before closing time.</p>
            </div>
            <div className="info-card">
              <h3>Find Us</h3>
              <p className="info-line"><MapPin size={18} aria-hidden="true" /><span>{fullAddress()}</span></p>
              <p className="info-line"><Phone size={18} aria-hidden="true" /><a href={telLink}>{siteConfig.phone}</a></p>
              <div className="contact-actions">
                <Link to="/reservations" className="btn btn-primary btn-sm">Reserve a Table</Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm"><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
