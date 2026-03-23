import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, ShieldAlert, Bed, Sofa, CheckCircle, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

import { getProducts } from '../services/db';
import type { Product } from '../services/db';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts(undefined, 4)
      .then(data => setFeaturedProducts(data))
      .catch(err => console.error(err));
  }, []);

  const categories = [
    { name: 'Bureau', icon: <Package size={32} /> },
    { name: 'Dressing Tables', icon: <Sofa size={32} /> },
    { name: 'Mattresses', icon: <Bed size={32} /> },
    { name: 'Gas Stoves', icon: <CheckCircle size={32} /> },
    { name: 'Air Coolers', icon: <ShieldCheck size={32} /> },
    { name: 'Refrigerators', icon: <Package size={32} /> },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section flex-center text-center"
        style={{ 
          minHeight: '80vh', 
          background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '2rem'
        }}
      >
        <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
          <h1 className="heading-xl mb-6" style={{ marginBottom: '1.5rem', color: 'white' }}>
            Elevate Your Home with <span className="text-accent" style={{ color: 'var(--color-accent)' }}>Heman Enterprises</span>
          </h1>
          <p className="heading-sm mb-8 delay-100" style={{ marginBottom: '2rem', opacity: 0, animation: 'fadeIn 0.5s ease 0.1s forwards' }}>
            20+ Years of Trusted Quality & Service in Furniture and Home Appliances
          </p>
          <div className="flex-center flex-wrap delay-200" style={{ gap: '1rem', opacity: 0, animation: 'fadeIn 0.5s ease 0.2s forwards' }}>
            <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Shop Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section bg-light" style={{ padding: '3rem 0', background: 'white', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container grid grid-cols-1 md-grid-cols-3" style={{ gap: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { title: 'Branded Products', icon: <ShieldCheck size={40} className="text-primary mb-4" />, desc: '100% genuine and original brands.' },
            { title: 'Long Durability', icon: <Clock size={40} className="text-primary mb-4" />, desc: 'Products tested for longevity and daily use.' },
            { title: 'Service Support', icon: <ShieldAlert size={40} className="text-primary mb-4" />, desc: 'Reliable after-sales service and maintenance.' }
          ].map((feature, i) => (
            <div key={i} className="flex-col flex-center text-center card" style={{ padding: '2rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(30, 58, 138, 0.05)', borderRadius: '50%', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                {feature.icon}
              </div>
              <h3 className="heading-sm" style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p className="text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Review */}
      <section className="section bg-light" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center mb-10" style={{ marginBottom: '3rem' }}>
            <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Shop by Category</h2>
            <p className="text-muted max-w-2xl mx-auto" style={{ maxWidth: '600px', margin: '0 auto' }}>Find precisely what you're looking for by browsing our premium collections.</p>
          </div>
          
          <div className="grid grid-cols-2 md-grid-cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
            {categories.map((cat, i) => (
              <Link to={`/products?category=${encodeURIComponent(cat.name)}`} key={i} className="card flex-col flex-center text-center" style={{ padding: '2rem 1rem', textDecoration: 'none' }}>
                <div className="mb-4" style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>{cat.icon}</div>
                <h3 className="heading-sm" style={{ fontSize: '1rem' }}>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-light" style={{ padding: '5rem 0', background: 'var(--color-bg-light)' }}>
        <div className="container">
          <div className="flex-between mb-8" style={{ marginBottom: '3rem' }}>
            <h2 className="heading-lg">Featured Products</h2>
            <Link to="/products" className="btn btn-outline">View All</Link>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md-grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 text-muted">Loading products... Make sure the backend server is running.</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
