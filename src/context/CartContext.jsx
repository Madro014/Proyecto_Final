import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export function useCart() {
  return useContext(CartContext);
}

// Proveedor del contexto
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Añadir producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // Calcular total del carrito
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}