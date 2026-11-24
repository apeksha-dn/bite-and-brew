import { memo } from 'react';
import { Plus, Star } from 'lucide-react';
import SmartImage from './SmartImage';
import VegMark from './VegMark';
import { formatPrice } from '../utils/pricing';
import { useCart } from '../context/CartContext';
import { getCategoryName } from '../data/menu';

function FoodCard({ item, showCategory = false }) {
  const { addItem } = useCart();
  return (
    <article className="food-card">
      <div className="food-media">
        <SmartImage name={item.photo} alt={`${item.name}`} w={640} h={480} />
        {item.bestseller && (
          <span className="badge-bestseller"><Star size={12} fill="currentColor" aria-hidden="true" /> Bestseller</span>
        )}
      </div>
      <div className="food-body">
        <div className="food-title-row">
          <VegMark veg={item.veg} />
          <h3>{item.name}</h3>
        </div>
        {showCategory && <span className="food-cat">{getCategoryName(item.category)}</span>}
        <p>{item.desc}</p>
        <div className="food-footer">
          <span className="price">{formatPrice(item.price)}</span>
          <button className="btn btn-primary btn-sm" onClick={() => addItem(item)} aria-label={`Add ${item.name} to cart`}>
            <Plus size={16} aria-hidden="true" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(FoodCard);
