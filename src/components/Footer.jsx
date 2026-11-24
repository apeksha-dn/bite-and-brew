import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteConfig, whatsappLink, telLink, mailLink, fullAddress } from '../data/siteConfig';
import { FacebookIcon, InstagramIcon, XIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo light">
            <span className="logo-mark">B</span>
            <span className="logo-text">{siteConfig.name}</span>
          </Link>
          <p>{siteConfig.tagline} {siteConfig.description}</p>
          <div className="social-row">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><XIcon /></a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/order">Order Online</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3>Visit Us</h3>
          <ul className="contact-list">
            <li><MapPin size={16} aria-hidden="true" /><span>{fullAddress()}</span></li>
            <li><Phone size={16} aria-hidden="true" /><a href={telLink}>{siteConfig.phone}</a></li>
            <li><Mail size={16} aria-hidden="true" /><a href={mailLink}>{siteConfig.email}</a></li>
          </ul>
        </div>

        <div>
          <h3>Opening Hours</h3>
          <ul>
            {siteConfig.hours.map((h) => (
              <li key={h.days}><strong>{h.days}</strong><br />{h.time}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
        <span>{siteConfig.tagline}</span>
      </div>
    </footer>
  );
}
