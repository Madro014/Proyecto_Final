import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams
import CategorySidebar from '../../components/Navbar/CategorySidebar'; // Ya estaba importado
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.scss';

// Categorías de la API de Fakestore
const actualApiCategories = [
    { key: 'electronics', name: 'Electronics' },
    { key: 'jewelery', name: 'Jewelery' },
    { key: "men's clothing", name: "Men's Clothing" },
    { key: "women's clothing", name: "Women's Clothing" },
];

// Categorías para la UI de TechShop (deberían coincidir con las de CategorySidebar.jsx o ser una fuente única)
const techShopCategories = [
  { key: 'all', name: 'Todos los productos' },
  { key: 'smartphones', name: 'Smartphones' },
  { key: 'laptops', name: 'Laptops' },
  { key: 'tablets', name: 'Tablets' },
  { key: 'wearables', name: 'Wearables' },
  { key: 'audio', name: 'Audio' },
  { key: 'monitores', name: 'Monitores' },
  { key: 'camaras', name: 'Cámaras' },
  { key: 'gaming', name: 'Gaming' },
];

function Products() {
  const { categoryKey } = useParams(); // Obtener categoryKey de la URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // El categoryKey 'all' o undefined significa todos los productos.
  const currentCategoryKey = categoryKey || 'all';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let apiCategoryQuery = currentCategoryKey;
        let filterClientSide = false;
        let clientFilterFn = null;

        // Mapeo de categorías de UI a categorías de API y filtrado del lado del cliente
        if (['smartphones', 'laptops', 'tablets', 'wearables', 'audio', 'monitores', 'camaras', 'gaming'].includes(currentCategoryKey)) {
            apiCategoryQuery = 'electronics'; // FakestoreAPI agrupa muchos de estos en 'electronics'
            filterClientSide = true;
            if (currentCategoryKey === 'smartphones') {
                clientFilterFn = (p) => p.title.toLowerCase().includes('phone') || p.title.toLowerCase().includes('galaxy');
            } else if (currentCategoryKey === 'laptops') {
                clientFilterFn = (p) => p.title.toLowerCase().includes('laptop') || p.title.toLowerCase().includes('notebook');
            }
            // Añadir más funciones de filtro para otras categorías si es necesario
        } else if (!actualApiCategories.find(cat => cat.key === currentCategoryKey) && currentCategoryKey !== 'all') {
            apiCategoryQuery = 'all'; // Si no es una categoría de API conocida (y no es 'all'), cargar todos
        }

        const url = apiCategoryQuery === 'all' || !actualApiCategories.find(cat => cat.key === apiCategoryQuery)
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${apiCategoryQuery}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching products: ${response.statusText}`);
        let data = await response.json();

        if (filterClientSide && clientFilterFn) {
            data = data.filter(clientFilterFn);
        } else if (filterClientSide && !clientFilterFn && currentCategoryKey !== 'all' && apiCategoryQuery === 'electronics') {
            // Si es una subcategoría de electrónica sin filtro específico, se muestran todos los de electrónica.
            // O podrías optar por no mostrar nada o un mensaje.
            // Para este ejemplo, se muestran todos los de "electronics" si no hay filtro específico.
        }


        setProducts(data);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategoryKey]); // Depender de currentCategoryKey

  const getPageTitle = () => {
    const currentCat = techShopCategories.find(cat => cat.key === currentCategoryKey);
    return currentCat ? currentCat.name : 'Productos';
  };

  return (
    <div className="container-fluid mt-4 products-page-techshop">
      <div className="row">
        <div className="col-lg-3 col-md-4">
          {/* Usar el componente CategorySidebar aquí */}
          <CategorySidebar /> 
        </div>
        <div className="col-lg-9 col-md-8">
          <main className="main-content-techshop p-3 bg-white rounded shadow-sm">
            <h2 className="page-title mb-4">{getPageTitle()}</h2>
            {loading && <div className="text-center p-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div></div>}
            {error && <div className="alert alert-danger">Error: {error}</div>}
            {!loading && !error && products.length === 0 && <p>No hay productos en esta categoría.</p>}
            {!loading && !error && products.length > 0 && (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Products;