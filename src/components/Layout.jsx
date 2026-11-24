import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import CartToast from './CartToast';
import WhatsAppFloat from './WhatsAppFloat';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">Skip to content</a>
      <AnnouncementBar />
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
      <CartToast />
      <WhatsAppFloat />
    </>
  );
}
