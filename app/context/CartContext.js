"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const STORAGE_KEY = "paradise_cart";

// قراءة السلة من localStorage
function loadCartFromStorage() {
  if (typeof window === "undefined") return { items: [], total: 0, count: 0 };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], total: 0, count: 0 };

    const parsed = JSON.parse(raw);
    return {
      items: parsed.items || [],
      total: parsed.total || 0,
      count: parsed.count || 0,
    };
  } catch (e) {
    console.error("خطأ في قراءة السلة من التخزين:", e);
    return { items: [], total: 0, count: 0 };
  }
}

// حفظ السلة في localStorage
function saveCartToStorage(cart) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("خطأ في حفظ السلة في التخزين:", e);
  }
}

function calculateTotals(items) {
  const total = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  return { total, count };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // تحميل السلة عند أول تحميل للتطبيق
  useEffect(() => {
    const cart = loadCartFromStorage();
    setItems(cart.items);
    setCartTotal(cart.total);
    setCartCount(cart.count);
  }, []);

  // تحديث التخزين في كل تغيير
  useEffect(() => {
    const { total, count } = calculateTotals(items);
    setCartTotal(total);
    setCartCount(count);
    saveCartToStorage({ items, total, count });
  }, [items]);

  // إضافة منتج للسلة
  const addItem = (payload) => {
    setItems((prev) => {
      // تعريف مفتاح فريد للعنصر (نفس المنتج مع نفس الحجم والإضافات)
      const addonsKey = JSON.stringify(
        (payload.addons || []).map((a) => ({ name: a.name, price: a.price }))
      );

      const existingIndex = prev.findIndex(
        (it) =>
          it.pizzaId === payload.pizzaId &&
          it.size === payload.size &&
          JSON.stringify(
            (it.addons || []).map((a) => ({ name: a.name, price: a.price }))
          ) === addonsKey
      );

      const basePrice = payload.basePrice;
      const addonsPrice = (payload.addons || []).reduce(
        (sum, a) => sum + (a.price || 0),
        0
      );
      const totalPrice = (basePrice + addonsPrice) * payload.quantity;

      if (existingIndex !== -1) {
        // تحديث عنصر موجود
        const updated = [...prev];
        const oldItem = updated[existingIndex];
        const newQuantity = oldItem.quantity + payload.quantity;
        updated[existingIndex] = {
          ...oldItem,
          quantity: newQuantity,
          totalPrice: (basePrice + addonsPrice) * newQuantity,
        };
        return updated;
      }

      // إضافة عنصر جديد
      const newItem = {
        id: Date.now(), // معرف بسيط محلي
        pizzaId: payload.pizzaId,
        title: payload.title,
        image: payload.image,
        size: payload.size,
        quantity: payload.quantity,
        basePrice,
        addons: payload.addons || [],
        totalPrice,
      };

      return [...prev, newItem];
    });
  };

  // تحديث الكمية
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const addonsPrice = (item.addons || []).reduce(
          (sum, a) => sum + (a.price || 0),
          0
        );
        return {
          ...item,
          quantity,
          totalPrice: (item.basePrice + addonsPrice) * quantity,
        };
      })
    );
  };

  // حذف عنصر
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // تفريغ السلة
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartTotal,
        cartCount,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
