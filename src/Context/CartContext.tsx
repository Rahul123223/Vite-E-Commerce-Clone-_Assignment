import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  orders: CartItem[][];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  getCartItemCount: () => number;
  getTotalPrice: () => number;
  placeOrder: () => void;
  getOrders: () => CartItem[][];
  clearOrders: () => void; // Added clearOrders
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<CartItem[][]>([]);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const incrementQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = () => {
    console.log("Order placed:", cart);
    setOrders((prevOrders) => [...prevOrders, [...cart]]); // Clone the current cart
    setCart([]);
  };

  const getOrders = () => {
    return orders;
  };

  const clearOrders = () => {
    setOrders([]); // Clear all orders
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        getCartItemCount,
        getTotalPrice,
        placeOrder,
        getOrders,
        clearOrders, // Provide clearOrders to the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
