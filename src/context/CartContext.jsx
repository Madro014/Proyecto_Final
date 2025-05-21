import React, { createContext, useContext, useState, useCallback } from 'react';


const CartContext = createContext();


export function useCart() {
  return useContext(CartContext);
}

// Proveedor del contexto
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [productStock, setProductStock] = useState({});

 
  const initializeProductStock = (productId, stock) => {
    setProductStock(prev => ({
      ...prev,
      [productId]: stock
    }));
  };


  const initializeMultipleProductStock = useCallback((stockObj) => {
    setProductStock(prev => {
      const newStock = { ...prev };
      for (const id in stockObj) {
        if (!(id in newStock)) {
          newStock[id] = stockObj[id];
        }
      }
      return newStock;
    });
  }, []);


  const getAvailableStock = (productId) => {
    return productStock[productId] || 0;
  };

  // Añadir producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === product.id);
      const availableStock = getAvailableStock(product.id);
      
      if (existing) {
      
        if (existing.quantity >= availableStock) {
          alert('No hay suficiente stock disponible');
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
     
      if (availableStock < 1) {
        alert('No hay suficiente stock disponible');
        return prevItems;
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
    const availableStock = getAvailableStock(id);
    if (quantity > availableStock) {
      alert('No hay suficiente stock disponible');
      return;
    }
    
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

  // Función para limpiar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        clearCart,
        initializeProductStock,
        getAvailableStock,
        initializeMultipleProductStock
      }}
    >
      {children}
    </CartContext.Provider>
  );
}