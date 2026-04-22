import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Leaf, ShieldCheck, Sparkles, RefreshCw, Star } from 'lucide-react';
import { dresses, testimonials } from '../data/dresses';
import DressCard from '../components/DressCard';

// Animated counter
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 25);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Stars
function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={14} fill={i <= rating ? '#c9a96e' : 'none'} color="#c9a96e" />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide(s => (s + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const featured = dresses.filter(d => d.tags?.includes('bestseller') || d.rating >= 4.8).slice(0, 4);

  const steps = [
    { icon: '🔍', number: '01', title: 'Browse & Discover', desc: 'Explore hundreds of designer gowns filtered by style, size, and price.' },
    { icon: '📅', number: '02', title: 'Select Your Dates', desc: 'Choose your rental window — typically 3-5 days around your wedding.' },
    { icon: '👗', number: '03', title: 'Wear & Shine', desc: 'Receive your dress, professionally steamed and hygiene-certified.' },
    { icon: '📦', number: '04', title: 'Easy Return', desc: 'Use our prepaid return label. We handle everything after that.' },
  ];

  const features = [
    {
      icon: <ShieldCheck size={28} color="#c9a96e" />,
      title: 'Verified Designer Pieces',
      desc: 'Every dress is authenticated, professionally cleaned, and inspected before and after each rental.',
    },
    {
      icon: <Leaf size={28} color="#34a853" />,
      title: 'Sustainable Fashion',
      desc: "Renting reduces fashion's environmental impact by 79%. Wear luxury while caring for the planet.",
    },
    {
      icon: <Sparkles size={28} color="#c9a96e" />,
      title: 'Try Before You Rent',
      desc: 'Visit our showroom or request a 24-hour home trial to ensure your perfect fit.',
    },
    {
      icon: <RefreshCw size={28} color="#9a7a48" />,
      title: 'Hassle-Free Returns',
      desc: 'Prepaid return labels, doorstep pickup, and zero hidden charges. We make it effortless.',
    },
  ];

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '640px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #1a0f0a 0%, #3d1f15 50%, #2a1208 100%)',
        }} />
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
          alt="Bridal gown hero"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5,
            mixBlendMode: 'luminosity',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)',
        }} />

        {/* Gold particles decoration */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: 'rgba(201, 169, 110, 0.6)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `fadeIn ${Math.random() * 2 + 1}s ease infinite alternate`,
          }} />
        ))}

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '760px',
        }}>
          <p className="section-label animate-fade-up" style={{ color: 'rgba(201, 169, 110, 0.9)', marginBottom: '20px' }}>
            ✦ Luxury Bridal Rentals ✦
          </p>
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: '300',
              color: 'white',
              lineHeight: '1.1',
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            Wear Your Dream,<br />
            <em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>Not the Price</em>
          </h1>
          <p
            className="animate-fade-up delay-200"
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '40px',
              lineHeight: '1.7',
              fontWeight: '300',
            }}
          >
            Rent world-class designer bridal gowns from ₹189/day.<br />
            Look extraordinary. Feel guilt-free. Love sustainably.
          </p>
          <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/browse" className="btn-primary" id="hero-browse-btn">
              Browse Dresses <ArrowRight size={16} />
            </Link>
            <Link to="/browse" className="btn-outline" id="hero-rent-btn" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
              How It Works
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="animate-fade-up delay-400"
            style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '48px', flexWrap: 'wrap' }}
          >
            {[
              { value: '500+', label: 'Designer Gowns' },
              { value: '2000+', label: 'Happy Brides' },
              { value: '100%', label: 'Hygiene Verified' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: '500', color: '#e8d5b0' }}>{value}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 2s ease 1s both',
        }}>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown size={18} color="rgba(201, 169, 110, 0.7)" style={{ animation: 'fadeUp 1.5s ease infinite' }} />
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section style={{
        background: 'linear-gradient(135deg, #c9a96e 0%, #9a7a48 100%)',
        padding: '32px 24px',
      }}>
        <div className="max-w-5xl mx-auto" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '24px',
          textAlign: 'center',
        }}>
          {[
            { target: 500, suffix: '+', label: 'Gowns Available' },
            { target: 2000, suffix: '+', label: 'Brides Served' },
            { target: 50, suffix: '+', label: 'Designer Labels' },
            { target: 100, suffix: '%', label: 'Satisfaction Rate' },
          ].map(({ target, suffix, label }) => (
            <div key={label}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: '600', color: 'white' }}>
                <Counter target={target} suffix={suffix} />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '96px 24px', background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="section-label" style={{ marginBottom: '12px' }}>Why Choose Rewear</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '400', color: '#2a1f1a' }}>
              Luxury That Loves the Planet
            </h2>
            <div className="divider" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
          }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: '36px 32px',
                  background: 'white',
                  borderRadius: '4px',
                  boxShadow: '0 2px 20px rgba(42,31,26,0.06)',
                  transition: 'all 0.4s ease',
                  borderTop: '3px solid transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderTopColor = '#c9a96e';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(42,31,26,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderTopColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 20px rgba(42,31,26,0.06)';
                }}
              >
                <div style={{ marginBottom: '20px' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: '500', marginBottom: '12px', color: '#2a1f1a' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.7', color: '#8a7a72' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DRESSES ── */}
      <section style={{ padding: '96px 24px', background: '#faf5ef' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '12px' }}>Curated Collection</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '400', color: '#2a1f1a' }}>
                Most Loved Gowns
              </h2>
            </div>
            <Link to="/browse" className="btn-outline">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '28px',
          }}>
            {(loading ? Array(4).fill(null) : featured).map((dress, i) => (
              <DressCard key={dress?.id || i} dress={dress} loading={loading} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding: '96px 24px',
        background: 'linear-gradient(135deg, #1a1310 0%, #2a1f1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative gold circles */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          border: '1px solid rgba(201, 169, 110, 0.1)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '500px',
          height: '500px',
          border: '1px solid rgba(201, 169, 110, 0.07)',
          borderRadius: '50%',
        }} />

        <div className="max-w-7xl mx-auto" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="section-label" style={{ color: '#c9a96e', marginBottom: '12px' }}>Simple Process</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '400', color: 'white' }}>
              How Rewear Works
            </h2>
            <div className="divider" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
          }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '40px 24px',
                position: 'relative',
              }}>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '52px',
                    right: '-50%',
                    width: '100%',
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(201, 169, 110, 0.4), transparent)',
                    display: 'none',
                  }} className="lg:block" />
                )}
                <div style={{
                  width: '72px',
                  height: '72px',
                  margin: '0 auto 24px',
                  background: 'rgba(201, 169, 110, 0.1)',
                  border: '1px solid rgba(201, 169, 110, 0.25)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(201, 169, 110, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(201, 169, 110, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {step.icon}
                </div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.8rem', color: '#c9a96e', letterSpacing: '0.2em', marginBottom: '8px' }}>
                  {step.number}
                </p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: 'white', marginBottom: '12px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/browse" className="btn-primary" id="how-it-works-cta">
              Start Browsing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '96px 24px', background: 'var(--ivory)' }}>
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="section-label" style={{ marginBottom: '12px' }}>Bride Stories</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '400', color: '#2a1f1a' }}>
              Loved by Real Brides
            </h2>
            <div className="divider" />
          </div>

          {/* Main testimonial */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '48px',
            boxShadow: '0 8px 40px rgba(42,31,26,0.08)',
            textAlign: 'center',
            transition: 'all 0.5s ease',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src={testimonials[currentSlide].image}
              alt={testimonials[currentSlide].name}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #e8d5b0',
                marginBottom: '20px',
              }}
            />
            <Stars rating={testimonials[currentSlide].rating} />
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.3rem',
              fontStyle: 'italic',
              color: '#2a1f1a',
              lineHeight: '1.7',
              margin: '20px 0',
              maxWidth: '600px',
            }}>
              "{testimonials[currentSlide].text}"
            </p>
            <div>
              <p style={{ fontWeight: '600', color: '#2a1f1a', marginBottom: '4px' }}>{testimonials[currentSlide].name}</p>
              <p style={{ fontSize: '0.8rem', color: '#c9a96e' }}>{testimonials[currentSlide].dress}</p>
              <p style={{ fontSize: '0.75rem', color: '#8a7a72' }}>{testimonials[currentSlide].location} · {testimonials[currentSlide].date}</p>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  width: i === currentSlide ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === currentSlide ? '#c9a96e' : 'rgba(201, 169, 110, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #f7d6d0 0%, #f5e6c8 50%, #fdf8f2 100%)',
        textAlign: 'center',
      }}>
        <div className="max-w-3xl mx-auto">
          <p className="section-label" style={{ marginBottom: '16px' }}>Your Perfect Day Awaits</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '400', color: '#2a1f1a', marginBottom: '20px' }}>
            Ready to Find Your<br />
            <em style={{ color: '#c9a96e' }}>Dream Dress?</em>
          </h2>
          <p style={{ fontSize: '1rem', color: '#8a7a72', marginBottom: '40px', lineHeight: '1.7' }}>
            Join thousands of brides who chose Rewear for their most special day.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/browse" className="btn-primary" id="cta-browse-btn">
              Browse Collection <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-ghost" id="cta-signup-btn">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
