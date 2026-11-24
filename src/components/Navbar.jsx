import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useCart } from '../context/CartContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totals } = useCart();
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="logo" aria-label={`${siteConfig.name} home`}>
          <span className="logo-mark">B</span>
          <span className="logo-text">{siteConfig.name}</span>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation" id="main-nav">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/order" className="btn btn-primary nav-order-mobile">Order Online</Link>
        </nav>

        <div className="nav-actions">
          <Link to="/order" className="btn btn-primary btn-sm nav-order-desktop">Order Online</Link>
          <Link to="/order" className="cart-btn" aria-label={`Cart, ${totals.count} item${totals.count === 1 ? '' : 's'}`}>
            <ShoppingBag size={20} aria-hidden="true" />
            {totals.count > 0 && <span className="cart-badge">{totals.count}</span>}
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
    </header>
  );
}
