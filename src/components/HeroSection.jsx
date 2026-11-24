import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Truck } from 'lucide-react';
import SmartImage from './SmartImage';
import { siteConfig } from '../data/siteConfig';

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <span className="eyebrow">{siteConfig.tagline}</span>
          <h1 id="hero-title">A Little Bite of <em>Happiness.</em></h1>
          <p>Handcrafted burgers, wood-fired pizza, silky pasta, Indian comfort food and freshly brewed coffee, served in a space that feels like home.</p>
          <div className="hero-cta">
            <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
            <Link to="/order" className="btn btn-outline">Order Now</Link>
          </div>
          <ul className="hero-points">
            <li><Star size={16} aria-hidden="true" /> Freshly made daily</li>
            <li><Truck size={16} aria-hidden="true" /> Free delivery above ₹{siteConfig.freeDeliveryAbove}</li>
          </ul>
        </motion.div>

        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}>
          <SmartImage name="burger1" alt="Juicy cheeseburger with fresh toppings" w={1000} h={1200} className="hero-img-main" eager />
          <SmartImage name="pizza1" alt="Wood-fired pizza" w={500} h={500} className="hero-img-small" eager />
          <div className="hero-card">
            <strong>Open daily</strong>
            <span>{siteConfig.hours[0].time}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
