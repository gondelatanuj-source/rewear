import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import DressDetailPage from './pages/DressDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import WishlistPage from './pages/WishlistPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Require authentication — if not logged in, redirect to /login
function RequireAuth({ children }) {
  const { user } = useApp();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AppLayout() {
  const { pathname } = useLocation();
  const hideFooter = pathname === '/login';

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          {/* Public: only login */}
          <Route path="/login" element={<LoginPage />} />

          {/* All other routes require auth */}
          <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
          <Route path="/browse" element={<RequireAuth><BrowsePage /></RequireAuth>} />
          <Route path="/dress/:id" element={<RequireAuth><DressDetailPage /></RequireAuth>} />
          <Route path="/cart" element={<RequireAuth><CartPage /></RequireAuth>} />
          <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/wishlist" element={<RequireAuth><WishlistPage /></RequireAuth>} />

          {/* 404 fallback */}
          <Route path="*" element={
            <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '6rem', fontWeight: '300', color: 'rgba(201,169,110,0.3)', lineHeight: 1 }}>404</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '400', color: '#2a1f1a' }}>Page not found</h2>
              <p style={{ color: '#8a7a72' }}>The page you're looking for doesn't exist.</p>
              <a href="/" className="btn-primary" style={{ marginTop: '8px' }}>Back to Home</a>
            </div>
          } />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
