import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft, CheckCircle, Shield, Truck, AlertCircle } from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import 'react-quill-new/dist/quill.snow.css';
import { formatCurrency } from '../components/ProductCard';

import { getProductById } from '../services/db';
import type { Product } from '../services/db';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    getProductById(id)
      .then(data => {
        if (!data) throw new Error('Product not found');
        setProduct(data);
        setSelectedImage(data.image || (data.images && data.images[0]) || '');
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center section heading-md text-muted">Loading Product Details...</div>;
  if (!product) return <div className="text-center section heading-md text-muted">Product Not Found</div>;

  const whatsappMessage = `Hi, I am interested to buy the product ${product.name} priced at ${formatCurrency(product.price)}. Please share more details.`;
  const whatsappUrl = `https://wa.me/919959916507?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="section container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <Link to="/products" className="btn btn-outline mb-6" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
        <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Products
      </Link>
      
      <div className="card glass" style={{ 
        display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden'
      }}>
        <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1rem', borderBottom: '1px solid #e2e8f0' }}>
          {/* Main Image with Zoom */}
          <Zoom key={selectedImage}>
            <img 
              src={selectedImage || 'https://via.placeholder.com/600'} 
              alt={product.name} 
              loading="lazy"
              style={{ width: '100%', objectFit: 'contain', maxHeight: '600px', borderRadius: '0.5rem' }} 
            />
          </Zoom>
          
          {/* Thumbnails if multiple images exist */}
          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
              {product.images.map((imgUrl, index) => (
                <img 
                  key={index}
                  src={imgUrl} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  loading="lazy"
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'cover', 
                    borderRadius: '0.25rem', 
                    border: `2px solid ${selectedImage === imgUrl ? 'var(--color-primary)' : 'transparent'}`, 
                    cursor: 'pointer',
                    transition: 'border-color 0.2s'
                  }} 
                  onClick={() => setSelectedImage(imgUrl)}
                  onMouseOver={() => setSelectedImage(imgUrl)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column' }}>
          <div className="mb-4" style={{ marginBottom: '1rem' }}>
            <span className="badge">{product.category}</span>
          </div>
          
          <h1 className="heading-lg" style={{ marginBottom: '1rem' }}>{product.name}</h1>
          <div className="text-primary font-bold mb-6" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>
            {formatCurrency(product.price)}
          </div>
          
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
            <span 
              className="badge" 
              style={{ 
                background: product.inStock ? 'var(--color-success)' : '#EF4444', 
                color: 'white', 
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.9rem',
                padding: '0.4rem 0.8rem'
              }}
            >
              {product.inStock ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="text-muted text-lg mb-8 ql-editor" style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8', padding: 0 }} dangerouslySetInnerHTML={{ __html: product.description }}>
          </div>

          {(product.specifications || product.brand || product.material) && (
            <div className="specifications" style={{ marginBottom: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <h3 className="heading-sm" style={{ marginBottom: '1rem' }}>Specifications</h3>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: '#4b5563' }}>
                {product.specifications || (
                  <ul style={{ display: 'grid', gap: '0.8rem' }}>
                    {product.brand && <li><strong>Brand:</strong> {product.brand}</li>}
                    {product.material && <li><strong>Material:</strong> {product.material}</li>}
                    {product.size && <li><strong>Size:</strong> {product.size}</li>}
                    {product.capacity && <li><strong>Capacity:</strong> {product.capacity}</li>}
                  </ul>
                )}
              </div>
            </div>
          )}
          
          {/* Trust Attributes */}
          <div className="flex mb-8" style={{ gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-secondary)' }}><CheckCircle size={20} className="text-primary" /> Genuine Product</div>
            <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-secondary)' }}><Shield size={20} className="text-primary" /> Warranty Support</div>
            <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-secondary)' }}><Truck size={20} className="text-primary" /> Delivery Available</div>
          </div>

          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-whatsapp" 
            style={{ padding: '1rem 2rem', fontSize: '1.2rem', marginTop: 'auto', textAlign: 'center' }}
          >
            <MessageCircle size={24} style={{ marginRight: '0.8rem' }} /> Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
