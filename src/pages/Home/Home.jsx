import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // No se usa si ProductCard maneja el click
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.scss';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Modificamos la URL para quitar el límite de 8 productos
        const response = await fetch('https://fakestoreapi.com/products'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading-message">Cargando productos destacados...</div>;
  return (
    <div className="container mt-4 home-page-techshop pb-5"> {/* Agrega pb-5 de Bootstrap o una clase personalizada */}
      <header className="p-4 mb-4 rounded home-banner-techshop">
        <h1 className="display-5 fw-bold">Bienvenido a TechShop</h1>
        <p className="col-md-8 fs-5">Descubre nuestros productos destacados y ofertas especiales.</p>
      </header>
      
      {loading && <div className="text-center p-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div></div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;