import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategorySidebar.scss'; // Crearemos este archivo para los estilos

// Lista de categorías actualizada para el enrutamiento
const categories = [
  { name: 'Todos los productos', path: '/products', key: 'all' },
  { name: 'Smartphones', path: '/products/category/smartphones', key: 'smartphones' },
  { name: 'Laptops', path: '/products/category/laptops', key: 'laptops' },
  { name: 'Tablets', path: '/products/category/tablets', key: 'tablets' },
  { name: 'Wearables', path: '/products/category/wearables', key: 'wearables' },
  { name: 'Audio', path: '/products/category/audio', key: 'audio' },
  { name: 'Monitores', path: '/products/category/monitores', key: 'monitores' }, // Corregido 'Monitores'
  { name: 'Cámaras', path: '/products/category/camaras', key: 'camaras' }, // Corregido 'Cámaras'
  { name: 'Gaming', path: '/products/category/gaming', key: 'gaming' },
];

// El prop onSelectCategory es opcional
function CategorySidebar({ onSelectCategory }) {
  return (
    <aside className="category-sidebar-techshop">
      <h3 className="sidebar-title-techshop">Categorías</h3>
      <ul className="category-list-techshop">
        {categories.map((category) => (
          <li key={category.key} className="category-item-techshop">
            <NavLink
              to={category.path}
              className={({ isActive }) =>
                isActive ? 'category-link-techshop active' : 'category-link-techshop'
              }
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(category.key); // Usar category.key
                }
              }}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategorySidebar;