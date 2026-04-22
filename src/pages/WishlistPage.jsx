import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dresses } from '../data/dresses';
import DressCard from '../components/DressCard';

export default function WishlistPage() {
  const { wishlist } = useApp();
  const wishlisted = dresses.filter(d => wishlist.includes(d.id));

  return (
    <div className="page-enter" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--ivory)' }}>
      <div style={{ background: 'linear-gradient(135deg, #1a1310, #2a1f1a)', padding: '56px 24px 40px', textAlign: 'center' }}>
        <p className="section-label" style={{ color: '#c9a96e', marginBottom: '12px' }}>Saved Dresses</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '400', color: 'white' }}>
          My Wishlist
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {wishlisted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <Heart size={64} color="rgba(212,129,138,0.2)" fill="rgba(212,129,138,0.1)" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '400', marginBottom: '12px', color: '#2a1f1a' }}>
              Your wishlist is empty
            </h2>
            <p style={{ color: '#8a7a72', marginBottom: '32px', lineHeight: '1.7' }}>
              Discover gowns you love and save them here for easy access.
            </p>
            <Link to="/browse" className="btn-primary" id="wishlist-browse-btn">
              Browse Collection <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <p style={{ color: '#8a7a72', marginBottom: '32px', fontSize: '0.875rem' }}>
              {wishlisted.length} dress{wishlisted.length !== 1 ? 'es' : ''} saved
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
              {wishlisted.map(d => <DressCard key={d.id} dress={d} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
