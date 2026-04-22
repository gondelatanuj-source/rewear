import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Clock, RotateCcw, Heart, LogOut, ChevronRight, Star, User, Mail, Calendar, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dresses } from '../data/dresses';

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', color: '#34a853', bg: 'rgba(52,168,83,0.1)' },
  shipped: { label: 'Out for Delivery', color: '#c9a96e', bg: 'rgba(201,169,110,0.1)' },
  delivered: { label: 'Delivered', color: '#2a1f1a', bg: 'rgba(42,31,26,0.08)' },
  returned: { label: 'Returned', color: '#8a7a72', bg: 'rgba(138,122,114,0.1)' },
};

export default function DashboardPage() {
  const { user, logout, orders, wishlist } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="page-enter" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px', textAlign: 'center', flexDirection: 'column', gap: '16px' }}>
        <User size={60} color="rgba(201,169,110,0.3)" />
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '400' }}>Please sign in</h2>
        <p style={{ color: '#8a7a72' }}>Access your orders, wishlist, and rental history.</p>
        <Link to="/login" className="btn-primary" style={{ marginTop: '8px' }}>Sign In</Link>
      </div>
    );
  }

  const wishlisted = dresses.filter(d => wishlist.includes(d.id));

  const tabs = [
    { id: 'orders', label: 'Orders', Icon: Package },
    { id: 'wishlist', label: 'Wishlist', Icon: Heart },
    { id: 'profile', label: 'Profile', Icon: User },
  ];

  const sampleOrders = orders.length > 0 ? orders : [
    {
      id: 'RW20240301',
      date: '2024-03-01T10:00:00Z',
      status: 'returned',
      total: 2847,
      items: [{ name: 'Celestine A-Line', designer: 'Vera Wang', image: dresses[0].images[0], size: 'M', days: 5, price: 299 }],
    },
    {
      id: 'RW20240215',
      date: '2024-02-15T10:00:00Z',
      status: 'returned',
      total: 1946,
      items: [{ name: 'Serene Sheath', designer: 'Carolina Herrera', image: dresses[2].images[0], size: 'S', days: 7, price: 249 }],
    },
  ];

  return (
    <div className="page-enter" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--ivory)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1310, #2a1f1a)',
        padding: '48px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-60px', right: '-60px',
          width: '200px', height: '200px',
          border: '1px solid rgba(201,169,110,0.1)',
          borderRadius: '50%',
        }} />
        <div className="max-w-7xl mx-auto" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid rgba(201,169,110,0.4)', objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <p className="section-label" style={{ color: '#c9a96e', marginBottom: '4px' }}>Welcome back</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '400', color: 'white', marginBottom: '4px' }}>
              {user.name}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{user.email}</p>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {[
              { value: sampleOrders.length, label: 'Orders' },
              { value: wishlist.length, label: 'Wishlist' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '600', color: '#e8d5b0' }}>{value}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
              </div>
            ))}
          </div>

          <button
            id="logout-btn"
            onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '2px',
              padding: '10px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.8rem',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(42,31,26,0.1)', marginBottom: '32px', overflowX: 'auto' }}>
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              id={`tab-${id}`}
              onClick={() => setTab(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${tab === id ? '#c9a96e' : 'transparent'}`,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: tab === id ? '600' : '400',
                color: tab === id ? '#c9a96e' : '#8a7a72',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === 'orders' && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: '400', marginBottom: '24px', color: '#2a1f1a' }}>
              Order History
            </h2>
            {sampleOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                <ShoppingBag size={48} color="rgba(201,169,110,0.3)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '8px' }}>No orders yet</h3>
                <p style={{ color: '#8a7a72', marginBottom: '24px' }}>Start browsing and rent your dream dress!</p>
                <Link to="/browse" className="btn-primary">Browse Dresses</Link>
              </div>
            ) : (
              sampleOrders.map(order => {
                const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.confirmed;
                const date = new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
                return (
                  <div key={order.id} style={{
                    background: 'white',
                    borderRadius: '4px',
                    padding: '24px',
                    marginBottom: '16px',
                    boxShadow: '0 2px 12px rgba(42,31,26,0.06)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <p style={{ fontWeight: '700', color: '#2a1f1a', marginBottom: '2px' }}>{order.id}</p>
                        <p style={{ fontSize: '0.8rem', color: '#8a7a72', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} /> {date}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '100px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          background: status.bg,
                          color: status.color,
                        }}>
                          {status.label}
                        </span>
                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: '600', color: '#2a1f1a' }}>
                          ₹{order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {order.items?.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '12px 0', borderTop: i === 0 ? '1px solid rgba(42,31,26,0.08)' : 'none' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '64px', height: '80px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }}
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80'; }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.75rem', color: '#c9a96e', fontWeight: '600', marginBottom: '2px' }}>{item.designer}</p>
                          <p style={{ fontWeight: '600', color: '#2a1f1a', marginBottom: '4px' }}>{item.name}</p>
                          <p style={{ fontSize: '0.8rem', color: '#8a7a72' }}>Size {item.size} · {item.days} days · ₹{item.price}/day</p>
                        </div>
                        {order.status === 'returned' && (
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map(i => (
                              <Star key={i} size={14} fill={i <= 5 ? '#c9a96e' : 'none'} color="#c9a96e" />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {tab === 'wishlist' && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: '400', marginBottom: '24px', color: '#2a1f1a' }}>
              My Wishlist
            </h2>
            {wishlisted.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                <Heart size={48} color="rgba(212,129,138,0.3)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '8px' }}>Your wishlist is empty</h3>
                <p style={{ color: '#8a7a72', marginBottom: '24px' }}>Save dresses you love and come back to them anytime.</p>
                <Link to="/browse" className="btn-primary">Browse Dresses</Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
                {wishlisted.map(d => (
                  <div key={d.id} style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(42,31,26,0.06)' }}>
                    <img src={d.images[0]} alt={d.name} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80'; }} />
                    <div style={{ padding: '16px' }}>
                      <p style={{ fontSize: '0.72rem', color: '#c9a96e', fontWeight: '600', marginBottom: '4px' }}>{d.designer}</p>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', marginBottom: '8px', color: '#2a1f1a' }}>{d.name}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: '600' }}>₹{d.price}/day</span>
                        <Link to={`/dress/${d.id}`} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.72rem' }}>View</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {tab === 'profile' && (
          <div style={{ maxWidth: '520px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: '400', marginBottom: '24px', color: '#2a1f1a' }}>
              My Profile
            </h2>
            <div style={{ background: 'white', borderRadius: '4px', padding: '32px', boxShadow: '0 2px 12px rgba(42,31,26,0.06)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid rgba(201,169,110,0.3)', objectFit: 'cover', marginBottom: '12px' }}
                />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#2a1f1a' }}>{user.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#8a7a72' }}>Member since {new Date(user.joinDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { Icon: User, label: 'Full Name', value: user.name },
                  { Icon: Mail, label: 'Email', value: user.email },
                ].map(({ Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px', background: 'rgba(201,169,110,0.04)', borderRadius: '4px', border: '1px solid rgba(201,169,110,0.1)' }}>
                    <Icon size={16} color="#c9a96e" />
                    <div>
                      <p style={{ fontSize: '0.72rem', color: '#8a7a72', marginBottom: '2px' }}>{label}</p>
                      <p style={{ fontSize: '0.9rem', color: '#2a1f1a', fontWeight: '500' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="btn-ghost"
                style={{ width: '100%', justifyContent: 'center', marginTop: '24px', color: '#d4818a', borderColor: 'rgba(212,129,138,0.3)' }}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
