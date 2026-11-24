import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SearchX } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import VegMark from '../components/VegMark';
import useMenu from '../hooks/useMenu';
import useDebounce from '../hooks/useDebounce';
import useDocumentMeta from '../hooks/useDocumentMeta';

export default function Menu() {
  useDocumentMeta('Menu', 'Explore our full menu: burgers, pizza, sandwiches, pasta, desserts, milkshakes, fries & starters, Indian food and coffee.');
  const { loading, error, categories, items } = useMenu();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('all'); // all | veg | nonveg
  const q = useDebounce(query.trim().toLowerCase());

  const active = params.get('category') || 'all';
  const setCategory = (id) => {
    const next = new URLSearchParams(params);
    if (id === 'all') next.delete('category'); else next.set('category', id);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (active === 'all' || i.category === active) &&
          (diet === 'all' || (diet === 'veg' ? i.veg : !i.veg)) &&
          (!q || `${i.name} ${i.desc}`.toLowerCase().includes(q)),
      ),
    [items, active, diet, q],
  );

  const grouped = active === 'all' && !q;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our menu</span>
          <h1>Something for Every Craving</h1>
          <p>Freshly prepared, generously served. Prices are in Indian Rupees. Delivery charges and GST are added at checkout.</p>
        </div>
      </section>

      <div className="menu-tools">
        <div className="container">
          <div className="search-box">
            <Search size={18} aria-hidden="true" />
            <label htmlFor="menu-search" className="sr-only">Search the menu</label>
            <input id="menu-search" type="search" placeholder="Search dishes, e.g. paneer, brownie…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="chip-row" role="tablist" aria-label="Menu categories">
            <button role="tab" aria-selected={active === 'all'} className={`chip ${active === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')}>All</button>
            {categories.map((c) => (
              <button key={c.id} role="tab" aria-selected={active === c.id} className={`chip ${active === c.id ? 'active' : ''}`} onClick={() => setCategory(c.id)}>{c.name}</button>
            ))}
          </div>
          <div className="filter-row" role="group" aria-label="Dietary filter">
            <button className={`chip sm ${diet === 'all' ? 'active' : ''}`} onClick={() => setDiet('all')} aria-pressed={diet === 'all'}>All</button>
            <button className={`chip sm ${diet === 'veg' ? 'active' : ''}`} onClick={() => setDiet('veg')} aria-pressed={diet === 'veg'}><VegMark veg /> Veg</button>
            <button className={`chip sm ${diet === 'nonveg' ? 'active' : ''}`} onClick={() => setDiet('nonveg')} aria-pressed={diet === 'nonveg'}><VegMark veg={false} /> Non-veg</button>
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          {loading && <LoadingState label="Loading menu…" />}
          {error && <EmptyState title="Menu unavailable" text={error} />}
          {!loading && !error && filtered.length === 0 && (
            <EmptyState icon={<SearchX size={36} />} title="No dishes found" text="Try a different search or filter." actionLabel="Clear filters" onAction={() => { setQuery(''); setDiet('all'); setCategory('all'); }} />
          )}
          {!loading && !error && filtered.length > 0 && (
            grouped ? (
              categories.map((c) => {
                const list = filtered.filter((i) => i.category === c.id);
                if (!list.length) return null;
                return (
                  <section className="menu-section" key={c.id} aria-labelledby={`cat-${c.id}`}>
                    <h2 id={`cat-${c.id}`}>{c.name}</h2>
                    <p>{c.blurb}</p>
                    <div className="food-grid">{list.map((it) => <FoodCard key={it.id} item={it} />)}</div>
                  </section>
                );
              })
            ) : (
              <>
                <p className="results-meta" aria-live="polite">{filtered.length} dish{filtered.length === 1 ? '' : 'es'} found</p>
                <div className="food-grid">{filtered.map((it) => <FoodCard key={it.id} item={it} showCategory={active === 'all'} />)}</div>
              </>
            )
          )}
        </div>
      </section>
    </>
  );
}
