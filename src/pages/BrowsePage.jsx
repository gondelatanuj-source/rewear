import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Search, ArrowUpDown } from 'lucide-react';
import { dresses, designers, sizes, categories, colors } from '../data/dresses';
import DressCard from '../components/DressCard';

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid rgba(42,31,26,0.08)', paddingBottom: '20px', marginBottom: '20px' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0 0 12px',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1rem',
          fontWeight: '500',
          color: '#2a1f1a',
        }}
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && children}
    </div>
  );
}

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: 'All',
    designer: 'All Designers',
    color: 'All Colors',
    size: '',
    maxPrice: 500,
    sort: 'popular',
    available: false,
  });

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [filters]);

  useEffect(() => {
    if (searchParams.get('search')) {
      setFilters(f => ({ ...f, search: searchParams.get('search') }));
    }
  }, [searchParams]);

  const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const filtered = useMemo(() => {
    let result = [...dresses];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.designer.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }
    if (filters.category !== 'All') result = result.filter(d => d.category === filters.category);
    if (filters.designer !== 'All Designers') result = result.filter(d => d.designer === filters.designer);
    if (filters.color !== 'All Colors') result = result.filter(d => d.colors.includes(filters.color));
    if (filters.size) result = result.filter(d => d.sizes.includes(filters.size));
    if (filters.available) result = result.filter(d => d.available);
    result = result.filter(d => d.price <= filters.maxPrice);

    switch (filters.sort) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'popular': return result.sort((a, b) => b.reviews - a.reviews);
      default: return result;
    }
  }, [filters]);

  const clearFilters = () => setFilters({
    search: '',
    category: 'All',
    designer: 'All Designers',
    color: 'All Colors',
    size: '',
    maxPrice: 500,
    sort: 'popular',
    available: false,
  });

  const hasActiveFilters = filters.category !== 'All' || filters.designer !== 'All Designers' ||
    filters.color !== 'All Colors' || filters.size || filters.available || filters.maxPrice < 500;

  const Sidebar = () => (
    <div style={{ position: 'sticky', top: '90px', height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: '500' }}>Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#c9a96e', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <X size={14} /> Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter('category', cat)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '4px 0',
                fontSize: '0.875rem',
                color: filters.category === cat ? '#c9a96e' : '#8a7a72',
                fontWeight: filters.category === cat ? '600' : '400',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {filters.category === cat && <span style={{ width: '4px', height: '4px', background: '#c9a96e', borderRadius: '50%' }} />}
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Designer */}
      <FilterSection title="Designer">
        <select
          className="select"
          value={filters.designer}
          onChange={e => setFilter('designer', e.target.value)}
        >
          {designers.map(d => <option key={d}>{d}</option>)}
        </select>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setFilter('color', c)}
              style={{
                padding: '4px 12px',
                borderRadius: '100px',
                border: `1px solid ${filters.color === c ? '#c9a96e' : 'rgba(42,31,26,0.15)'}`,
                background: filters.color === c ? 'rgba(201,169,110,0.1)' : 'white',
                color: filters.color === c ? '#c9a96e' : '#8a7a72',
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {sizes.map(s => (
            <button
              key={s}
              onClick={() => setFilter('size', filters.size === s ? '' : s)}
              style={{
                width: '44px',
                height: '40px',
                borderRadius: '2px',
                border: `1px solid ${filters.size === s ? '#c9a96e' : 'rgba(42,31,26,0.15)'}`,
                background: filters.size === s ? '#c9a96e' : 'white',
                color: filters.size === s ? 'white' : '#8a7a72',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Max Price / Day">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#8a7a72' }}>₹189</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2a1f1a' }}>₹{filters.maxPrice}</span>
          </div>
          <input
            type="range"
            min="189"
            max="500"
            value={filters.maxPrice}
            onChange={e => setFilter('maxPrice', Number(e.target.value))}
            style={{
              '--fill': `${((filters.maxPrice - 189) / (500 - 189)) * 100}%`,
            }}
          />
        </div>
      </FilterSection>

      {/* Availability */}
      <div style={{ paddingBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div
            onClick={() => setFilter('available', !filters.available)}
            style={{
              width: '40px',
              height: '22px',
              borderRadius: '11px',
              background: filters.available ? '#c9a96e' : 'rgba(42,31,26,0.15)',
              position: 'relative',
              transition: 'background 0.3s',
              cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '2px',
              left: filters.available ? '20px' : '2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'white',
              transition: 'left 0.3s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }} />
          </div>
          <span style={{ fontSize: '0.875rem', color: '#2a1f1a', fontWeight: '500' }}>Available Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="page-enter" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--ivory)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1310, #2a1f1a)',
        padding: '64px 24px 48px',
        textAlign: 'center',
      }}>
        <p className="section-label" style={{ color: '#c9a96e', marginBottom: '12px' }}>Our Collection</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '400', color: 'white', marginBottom: '16px' }}>
          Browse Bridal Gowns
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem' }}>
          {dresses.length} curated designer pieces available for rent
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Sort Bar */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8a7a72' }} />
            <input
              type="text"
              placeholder="Search gowns, designers..."
              value={filters.search}
              onChange={e => setFilter('search', e.target.value)}
              className="input"
              style={{ paddingLeft: '40px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={15} color="#8a7a72" />
            <select
              className="select"
              style={{ width: 'auto' }}
              value={filters.sort}
              onChange={e => setFilter('sort', e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen(true)}
            className="btn-ghost lg:hidden"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <SlidersHorizontal size={16} /> Filters
            {hasActiveFilters && <span style={{ background: '#c9a96e', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>!</span>}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          {/* Sidebar - desktop */}
          <div style={{ width: '240px', flexShrink: 0 }} className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Grid */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '0.875rem', color: '#8a7a72' }}>
                {loading ? 'Loading...' : `${filtered.length} dress${filtered.length !== 1 ? 'es' : ''} found`}
              </p>
              {hasActiveFilters && (
                <button onClick={clearFilters} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#c9a96e' }}>
                  Clear filters
                </button>
              )}
            </div>

            {!loading && filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👗</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '8px' }}>No dresses found</h3>
                <p style={{ color: '#8a7a72', marginBottom: '24px' }}>Try adjusting your filters or search terms.</p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '28px',
            }}>
              {loading
                ? Array(6).fill(null).map((_, i) => <DressCard key={i} loading />)
                : filtered.map(d => <DressCard key={d.id} dress={d} />)
              }
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setFiltersOpen(false)}
          />
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '300px',
            background: 'white',
            overflowY: 'auto',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem' }}>Filters</h3>
              <button onClick={() => setFiltersOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>
            <Sidebar />
            <button onClick={() => setFiltersOpen(false)} className="btn-primary" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
