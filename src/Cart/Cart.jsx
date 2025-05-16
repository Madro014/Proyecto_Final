import { useCart } from '../context/CartContext';
import './Cart.scss';
import { useNavigate } from 'react-router-dom'; // Añadido para la navegación

function Cart({ isOpen, onClose }) {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    cartTotal 
  } = useCart();
  const navigate = useNavigate(); // Hook para la navegación

  if (!isOpen) return null;

  const handleRemoveFromCartWithSound = (itemId) => {
    const audio = new Audio('/songs/eliminar.mp3'); // Ruta al archivo de sonido
    audio.play();
    removeFromCart(itemId);
  };

  const handleCheckoutWithSound = () => {
    const audio = new Audio('/songs/comprar.mp3'); // Ruta al archivo de sonido de compra
    audio.play();
    navigate('/caja'); // Navegar a la página de caja
    onClose(); // Cerrar el carrito después de navegar
    // console.log("Procediendo al pago..."); // Puedes mantener o quitar este log
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
                    onClick={() => handleRemoveFromCartWithSound(item.id)} // Modificado aquí
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
              onClick={handleCheckoutWithSound} // Modificado aquí
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