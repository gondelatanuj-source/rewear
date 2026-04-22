import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, wishlist, user } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 0' : '20px 0',
          background: isTransparent
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)'
            : 'rgba(253, 248, 242, 0.96)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201, 169, 110, 0.15)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #c9a96e, #9a7a48)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '700', fontFamily: 'Cormorant Garamond, serif' }}>R</span>
              </div>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.6rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                color: isTransparent ? 'white' : '#2a1f1a',
              }}>
                Rewear
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/browse', label: 'Browse Dresses' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  letterSpacing: '0.08em',
                  color: isTransparent ? 'rgba(255,255,255,0.9)' : (location.pathname === to ? '#c9a96e' : '#2a1f1a'),
                  transition: 'color 0.3s',
                  borderBottom: location.pathname === to ? '1px solid #c9a96e' : 'none',
                  paddingBottom: '2px',
                }}
              >
                {label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Search */}
            <button
              id="search-btn"
              onClick={() => setSearchOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <Search size={20} color={isTransparent ? 'white' : '#2a1f1a'} />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" style={{ position: 'relative', display: 'flex' }}>
              <Heart size={20} color={isTransparent ? 'white' : '#2a1f1a'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#d4818a',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" style={{ position: 'relative', display: 'flex' }}>
              <ShoppingBag size={20} color={isTransparent ? 'white' : '#2a1f1a'} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#c9a96e',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                }}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link to={user ? '/dashboard' : '/login'} style={{ display: 'flex' }}>
              <User size={20} color={isTransparent ? 'white' : '#2a1f1a'} />
            </Link>

            {/* Mobile Menu */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {menuOpen
                ? <X size={22} color={isTransparent ? 'white' : '#2a1f1a'} />
                : <Menu size={22} color={isTransparent ? 'white' : '#2a1f1a'} />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(253, 248, 242, 0.98)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <X size={28} color="#2a1f1a" />
          </button>
          {[
            { to: '/', label: 'Home' },
            { to: '/browse', label: 'Browse Dresses' },
            { to: '/cart', label: 'Cart' },
            { to: '/wishlist', label: 'Wishlist' },
            { to: user ? '/dashboard' : '/login', label: user ? 'Dashboard' : 'Sign In' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: 'none',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2rem',
                fontWeight: '400',
                color: '#2a1f1a',
                letterSpacing: '0.05em',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(42, 31, 26, 0.7)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '100px',
          }}
          onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
        >
          <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '560px', padding: '0 24px' }}>
            <div style={{
              background: 'white',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              padding: '16px 20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}>
              <Search size={20} color="#c9a96e" />
              <input
                autoFocus
                type="text"
                placeholder="Search dresses, designers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  marginLeft: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: '#2a1f1a',
                  background: 'transparent',
                }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} color="#8a7a72" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
