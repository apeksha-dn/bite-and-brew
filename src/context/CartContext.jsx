import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { calculateTotals } from '../utils/pricing';

const STORAGE_KEY = 'bb_cart_v1';
const CartContext = createContext(null);

const load = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed)
      ? parsed.filter((i) => i && i.id && Number.isFinite(i.price) && Number.isInteger(i.qty) && i.qty > 0)
      : [];
  } catch {
    return [];
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { item } = action;
      const existing = state.find((i) => i.id === item.id);
      if (existing) return state.map((i) => (i.id === item.id ? { ...i, qty: Math.min(i.qty + 1, 20) } : i));
      return [...state, { id: item.id, name: item.name, price: item.price, photo: item.photo, veg: item.veg, qty: 1 }];
    }
    case 'setQty': {
      const qty = Math.min(20, Math.floor(action.qty));
      if (qty <= 0) return state.filter((i) => i.id !== action.id);
      return state.map((i) => (i.id === action.id ? { ...i, qty } : i));
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage errors */
    }
  }, [items]);

  // Keep multiple tabs in sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        dispatch({ type: 'clear' });
        load().forEach((i) => {
          for (let n = 0; n < i.qty; n += 1) dispatch({ type: 'add', item: i });
        });
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const addItem = useCallback((item) => {
    dispatch({ type: 'add', item });
    setToast(`${item.name} added to cart`);
  }, []);
  const setQty = useCallback((id, qty) => dispatch({ type: 'setQty', id, qty }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo(
    () => ({ items, addItem, setQty, removeItem, clearCart, totals: calculateTotals(items), toast }),
    [items, addItem, setQty, removeItem, clearCart, toast],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
