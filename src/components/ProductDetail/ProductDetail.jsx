import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // <-- Importa useNavigate
import { useCart } from '../../context/CartContext'; 
import './ProductDetail.scss'; 

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate(); // <-- Inicializa el hook

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Error fetching product details');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Cargando detalles del producto...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Producto no encontrado.</div>;

  // Simulación de stock
  const stockDisponible = product.rating && product.rating.count > 0 ? product.rating.count : 'No disponible';

  const handleAddToCartWithSound = () => {
    const audio = new Audio('/songs/click.mp3'); // Ruta al archivo de sonido
    audio.play();
    addToCart(product);
  };

  return (
    <div className="product-detail-page">
      {/* Botón para volver atrás */}
      <button 
          className="back-btn"
          onClick={() => navigate(-1)}
      >
          ← Volver atrás
      </button>
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="category">Categoría: {product.category}</p>
          <p className="description">Descripción: {product.description}</p>
          <p className="price">Precio: ${product.price}</p>
          <p className="stock">Stock: {stockDisponible}</p> {/* Stock simulado */}
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCartWithSound} // Modificado aquí
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;