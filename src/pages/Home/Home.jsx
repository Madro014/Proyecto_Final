import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.scss';

// Las 4 categorías exactas de la API de Fakestore
const categorias = [
  { key: 'all', name: 'Todas las categorías' },
  { key: 'electronics', name: 'Electrónica' },
  { key: 'jewelery', name: 'Joyería' },
  { key: "men's clothing", name: "Ropa de hombre" },
  { key: "women's clothing", name: "Ropa de mujer" }
];

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para los filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Inicialmente mostrar todos
      } catch (err) {
        setError(err.message);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Actualizar productos filtrados cuando cambien los filtros
  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];
      
      // Filtrar por categoría
      if (selectedCategory !== 'all') {
        result = result.filter(product => product.category === selectedCategory);
      }
      
      // Filtrar por texto de búsqueda
      if (searchTerm) {
        result = result.filter(product => 
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filtrar por rango de precio
      result = result.filter(product => 
        product.price >= priceRange.min && product.price <= priceRange.max
      );
      
      setFilteredProducts(result);
      setCurrentPage(1); // Resetear a la primera página cuando cambian los filtros
    }
  }, [products, searchTerm, selectedCategory, priceRange]);

  // Manejadores para los filtros
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceMinChange = (e) => {
    setPriceRange({...priceRange, min: Number(e.target.value) || 0});
  };

  const handlePriceMaxChange = (e) => {
    setPriceRange({...priceRange, max: Number(e.target.value) || 1000});
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 1000 });
  };

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Ir a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mt-4 home-page-techshop pb-5">
      <header className="p-4 mb-4 rounded home-banner-techshop">
        <h1 className="display-5 fw-bold">Bienvenido a TechShop</h1>
        <p className="col-md-8 fs-5">Descubre nuestros productos destacados y ofertas especiales.</p>
      </header>
      
      {/* Filtros */}
      <div className="filter-container p-3 mb-4 rounded shadow-sm">
        <div className="row g-3">
          {/* Búsqueda por nombre */}
          <div className="col-md-4">
            <label htmlFor="search" className="form-label">Buscar productos:</label>
            <input 
              type="text" 
              className="form-control" 
              id="search" 
              placeholder="Buscar..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* Filtro por categoría */}
          <div className="col-md-3">
            <label htmlFor="category" className="form-label">Categoría:</label>
            <select 
              className="form-select" 
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categorias.map(cat => (
                <option key={cat.key} value={cat.key}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          {/* Filtro por precio */}
          <div className="col-md-4">
            <label className="form-label">Rango de precio ($):</label>
            <div className="d-flex gap-2">
              <input 
                type="number" 
                className="form-control" 
                placeholder="Min" 
                value={priceRange.min}
                onChange={handlePriceMinChange}
                min="0"
              />
              <input 
                type="number" 
                className="form-control" 
                placeholder="Max" 
                value={priceRange.max}
                onChange={handlePriceMaxChange}
                min="0"
              />
            </div>
          </div>
          
          {/* Botón para resetear */}
          <div className="col-md-1 d-flex align-items-end">
            <button 
              className="btn btn-outline-secondary w-100" 
              onClick={handleResetFilters}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
      
      {/* Contador de resultados */}
      {!loading && !error && (
        <div className="results-summary mb-3">
          <span>Mostrando <strong>{Math.min(indexOfFirstProduct + 1, filteredProducts.length)}-{Math.min(indexOfLastProduct, filteredProducts.length)}</strong> de <strong>{filteredProducts.length}</strong> productos</span>
          {searchTerm && (
            <span className="ms-2">
              • Búsqueda: <span className="badge bg-primary">{searchTerm}</span>
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="ms-2">
              • Categoría: <span className="badge bg-info text-dark">
                {categorias.find(cat => cat.key === selectedCategory)?.name}
              </span>
            </span>
          )}
        </div>
      )}
      
      {loading && <div className="text-center p-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div></div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="alert alert-info">
          No se encontraron productos que coincidan con los filtros seleccionados.
        </div>
      )}
      
      {!loading && !error && filteredProducts.length > 0 && (
        <>
          <div className="products-card-grid">
            {currentProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          
          {/* Paginación */}
          {totalPages > 1 && (
            <nav className="mt-4" aria-label="Navegación de páginas">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={goToPreviousPage} 
                    aria-label="Anterior"
                    disabled={currentPage === 1}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                
                {/* Mostrar números de página */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={goToNextPage} 
                    aria-label="Siguiente"
                    disabled={currentPage === totalPages}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export default Home;