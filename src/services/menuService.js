import { categories, menuItems } from '../data/menu';
import { supabase, isBackendConnected } from './supabaseClient';

// Returns { categories, items, source }. With Supabase connected it reads the
// `menu_categories` and `menu_items` tables (see supabase/schema.sql);
// otherwise, or on any error, it uses the local data file.
export async function loadMenu() {
  if (isBackendConnected) {
    try {
      const [cats, items] = await Promise.all([
        supabase.from('menu_categories').select('*').order('sort_order'),
        supabase.from('menu_items').select('*').eq('available', true).order('sort_order'),
      ]);
      if (!cats.error && !items.error && items.data?.length) {
        return {
          source: 'supabase',
          categories: cats.data.map((c) => ({ id: c.id, name: c.name, blurb: c.blurb, photo: c.photo, icon: c.icon })),
          items: items.data.map((i) => ({
            id: i.id,
            category: i.category_id,
            name: i.name,
            desc: i.description,
            price: Number(i.price),
            veg: i.is_veg,
            bestseller: i.is_bestseller,
            photo: i.image_url || i.photo,
          })),
        };
      }
    } catch {
      /* fall through to local data */
    }
  }
  return { source: 'local', categories, items: menuItems };
}
