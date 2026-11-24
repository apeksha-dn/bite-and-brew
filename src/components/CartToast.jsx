import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartToast() {
  const { toast } = useCart();
  return (
    <div className="toast-wrap" aria-live="polite">
      {toast && (
        <div className="toast" role="status">
          <Check size={16} aria-hidden="true" /> <span>{toast}</span> <Link to="/order">View cart</Link>
        </div>
      )}
    </div>
  );
}
