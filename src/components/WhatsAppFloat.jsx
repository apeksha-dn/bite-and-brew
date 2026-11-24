import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../data/siteConfig';

export default function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
      <MessageCircle size={24} aria-hidden="true" />
    </a>
  );
}
