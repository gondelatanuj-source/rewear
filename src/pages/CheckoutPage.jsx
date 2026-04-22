import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, ChevronRight, Building, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';

const STEPS = ['Details', 'Address', 'Payment', 'Confirm'];

function StepIndicator({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
      {STEPS.map((step, i) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: '600',
              background: i < current ? '#c9a96e' : i === current ? 'linear-gradient(135deg, #c9a96e, #9a7a48)' : 'rgba(42,31,26,0.1)',
              color: i <= current ? 'white' : '#8a7a72',
              transition: 'all 0.3s',
            }}>
              {i < current ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: '0.7rem', color: i <= current ? '#c9a96e' : '#8a7a72', marginTop: '4px', whiteSpace: 'nowrap' }}>{step}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ width: '60px', height: '1px', background: i < current ? '#c9a96e' : 'rgba(42,31,26,0.1)', margin: '0 8px', marginBottom: '18px' }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ✅ Defined OUTSIDE CheckoutPage so it never remounts on re-render
function Field({ label, name, type = 'text', placeholder, half = false, format, form, errors, onSet }) {
  const handleChange = (e) => {
    let val = e.target.value;
    if (format === 'card') val = val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    if (format === 'expiry') val = val.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5);
    if (format === 'cvv') val = val.replace(/\D/g, '').slice(0, 4);
    if (format === 'phone') val = val.replace(/\D/g, '').slice(0, 10);
    if (format === 'pin') val = val.replace(/\D/g, '').slice(0, 6);
    onSet(name, val);
  };

  return (
    <div style={{ flex: half ? '1' : 'none', width: half ? 'auto' : '100%' }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#2a1f1a', marginBottom: '6px', letterSpacing: '0.03em' }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        className="input"
        style={{ borderColor: errors[name] ? '#d4818a' : undefined }}
      />
      {errors[name] && <p style={{ fontSize: '0.72rem', color: '#d4818a', marginTop: '4px' }}>{errors[name]}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, cartTotal, user, placeOrder } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState(null);
  const [payMethod, setPayMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = 'Required';
      if (!form.lastName.trim()) e.lastName = 'Required';
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Invalid email';
      if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter valid 10-digit mobile';
    }
    if (step === 1) {
      if (!form.address.trim()) e.address = 'Required';
      if (!form.city.trim()) e.city = 'Required';
      if (!form.state.trim()) e.state = 'Required';
      if (!form.pincode.match(/^\d{6}$/)) e.pincode = '6-digit pincode required';
    }
    if (step === 2 && payMethod === 'card') {
      if (!form.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) e.cardNumber = 'Enter valid 16-digit card number';
      if (!form.cardName.trim()) e.cardName = 'Required';
      if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Format: MM/YY';
      if (!form.cvv.match(/^\d{3,4}$/)) e.cvv = 'Invalid CVV';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) {
      if (step === 2) {
        setLoading(true);
        setTimeout(() => {
          const o = placeOrder({ form });
          setOrder(o);
          setStep(3);
          setLoading(false);
        }, 2000);
      } else {
        setStep(s => s + 1);
      }
    }
  };

  const delivery = 50;
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + delivery + tax;

  // Shared props for Field — stable references passed as props, not closures recreated on each render
  const fieldProps = { form, errors, onSet: set };

  if (cart.length === 0 && step < 3) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', padding: '120px 24px' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', marginBottom: '16px' }}>Your cart is empty</h2>
        <Link to="/browse" className="btn-primary">Browse Dresses</Link>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--ivory)' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: '400', textAlign: 'center', marginBottom: '8px', color: '#2a1f1a' }}>
          Checkout
        </h1>
        <p style={{ textAlign: 'center', color: '#8a7a72', marginBottom: '40px', fontSize: '0.875rem' }}>
          <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} /> Secure & Encrypted Payment
        </p>

        <StepIndicator current={step} />

        {/* Confirmation */}
        {step === 3 && order ? (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #c9a96e, #9a7a48)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              animation: 'pulse-gold 2s infinite',
            }}>
              <CheckCircle size={40} color="white" />
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: '400', marginBottom: '12px', color: '#2a1f1a' }}>
              Order Confirmed!
            </h2>
            <p style={{ color: '#8a7a72', marginBottom: '8px', fontSize: '1rem' }}>
              Thank you, {form.firstName}! Your dream dress is being prepared. ✨
            </p>
            <p style={{ color: '#c9a96e', fontWeight: '600', marginBottom: '32px', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>
              Order ID: {order.id}
            </p>

            <div style={{
              background: 'white',
              borderRadius: '4px',
              padding: '24px',
              maxWidth: '400px',
              margin: '0 auto 32px',
              boxShadow: '0 4px 20px rgba(42,31,26,0.08)',
              textAlign: 'left',
            }}>
              <h4 style={{ fontWeight: '600', marginBottom: '16px', color: '#2a1f1a' }}>Order Details</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8a7a72' }}>Total Paid</span>
                  <span style={{ fontWeight: '600', color: '#2a1f1a' }}>₹{order.total.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8a7a72' }}>Delivery to</span>
                  <span style={{ color: '#2a1f1a' }}>{form.city}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8a7a72' }}>Status</span>
                  <span className="badge badge-green">Confirmed</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/dashboard" className="btn-primary">View Orders</Link>
              <Link to="/browse" className="btn-ghost">Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start' }}>
            {/* Form */}
            <div style={{ background: 'white', borderRadius: '4px', padding: '32px', boxShadow: '0 2px 20px rgba(42,31,26,0.06)' }}>
              {/* Step 0: Personal Details */}
              {step === 0 && (
                <div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', marginBottom: '24px', color: '#2a1f1a' }}>
                    Personal Details
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <Field {...fieldProps} label="First Name" name="firstName" placeholder="Priya" half />
                    <Field {...fieldProps} label="Last Name" name="lastName" placeholder="Sharma" half />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Field {...fieldProps} label="Email Address" name="email" type="email" placeholder="priya@example.com" />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Field {...fieldProps} label="Mobile Number" name="phone" placeholder="9876543210" format="phone" />
                  </div>
                </div>
              )}

              {/* Step 1: Address */}
              {step === 1 && (
                <div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', marginBottom: '24px', color: '#2a1f1a' }}>
                    Delivery Address
                  </h3>
                  <div style={{ marginBottom: '16px' }}>
                    <Field {...fieldProps} label="Street Address" name="address" placeholder="123 Wedding Lane, Bandra West" />
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <Field {...fieldProps} label="City" name="city" placeholder="Mumbai" half />
                    <Field {...fieldProps} label="State" name="state" placeholder="Maharashtra" half />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Field {...fieldProps} label="PIN Code" name="pincode" placeholder="400050" format="pin" />
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', marginBottom: '24px', color: '#2a1f1a' }}>
                    Payment Method
                  </h3>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    {[
                      { id: 'card', label: 'Card', Icon: CreditCard },
                      { id: 'upi', label: 'UPI', Icon: Smartphone },
                      { id: 'netbanking', label: 'Net Banking', Icon: Building },
                    ].map(({ id, label, Icon }) => (
                      <button
                        key={id}
                        onClick={() => setPayMethod(id)}
                        style={{
                          flex: 1,
                          padding: '12px 8px',
                          border: `1px solid ${payMethod === id ? '#c9a96e' : 'rgba(42,31,26,0.15)'}`,
                          borderRadius: '4px',
                          background: payMethod === id ? 'rgba(201, 169, 110, 0.08)' : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s',
                        }}
                      >
                        <Icon size={20} color={payMethod === id ? '#c9a96e' : '#8a7a72'} />
                        <span style={{ fontSize: '0.8rem', fontWeight: '500', color: payMethod === id ? '#c9a96e' : '#8a7a72' }}>{label}</span>
                      </button>
                    ))}
                  </div>

                  {payMethod === 'card' && (
                    <div>
                      <div style={{ marginBottom: '16px' }}>
                        <Field {...fieldProps} label="Card Number" name="cardNumber" placeholder="4242 4242 4242 4242" format="card" />
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Field {...fieldProps} label="Cardholder Name" name="cardName" placeholder="PRIYA SHARMA" />
                      </div>
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <Field {...fieldProps} label="Expiry (MM/YY)" name="expiry" placeholder="12/26" format="expiry" half />
                        <Field {...fieldProps} label="CVV" name="cvv" type="password" placeholder="•••" format="cvv" half />
                      </div>
                    </div>
                  )}

                  {payMethod === 'upi' && (
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#2a1f1a', marginBottom: '6px' }}>UPI ID</label>
                      <input type="text" placeholder="priya@upi" className="input" />
                    </div>
                  )}

                  {payMethod === 'netbanking' && (
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#2a1f1a', marginBottom: '6px' }}>Select Bank</label>
                      <select className="select">
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  <p style={{ fontSize: '0.75rem', color: '#8a7a72', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lock size={11} /> This is a mock payment — no real charges will be made.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: step > 0 ? 'space-between' : 'flex-end' }}>
                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)} className="btn-ghost">
                    ← Back
                  </button>
                )}
                <button
                  id={`checkout-step-${step}-next`}
                  onClick={next}
                  className="btn-primary"
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Processing...' : step === 2 ? 'Place Order 🎉' : 'Continue'}
                  {!loading && <ChevronRight size={16} />}
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div style={{ background: 'white', borderRadius: '4px', padding: '24px', boxShadow: '0 2px 20px rgba(42,31,26,0.06)' }}>
              <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: '500', marginBottom: '20px', color: '#2a1f1a' }}>
                Your Order
              </h4>
              {cart.map(item => (
                <div key={item.cartId} style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '56px', height: '72px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80'; }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#2a1f1a', marginBottom: '2px' }}>{item.name}</p>
                    <p style={{ fontSize: '0.72rem', color: '#8a7a72' }}>Size {item.size} · {item.days}d</p>
                    <p style={{ fontSize: '0.8rem', color: '#c9a96e', fontWeight: '600' }}>₹{(item.price * item.days).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(42,31,26,0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8a7a72' }}>
                  <span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8a7a72' }}>
                  <span>Delivery</span><span>₹{delivery}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8a7a72' }}>
                  <span>GST</span><span>₹{tax}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#2a1f1a', borderTop: '1px solid rgba(42,31,26,0.08)', paddingTop: '8px', fontSize: '1rem' }}>
                  <span>Total</span><span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
