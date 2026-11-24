import { useEffect, useState } from 'react';
import { loadMenu } from '../services/menuService';

export default function useMenu() {
  const [state, setState] = useState({ loading: true, error: '', categories: [], items: [] });
  useEffect(() => {
    let alive = true;
    loadMenu()
      .then((m) => alive && setState({ loading: false, error: '', categories: m.categories, items: m.items }))
      .catch(() => alive && setState({ loading: false, error: 'Could not load the menu.', categories: [], items: [] }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
