import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const getItemQuantity = useCallback(
    (itemId) => cart.find((item) => item.id === itemId)?.quantity ?? 0,
    [cart]
  );

  const addItem = useCallback((menuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const increaseItem = useCallback((itemId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseItem = useCallback((itemId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const checkout = useCallback(() => {
    if (cart.length === 0) {
      window.alert("Your cart is empty!");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    window.alert(
      `Order placed! Total: ₹${total.toFixed(
        2
      )}\n\nThank you for ordering with QuickByte! 🍕`
    );
    setCart([]);
    setIsCartOpen(false);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      toggleCart: () => setIsCartOpen((prev) => !prev),
      addItem,
      increaseItem,
      decreaseItem,
      removeItem,
      clearCart,
      checkout,
      getItemQuantity,
    }),
    [
      cart,
      cartCount,
      cartTotal,
      isCartOpen,
      addItem,
      increaseItem,
      decreaseItem,
      removeItem,
      clearCart,
      checkout,
      getItemQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}


