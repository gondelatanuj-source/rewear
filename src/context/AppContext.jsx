import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rewear_cart')) || [];
    } catch { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rewear_wishlist')) || [];
    } catch { return []; }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rewear_user')) || null;
    } catch { return null; }
  });

  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rewear_orders')) || [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('rewear_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rewear_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('rewear_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rewear_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id && i.startDate === item.startDate && i.endDate === item.endDate);
      if (exists) return prev;
      return [...prev, { ...item, cartId: Date.now() }];
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (dressId) => {
    setWishlist(prev =>
      prev.includes(dressId) ? prev.filter(id => id !== dressId) : [...prev, dressId]
    );
  };

  const isWishlisted = (dressId) => wishlist.includes(dressId);

  const cartTotal = cart.reduce((sum, item) => {
    const days = item.days || 1;
    return sum + item.price * days;
  }, 0);

  const cartCount = cart.length;

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const placeOrder = (orderData) => {
    const order = {
      id: `RW${Date.now()}`,
      date: new Date().toISOString(),
      status: 'confirmed',
      ...orderData,
      items: [...cart],
      total: cartTotal + 50, // Including delivery
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order;
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount,
      wishlist, toggleWishlist, isWishlisted,
      user, login, logout,
      orders, placeOrder,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
