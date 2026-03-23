import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

import { getProducts, getCategories } from '../services/db';
import type { Product, Category } from '../services/db';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    // Check if category is in URL
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }

    // Fetch categories
    getCategories()
      .then(data => setCategories([{ id: '0', name: 'All' }, ...data]))
      .catch(err => console.error('Error fetching categories:', err));
  }, [location]);

  useEffect(() => {
    setLoading(true);
    getProducts(activeCategory)
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <div className="section container" style={{ padding: '3rem 1.5rem', minHeight: '80vh' }}>
      <div className="text-center mb-10" style={{ marginBottom: '3rem' }}>
        <h1 className="heading-lg" style={{ marginBottom: '1rem' }}>Our Products</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Browse our extensive collection of high-quality home appliances and durable furniture.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex-center mb-10" style={{ gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={`btn ${activeCategory === cat.name ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '9999px', padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center p-10 text-muted">
          Loading amazing products...
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md-grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center p-10 flex-col flex-center" style={{ background: 'white', borderRadius: '1rem', padding: '4rem 2rem' }}>
          <h3 className="heading-md text-muted mb-4" style={{ marginBottom: '1rem' }}>No Products Found</h3>
          <p className="text-muted mb-6" style={{ marginBottom: '2rem' }}>We couldn't find any products in this category at the moment.</p>
          <button onClick={() => setActiveCategory('All')} className="btn btn-primary">View All Products</button>
        </div>
      )}
    </div>
  );
}

export default Products;
