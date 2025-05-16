import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Ajusta la ruta si es necesario
import './ProductDetail.scss';

function ProductDetail() {
  const { id } = useParams(); // Obtiene el ID del producto de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo obtener el producto`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="product-detail-loading">Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div className="product-detail-error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="product-detail-not-found">Producto no encontrado.</div>;
  }

  return (
    <div className="product-detail-page-container">
      <div className="product-detail-card">
        <div className="product-detail-image-container">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-info-container">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-category">Categoría: {product.category}</p>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          {/* Podrías añadir el stock si la API lo proporciona */}
          {/* <p className="product-detail-stock">Stock: {product.rating?.count || 'No disponible'}</p> */}
          <button 
            className="product-detail-add-to-cart-btn" 
            onClick={() => addToCart(product)}
          >
            + Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;