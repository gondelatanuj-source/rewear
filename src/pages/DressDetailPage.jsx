import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ShieldCheck, Leaf, Truck, RefreshCw, ChevronLeft, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dresses } from '../data/dresses';
import { useApp } from '../context/AppContext';
import DressCard from '../components/DressCard';

export default function DressDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useApp();

  const dress = dresses.find(d => d.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [added, setAdded] = useState(false);

  if (!dress) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', padding: '120px 24px' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', marginBottom: '16px' }}>Dress not found</h2>
        <Link to="/browse" className="btn-primary">Browse All Dresses</Link>
      </div>
    );
  }

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)))
    : 0;

  const totalPrice = days * dress.price;
  const wishlisted = isWishlisted(dress.id);

  const handleAddToCart = () => {
    if (!selectedSize) { alert('Please select a size'); return; }
    if (!startDate || !endDate) { alert('Please select rental dates'); return; }

    addToCart({
      id: dress.id,
      name: dress.name,
      designer: dress.designer,
      price: dress.price,
      image: dress.images[0],
      size: selectedSize,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      days,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const related = dresses.filter(d => d.id !== dress.id && (d.category === dress.category || d.designer === dress.designer)).slice(0, 4);

  return (
    <div className="page-enter" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--ivory)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '0.8rem', color: '#8a7a72' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#8a7a72' }}>
            <ArrowLeft size={14} /> Back
          </button>
          <span>/</span>
          <Link to="/browse" style={{ color: '#8a7a72', textDecoration: 'none' }}>Browse</Link>
          <span>/</span>
          <span style={{ color: '#2a1f1a' }}>{dress.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }} className="md:grid-cols-2 grid-cols-1">
          {/* Left: Gallery */}
          <div>
            {/* Main Image */}
            <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <img
                src={dress.images[selectedImage]}
                alt={dress.name}
                style={{ width: '100%', height: '560px', objectFit: 'cover', display: 'block' }}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'; }}
              />

              {/* Nav arrows */}
              {dress.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((selectedImage - 1 + dress.images.length) % dress.images.length)}
                    style={{
                      position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedImage((selectedImage + 1) % dress.images.length)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {dress.tags?.includes('bestseller') && (
                  <span className="badge badge-gold">✦ Bestseller</span>
                )}
                {dress.tags?.includes('luxury') && (
                  <span className="badge badge-gold">✦ Luxury</span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
              {dress.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{
                    width: '80px',
                    height: '100px',
                    flexShrink: 0,
                    borderRadius: '2px',
                    overflow: 'hidden',
                    border: `2px solid ${i === selectedImage ? '#c9a96e' : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'border-color 0.3s',
                    padding: 0,
                    background: 'none',
                  }}
                >
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'; }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            {/* Designer & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#c9a96e', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {dress.designer}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} fill={i <= Math.floor(dress.rating) ? '#c9a96e' : 'none'} color="#c9a96e" />
                  ))}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#8a7a72' }}>{dress.rating} ({dress.reviews} reviews)</span>
              </div>
            </div>

            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.4rem', fontWeight: '400', color: '#2a1f1a', marginBottom: '8px', lineHeight: '1.2' }}>
              {dress.name}
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#8a7a72', marginBottom: '20px' }}>
              {dress.category} · {dress.fabric}
            </p>

            {/* Pricing */}
            <div style={{
              padding: '20px',
              background: 'rgba(201, 169, 110, 0.06)',
              border: '1px solid rgba(201, 169, 110, 0.2)',
              borderRadius: '4px',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '600', color: '#2a1f1a' }}>
                    ₹{dress.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#8a7a72' }}>/day</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#8a7a72', textDecoration: 'line-through' }}>
                  Retail: ₹{dress.originalPrice.toLocaleString()}
                </span>
                <span className="badge badge-green">
                  Save {Math.round((1 - dress.price * 7 / dress.originalPrice) * 100)}%
                </span>
              </div>
              {days > 0 && (
                <div style={{ borderTop: '1px solid rgba(201, 169, 110, 0.15)', paddingTop: '12px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#8a7a72', marginBottom: '4px' }}>
                    <span>₹{dress.price} × {days} day{days > 1 ? 's' : ''}</span>
                    <span>₹{(dress.price * days).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#8a7a72', marginBottom: '8px' }}>
                    <span>Delivery & hygiene</span>
                    <span>₹50</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '700', color: '#2a1f1a', borderTop: '1px solid rgba(42,31,26,0.1)', paddingTop: '8px' }}>
                    <span>Total</span>
                    <span>₹{(totalPrice + 50).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', lineHeight: '1.8', color: '#5a4a42', marginBottom: '24px' }}>
              {dress.description}
            </p>

            {/* Size Selection */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '12px', color: '#2a1f1a' }}>
                Select Size {selectedSize && <span style={{ color: '#c9a96e' }}>— {selectedSize}</span>}
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {dress.sizes.map(s => (
                  <button
                    key={s}
                    id={`size-btn-${s}`}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      width: '52px',
                      height: '44px',
                      borderRadius: '2px',
                      border: `1px solid ${selectedSize === s ? '#c9a96e' : 'rgba(42,31,26,0.2)'}`,
                      background: selectedSize === s ? '#c9a96e' : 'white',
                      color: selectedSize === s ? 'white' : '#2a1f1a',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Picker */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '12px', color: '#2a1f1a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={15} color="#c9a96e" /> Select Rental Dates
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#8a7a72', display: 'block', marginBottom: '4px' }}>Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => { setStartDate(date); if (endDate && date >= endDate) setEndDate(null); }}
                    minDate={new Date()}
                    dateFormat="dd MMM yyyy"
                    placeholderText="Select date"
                    customInput={<input className="input" readOnly style={{ cursor: 'pointer' }} />}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#8a7a72', display: 'block', marginBottom: '4px' }}>Return Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={setEndDate}
                    minDate={startDate || new Date()}
                    dateFormat="dd MMM yyyy"
                    placeholderText="Select date"
                    customInput={<input className="input" readOnly style={{ cursor: 'pointer' }} />}
                  />
                </div>
              </div>
              {days > 0 && (
                <p style={{ fontSize: '0.8rem', color: '#c9a96e', marginTop: '8px' }}>
                  ✓ {days} day rental selected
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                className="btn-primary"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  background: added ? 'linear-gradient(135deg, #34a853, #2d7a3a)' : undefined,
                }}
                disabled={!dress.available}
              >
                <ShoppingBag size={16} />
                {!dress.available ? 'Not Available' : added ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              <button
                id="wishlist-btn"
                onClick={() => toggleWishlist(dress.id)}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '2px',
                  border: `1px solid ${wishlisted ? '#d4818a' : 'rgba(42,31,26,0.2)'}`,
                  background: wishlisted ? 'rgba(212,129,138,0.1)' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  flexShrink: 0,
                }}
              >
                <Heart size={18} fill={wishlisted ? '#d4818a' : 'none'} color={wishlisted ? '#d4818a' : '#8a7a72'} />
              </button>
            </div>

            {added && (
              <div style={{ marginBottom: '16px' }}>
                <Link to="/cart" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  View Cart & Checkout →
                </Link>
              </div>
            )}

            {/* Trust Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              padding: '20px',
              background: 'white',
              borderRadius: '4px',
              border: '1px solid rgba(42,31,26,0.08)',
            }}>
              {[
                { icon: <ShieldCheck size={16} color="#c9a96e" />, text: 'Verified Designer' },
                { icon: <Leaf size={16} color="#34a853" />, text: 'Eco-Certified' },
                { icon: <Truck size={16} color="#c9a96e" />, text: 'Free Delivery' },
                { icon: <RefreshCw size={16} color="#9a7a48" />, text: 'Easy Returns' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#5a4a42' }}>
                  {icon} {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Dresses */}
        {related.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p className="section-label" style={{ marginBottom: '8px' }}>You May Also Love</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '400', color: '#2a1f1a' }}>
                Similar Gowns
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '28px' }}>
              {related.map(d => <DressCard key={d.id} dress={d} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
