import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Lock, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, user } = useApp();

  const delivery = 50;
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + delivery + tax;

  if (cart.length === 0) {
    return (
      <div className="page-enter" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
          <ShoppingBag size={64} color="rgba(201, 169, 110, 0.3)" style={{ marginBottom: '24px' }} />
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '400', marginBottom: '12px' }}>
            Your cart is empty
          </h2>
          <p style={{ color: '#8a7a72', marginBottom: '32px', lineHeight: '1.7' }}>
            Start browsing our curated collection of designer bridal gowns.
          </p>
          <Link to="/browse" className="btn-primary" id="cart-browse-btn">
            Browse Dresses <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--ivory)' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(42,31,26,0.08)', padding: '32px 24px' }}>
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: '400', color: '#2a1f1a' }}>
            Shopping Cart
          </h1>
          <p style={{ color: '#8a7a72', marginTop: '4px' }}>
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>
          {/* Cart Items */}
          <div>
            {cart.map(item => {
              const start = new Date(item.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
              const end = new Date(item.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
              const itemTotal = item.price * item.days;

              return (
                <div
                  key={item.cartId}
                  style={{
                    background: 'white',
                    borderRadius: '4px',
                    padding: '20px',
                    marginBottom: '16px',
                    boxShadow: '0 2px 12px rgba(42,31,26,0.06)',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                  }}
                >
                  <Link to={`/dress/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100px', height: '130px', objectFit: 'cover', borderRadius: '2px', display: 'block', flexShrink: 0 }}
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80'; }}
                    />
                  </Link>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: '0.75rem', color: '#c9a96e', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                          {item.designer}
                        </p>
                        <Link to={`/dress/${item.id}`} style={{ textDecoration: 'none' }}>
                          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: '400', color: '#2a1f1a', marginBottom: '8px' }}>
                            {item.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        id={`remove-item-${item.cartId}`}
                        onClick={() => removeFromCart(item.cartId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          color: '#8a7a72',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#d4818a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#8a7a72'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#8a7a72' }}>
                        <strong style={{ color: '#2a1f1a' }}>Size:</strong> {item.size}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#8a7a72' }}>
                        <strong style={{ color: '#2a1f1a' }}>Duration:</strong> {item.days} day{item.days > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div style={{
                      background: 'rgba(201, 169, 110, 0.06)',
                      border: '1px solid rgba(201, 169, 110, 0.15)',
                      borderRadius: '2px',
                      padding: '10px 14px',
                      fontSize: '0.8rem',
                      color: '#5a4a42',
                      marginBottom: '12px',
                    }}>
                      📅 {start} → {end}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: '#8a7a72' }}>
                        ₹{item.price}/day × {item.days} days
                      </span>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: '600', color: '#2a1f1a' }}>
                        ₹{itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Promo code */}
            <div style={{ background: 'white', borderRadius: '4px', padding: '20px', boxShadow: '0 2px 12px rgba(42,31,26,0.06)' }}>
              <h4 style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Tag size={15} color="#c9a96e" /> Apply Promo Code
              </h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Enter code (e.g. BRIDE20)" className="input" style={{ flex: 1 }} />
                <button className="btn-outline" style={{ whiteSpace: 'nowrap' }}>Apply</button>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#8a7a72', marginTop: '8px' }}>Try BRIDE20 for 20% off</p>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ position: 'sticky', top: '96px' }}>
            <div style={{
              background: 'white',
              borderRadius: '4px',
              padding: '28px',
              boxShadow: '0 2px 20px rgba(42,31,26,0.08)',
            }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: '500', marginBottom: '24px', color: '#2a1f1a' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#8a7a72' }}>
                  <span>Rental ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#8a7a72' }}>
                  <span>Delivery & Hygiene</span>
                  <span>₹{delivery}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#8a7a72' }}>
                  <span>GST (5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(42,31,26,0.1)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1rem', color: '#2a1f1a' }}>
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to={user ? '/checkout' : '/login'}
                id="checkout-btn"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}
              >
                <Lock size={15} />
                {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
              </Link>

              <Link to="/browse" className="btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                Continue Shopping
              </Link>

              {/* Trust */}
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  '🔒 256-bit SSL encryption',
                  '✓ Hygiene guarantee included',
                  '↩ Easy 24h return policy',
                ].map(t => (
                  <p key={t} style={{ fontSize: '0.75rem', color: '#8a7a72' }}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
