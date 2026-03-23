import { Link } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
};

type ProductCardProps = {
  product: Product;
};

// Format currency in Indian Rupees
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card flex-col animate-fade-in" style={{ height: '100%' }}>
      <div 
        style={{ 
          height: '240px', 
          overflow: 'hidden', 
          position: 'relative',
          backgroundColor: '#f1f5f9'
        }}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }} 
          loading="lazy"
          className="product-img"
        />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          <span className="badge glass-dark text-light" style={{ color: 'white' }}>{product.category}</span>
          <span 
            className="badge" 
            style={{ 
              background: product.inStock ? 'var(--color-success)' : '#EF4444', 
              color: 'white', 
              border: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
            }}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
      
      <div className="card-content flex-col" style={{ flexGrow: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h3 className="heading-sm" style={{ marginBottom: '0.5rem', flexGrow: 1 }}>{product.name}</h3>
        <p className="text-muted" style={{ 
          marginBottom: '1rem', 
          fontSize: '0.9rem', 
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden' 
        }}>
          {product.description.replace(/<[^>]*>?/gm, '')}
        </p>
        
        <div className="flex-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <span className="text-primary font-semibold" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {formatCurrency(product.price)}
          </span>
          <Link to={`/products/${product.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
