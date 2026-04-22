import { Link } from 'react-router-dom';
import { Heart, Star, Eye, ShieldCheck, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DressCard({ dress, loading = false }) {
  const { toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(dress?.id);

  if (loading) {
    return (
      <div className="card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
        <div className="skeleton" style={{ height: '320px' }} />
        <div style={{ padding: '20px' }}>
          <div className="skeleton" style={{ height: '14px', borderRadius: '2px', marginBottom: '8px', width: '60%' }} />
          <div className="skeleton" style={{ height: '20px', borderRadius: '2px', marginBottom: '12px' }} />
          <div className="skeleton" style={{ height: '14px', borderRadius: '2px', width: '40%' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ position: 'relative', cursor: 'pointer' }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={dress.images[0]}
          alt={dress.name}
          style={{
            width: '100%',
            height: '320px',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.6s ease',
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80';
          }}
        />

        {/* Overlay on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(42,31,26,0.5) 0%, transparent 50%)',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
          className="card-overlay"
        />

        {/* Wishlist button */}
        <button
          id={`wishlist-btn-${dress.id}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(dress.id);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Heart
            size={16}
            color={wishlisted ? '#d4818a' : '#8a7a72'}
            fill={wishlisted ? '#d4818a' : 'none'}
          />
        </button>

        {/* Tags */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {dress.tags?.includes('bestseller') && (
            <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>✦ Bestseller</span>
          )}
          {dress.tags?.includes('new') && (
            <span className="badge badge-blush" style={{ fontSize: '0.65rem' }}>New Arrival</span>
          )}
          {!dress.available && (
            <span style={{
              background: 'rgba(42,31,26,0.85)',
              color: 'white',
              padding: '3px 8px',
              borderRadius: '2px',
              fontSize: '0.65rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
            }}>
              Unavailable
            </span>
          )}
        </div>

        {/* View details hover CTA */}
        <Link
          to={`/dress/${dress.id}`}
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%) translateY(8px)',
            opacity: 0,
            textDecoration: 'none',
            pointerEvents: 'none',
          }}
          className="card-cta"
        >
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.95)',
            padding: '8px 18px',
            borderRadius: '2px',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#2a1f1a',
            whiteSpace: 'nowrap',
          }}>
            <Eye size={13} /> View Details
          </span>
        </Link>
      </div>

      {/* Info */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '0.72rem', color: '#c9a96e', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {dress.designer}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Star size={12} fill="#c9a96e" color="#c9a96e" />
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#2a1f1a' }}>{dress.rating}</span>
            <span style={{ fontSize: '0.72rem', color: '#8a7a72' }}>({dress.reviews})</span>
          </div>
        </div>

        <Link to={`/dress/${dress.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.2rem',
            fontWeight: '500',
            color: '#2a1f1a',
            marginBottom: '8px',
            lineHeight: '1.3',
          }}>
            {dress.name}
          </h3>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          {dress.colors.slice(0, 3).map(c => (
            <span key={c} style={{ fontSize: '0.72rem', color: '#8a7a72' }}>{c}</span>
          ))}
          {dress.colors.length > 3 && <span style={{ fontSize: '0.72rem', color: '#8a7a72' }}>+{dress.colors.length - 3}</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: '600', color: '#2a1f1a' }}>
              ₹{dress.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#8a7a72' }}>/day</span>
          </div>
          <Link to={`/dress/${dress.id}`} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.72rem' }}>
            Rent Now
          </Link>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.68rem', color: '#8a7a72' }}>
            <ShieldCheck size={11} color="#c9a96e" /> Verified
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.68rem', color: '#8a7a72' }}>
            <Leaf size={11} color="#34a853" /> Sustainable
          </span>
        </div>
      </div>
    </div>
  );
}
