'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem('cart', JSON.stringify(items));
  }, [items, loaded]);

  const addItem = (food, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.foodId === food.id);
      if (existing) {
        return prev.map((i) =>
          i.foodId === food.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          foodId: food.id,
          name: food.name,
          price: Number(food.price),
          image: food.image,
          restaurantId: food.restaurantId,
          quantity,
        },
      ];
    });
  };

  const updateQty = (foodId, quantity) => {
    if (quantity < 1) return removeItem(foodId);
    setItems((prev) => prev.map((i) => (i.foodId === foodId ? { ...i, quantity } : i)));
  };

  const removeItem = (foodId) => {
    setItems((prev) => prev.filter((i) => i.foodId !== foodId));
  };

  const clear = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clear, subtotal, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
