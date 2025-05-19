import { useCart } from '../context/CartContext';
import './Cart.scss';
import { useNavigate } from 'react-router-dom'; // Añadido para la navegación
import { useEffect, useRef } from 'react';

function Cart({ isOpen, onClose }) {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    cartTotal 
  } = useCart();
  const navigate = useNavigate(); // Hook para la navegación
  
  // Referencias para los sonidos precargados
  const removeSound = useRef(new Audio('/songs/eliminar.mp3'));
  const checkoutSound = useRef(new Audio('/songs/comprar.mp3'));

  // Precargar los sonidos cuando el componente se monta
  useEffect(() => {
    removeSound.current.load();
    checkoutSound.current.load();
  }, []);

  if (!isOpen) return null;

  const handleRemoveFromCartWithSound = (itemId) => {
    removeSound.current.currentTime = 0; // Reiniciar el audio al inicio
    removeSound.current.play();
    removeFromCart(itemId);
  };

  const handleCheckoutWithSound = () => {
    const authToken = localStorage.getItem('authToken');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!authToken || !loggedInUser) {
      alert('Debes iniciar sesión para realizar una compra');
      navigate('/login');
      onClose();
      return;
    }

    checkoutSound.current.currentTime = 0; // Reiniciar el audio al inicio
    checkoutSound.current.play();
    navigate('/caja');
    onClose();
  };

  return (
    <div className="cart-overlay">
      <div className="cart">
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">Tu carrito está vacío</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveFromCartWithSound(item.id)} 
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total">Total: ${cartTotal.toFixed(2)}</div>
            <button 
              className="checkout-btn"
              onClick={handleCheckoutWithSound}
            >
              Pasar por la caja
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;