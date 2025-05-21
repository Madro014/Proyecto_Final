import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.scss';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, getAvailableStock } = useCart();
  const availableStock = getAvailableStock(product.id);

  const handleCardClick = (e) => {
  
    if (e.target.closest('.btn-add-to-cart-techshop')) return;
   
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const audio = new Audio('/songs/click.mp3'); // Ruta al archivo de sonido
    audio.play();
    addToCart(product);
  };

  return (
    <div className="card h-100 shadow-sm product-card-techshop" onClick={handleCardClick} role="button">
      <div className="product-image-container-techshop">
        {product.image ? (
          <img src={product.image} className="card-img-top" alt={product.title} />
        ) : (
          <div className="card-img-top placeholder-image-techshop"></div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title product-name-techshop" title={product.title}>{product.title}</h5>
        <p className="card-text product-price-techshop mt-auto mb-2">${product.price.toFixed(2)}</p>
        <p className="card-text product-stock-techshop">Stock disponible: {availableStock}</p>
      </div>
    
      <button 
        className="btn btn-techshop-primary w-100 rounded-bottom btn-add-to-cart-techshop" 
        onClick={handleAddToCart}
        type="button"
        disabled={availableStock === 0}
      >
        {availableStock === 0 ? 'Sin stock' : 'Añadir al carrito'}
      </button>
    </div>
  );
}

export default ProductCard;