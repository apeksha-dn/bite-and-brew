import { Link } from 'react-router-dom';
import SmartImage from './SmartImage';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/menu?category=${category.id}`} className="category-card" aria-label={`View ${category.name}`}>
      <SmartImage name={category.photo} alt="" w={480} h={480} />
      <div className="category-overlay">
        <h3>{category.name}</h3>
        <span>{category.blurb}</span>
      </div>
    </Link>
  );
}
