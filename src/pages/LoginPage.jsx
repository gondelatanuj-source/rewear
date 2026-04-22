import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const DEFAULT_EMAIL = 'babi@gmail.com';
  const DEFAULT_PASS = '12345678';
  const [form, setForm] = useState({ name: '', email: DEFAULT_EMAIL, password: DEFAULT_PASS });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      // Accept default credentials without strict match
      const resolvedName = mode === 'signup' ? form.name
        : form.email === DEFAULT_EMAIL ? 'Babi' : form.email.split('@')[0];
      login({
        id: Date.now(),
        name: resolvedName,
        email: form.email,
        joinDate: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || form.email)}&background=c9a96e&color=fff&size=128`,
      });
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      login({
        id: Date.now(),
        name: 'Priya Sharma',
        email: 'priya@example.com',
        joinDate: new Date().toISOString(),
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=128&q=80',
      });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="page-enter" style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'stretch' }}>
      {/* Left Panel */}
      <div style={{
        flex: 1,
        display: 'none',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '48px',
        background: 'linear-gradient(135deg, #1a1310, #2a1f1a)',
        position: 'relative',
        overflow: 'hidden',
      }} className="md:flex">
        <img
          src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80"
          alt="Bridal"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, mixBlendMode: 'luminosity' }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-label" style={{ color: '#c9a96e', marginBottom: '16px' }}>Welcome to Rewear</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: '300', color: 'white', lineHeight: '1.2', marginBottom: '20px' }}>
            Your dream dress is<br />
            <em style={{ color: '#e8d5b0' }}>waiting for you</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: '1.7' }}>
            Join 2,000+ brides who've already found their perfect gown through Rewear.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        padding: '48px 40px',
        background: 'var(--ivory)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #c9a96e, #9a7a48)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '700', fontFamily: 'Cormorant Garamond, serif' }}>R</span>
          </div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: '600', color: '#2a1f1a' }}>Rewear</span>
        </Link>

        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '400', color: '#2a1f1a', marginBottom: '8px' }}>
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h1>
        <p style={{ color: '#8a7a72', fontSize: '0.875rem', marginBottom: '20px' }}>
          {mode === 'login'
            ? 'Sign in to access your orders and wishlist.'
            : 'Start your bridal journey with Rewear.'}
        </p>

        {/* Demo credentials banner */}
        {mode === 'login' && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.06))',
            border: '1px solid rgba(201,169,110,0.35)',
            borderRadius: '4px',
            padding: '12px 16px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            <p style={{ fontSize: '0.72rem', fontWeight: '700', color: '#9a7a48', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
              ✦ Demo Account — Pre-filled
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: '#5a4a42' }}>
                <span style={{ color: '#8a7a72' }}>Email:</span> <strong>babi@gmail.com</strong>
              </span>
              <span style={{ fontSize: '0.8rem', color: '#5a4a42' }}>
                <span style={{ color: '#8a7a72' }}>Password:</span> <strong>12345678</strong>
              </span>
            </div>
          </div>
        )}

        {/* Google Sign In */}
        <button
          id="google-signin-btn"
          onClick={handleGoogle}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid rgba(42,31,26,0.15)',
            borderRadius: '2px',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            marginBottom: '20px',
            fontSize: '0.875rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            color: '#2a1f1a',
            transition: 'all 0.3s',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(42,31,26,0.1)' }} />
          <span style={{ fontSize: '0.75rem', color: '#8a7a72' }}>or with email</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(42,31,26,0.1)' }} />
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#2a1f1a', marginBottom: '6px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8a7a72' }} />
                <input
                  type="text"
                  id="signup-name"
                  placeholder="Priya Sharma"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  className="input"
                  style={{ paddingLeft: '40px', borderColor: errors.name ? '#d4818a' : undefined }}
                />
              </div>
              {errors.name && <p style={{ fontSize: '0.72rem', color: '#d4818a', marginTop: '4px' }}>{errors.name}</p>}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#2a1f1a', marginBottom: '6px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8a7a72' }} />
              <input
                type="email"
                id="email-input"
                placeholder="priya@example.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                className="input"
                style={{ paddingLeft: '40px', borderColor: errors.email ? '#d4818a' : undefined }}
              />
            </div>
            {errors.email && <p style={{ fontSize: '0.72rem', color: '#d4818a', marginTop: '4px' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#2a1f1a', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8a7a72' }} />
              <input
                type={showPass ? 'text' : 'password'}
                id="password-input"
                placeholder="••••••••"
                value={form.password}
                onChange={e => set('password', e.target.value)}
                className="input"
                style={{ paddingLeft: '40px', paddingRight: '44px', borderColor: errors.password ? '#d4818a' : undefined }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPass ? <EyeOff size={15} color="#8a7a72" /> : <Eye size={15} color="#8a7a72" />}
              </button>
            </div>
            {errors.password && <p style={{ fontSize: '0.72rem', color: '#d4818a', marginTop: '4px' }}>{errors.password}</p>}
          </div>

          <button
            type="submit"
            id="auth-submit-btn"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: '#8a7a72' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            id="toggle-auth-mode"
            onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setErrors({}); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c9a96e', fontWeight: '600' }}
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
