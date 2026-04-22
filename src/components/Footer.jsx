import { Link } from 'react-router-dom';
import { Share2, MessageCircle, Camera, MapPin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#1a1310',
      color: 'rgba(255,255,255,0.75)',
      paddingTop: '64px',
    }}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(201, 169, 110, 0.15)',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
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
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: '600', color: 'white', letterSpacing: '0.05em' }}>
                Rewear
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px', color: 'rgba(255,255,255,0.55)' }}>
              Luxury bridal gown rentals for the modern bride. Wear your dream dress without compromising on sustainability.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
            {[Camera, Share2, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(201, 169, 110, 0.1)',
                    border: '1px solid rgba(201, 169, 110, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(201, 169, 110, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(201, 169, 110, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.2)';
                  }}
                >
                  <Icon size={15} color="#c9a96e" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'white', marginBottom: '20px', letterSpacing: '0.05em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/browse', label: 'Browse Dresses' },
                { to: '/cart', label: 'My Cart' },
                { to: '/dashboard', label: 'My Account' },
                { to: '/login', label: 'Sign In' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.55)',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#c9a96e'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'white', marginBottom: '20px', letterSpacing: '0.05em' }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Try Before You Rent', 'Express Delivery', 'Personal Styling', 'Alterations', 'Hygiene Guarantee', 'Easy Returns'].map(s => (
                <li key={s} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'white', marginBottom: '20px', letterSpacing: '0.05em' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { Icon: MapPin, text: '14 Bridal Lane, Bandra West\nMumbai, Maharashtra 400050' },
                { Icon: Phone, text: '+91 98765 43210' },
                { Icon: Mail, text: 'hello@rewear.in' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Icon size={15} color="#c9a96e" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.5', whiteSpace: 'pre-line' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            © 2024 Rewear. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Made with <Heart size={12} color="#d4818a" fill="#d4818a" /> for modern brides
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms', 'Rental Agreement'].map(t => (
              <a key={t} href="#" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
