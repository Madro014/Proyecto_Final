import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.scss';

// Categorías para la UI de TechShop (ahora coinciden con las de la API)
const techShopCategories = [
  { key: 'all', name: 'Todos los productos' },
  { key: 'electronics', name: 'Electrónica' },
  { key: 'jewelery', name: 'Joyería' },
  { key: "men's clothing", name: "Ropa de hombre" },
  { key: "women's clothing", name: "Ropa de mujer" },
];

function Products() {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // El categoryKey 'all' o undefined significa todos los productos.
  const currentCategoryKey = categoryKey || 'all';

  // Establecer la categoría seleccionada cuando cambia la URL
  useEffect(() => {
    setSelectedCategory(currentCategoryKey);
    setCurrentPage(1); // Resetear a la primera página cuando cambia la categoría
  }, [currentCategoryKey]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = currentCategoryKey === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${currentCategoryKey}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching products: ${response.statusText}`);
        const data = await response.json();
        
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategoryKey]);

  // Aplicar filtros cuando cambian los productos, términos de búsqueda o rango de precios
  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];
      
      // Aplicar filtro de búsqueda por nombre
      if (searchTerm) {
        result = result.filter(product => 
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Aplicar filtro de rango de precios
      result = result.filter(product => 
        product.price >= priceRange.min && product.price <= priceRange.max
      );
      
      setFilteredProducts(result);
      setCurrentPage(1); // Resetear a la primera página cuando cambian los filtros
    } else {
      setFilteredProducts([]);
    }
  }, [products, searchTerm, priceRange]);

  const getPageTitle = () => {
    const currentCat = techShopCategories.find(cat => cat.key === currentCategoryKey);
    return currentCat ? currentCat.name : 'Productos';
  };

  // Manejadores para los filtros
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceMinChange = (e) => {
    setPriceRange({...priceRange, min: Number(e.target.value) || 0});
  };

  const handlePriceMaxChange = (e) => {
    setPriceRange({...priceRange, max: Number(e.target.value) || 1000});
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    
    // Navegar a la URL correspondiente a la categoría seleccionada
    if (newCategory === 'all') {
      navigate('/products');
    } else {
      navigate(`/products/category/${newCategory}`);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
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
    <div className="container-fluid mt-4 products-page-techshop">
      <div className="row">
        <div className="col-lg-3 col-md-4">
          {/* Filtros */}
          <div className="filters-container p-3 bg-white rounded shadow-sm">
            <h4 className="filter-title mb-3">Filtros</h4>
            
            {/* Filtro por categoría (desplegable) */}
            <div className="mb-3">
              <label htmlFor="category-select" className="form-label">Categoría:</label>
              <select 
                className="form-select" 
                id="category-select" 
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {techShopCategories.map(category => (
                  <option key={category.key} value={category.key}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Filtro por nombre */}
            <div className="mb-3">
              <label htmlFor="search" className="form-label">Buscar por nombre:</label>
              <input 
                type="text" 
                className="form-control" 
                id="search" 
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Ej: Smartphone, Laptop..." 
              />
            </div>
            
            {/* Filtro por rango de precio */}
            <div className="mb-3">
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
            
            {/* Botón para resetear filtros */}
            <button 
              className="btn btn-outline-secondary w-100"
              onClick={resetFilters}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
        <div className="col-lg-9 col-md-8">
          <main className="main-content-techshop p-3 bg-white rounded shadow-sm">
            <h2 className="page-title mb-4">{getPageTitle()}</h2>
            
            {/* Contadores y resultados */}
            {!loading && !error && (
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="results-count">
                  Mostrando <strong>{Math.min(indexOfFirstProduct + 1, filteredProducts.length)}-{Math.min(indexOfLastProduct, filteredProducts.length)}</strong> de <strong>{filteredProducts.length}</strong> productos
                </div>
                {searchTerm && (
                  <div className="search-term">
                    Resultados para: <span className="badge bg-primary">{searchTerm}</span>
                  </div>
                )}
              </div>
            )}
            
            {loading && <div className="text-center p-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div></div>}
            {error && <div className="alert alert-danger">Error: {error}</div>}
            {!loading && !error && filteredProducts.length === 0 && <p>No hay productos que coincidan con los filtros seleccionados.</p>}
            
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default Products;