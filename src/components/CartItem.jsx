import { Minus, Plus, Trash2 } from 'lucide-react';
import SmartImage from './SmartImage';
import VegMark from './VegMark';
import { formatPrice } from '../utils/pricing';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { setQty, removeItem } = useCart();
  return (
    <li className="cart-item">
      <SmartImage name={item.photo} alt="" w={160} h={160} className="cart-thumb" />
      <div className="cart-info">
        <div className="cart-name"><VegMark veg={item.veg} /><strong>{item.name}</strong></div>
        <span className="cart-unit">{formatPrice(item.price)} each</span>
        <div className="qty" role="group" aria-label={`Quantity for ${item.name}`}>
          <button onClick={() => setQty(item.id, item.qty - 1)} aria-label={`Decrease quantity of ${item.name}`}><Minus size={14} /></button>
          <output aria-live="polite">{item.qty}</output>
          <button onClick={() => setQty(item.id, item.qty + 1)} aria-label={`Increase quantity of ${item.name}`} disabled={item.qty >= 20}><Plus size={14} /></button>
        </div>
      </div>
      <div className="cart-right">
        <strong>{formatPrice(item.price * item.qty)}</strong>
        <button className="icon-btn" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name} from cart`}><Trash2 size={16} /></button>
      </div>
    </li>
  );
}
