import {
  Sandwich, Pizza, UtensilsCrossed, CakeSlice, GlassWater, Salad, Soup, Coffee, Leaf, ChefHat,
  Clock, HeartHandshake, Sparkles, ShieldCheck, Users, Utensils,
} from 'lucide-react';

// Explicit map keeps the bundle small (no wildcard lucide import) and lets data files
// reference icons by string name.
const map = { Sandwich, Pizza, UtensilsCrossed, CakeSlice, GlassWater, Salad, Soup, Coffee, Leaf, ChefHat, Clock, HeartHandshake, Sparkles, ShieldCheck, Users };

export default function Icon({ name, size = 24, ...rest }) {
  const C = map[name] || Utensils;
  return <C size={size} aria-hidden="true" {...rest} />;
}
