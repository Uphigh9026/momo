import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BrandPage() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['전체', '가구', '조명', '패브릭', '데코', '바닥재', '벽지'];

  const mockBrands = [
    {
      id: 1,
      name: '이케아',
      category: '가구',
      logo: 'https://via.placeholder.com/100',
      description: '스웨덴의 글로벌 가구 브랜드',
      productCount: 1250,
      rating: 4.6,
      reviewCount: 2847,
      discount: 15,
      featured: true,
      products: [
        { id: 1, name: '헤드보드', price: 89000, originalPrice: 105000, image: 'https://via.placeholder.com/200' },
        { id: 2, name: '책상', price: 129000, originalPrice: 149000, image: 'https://via.placeholder.com/200' },
        { id: 3, name: '의자', price: 45000, originalPrice: 55000, image: 'https://via.placeholder.com/200' }
      ]
    },
    {
      id: 2,
      name: '무인양품',
      category: '데코',
      logo: 'https://via.placeholder.com/100',
      description: '일본의 미니멀 라이프스타일 브랜드',
      productCount: 890,
      rating: 4.8,
      reviewCount: 1567,
      discount: 20,
      featured: true,
      products: [
        { id: 4, name: '화분', price: 35000, originalPrice: 44000, image: 'https://via.placeholder.com/200' },
        { id: 5, name: '커버', price: 28000, originalPrice: 35000, image: 'https://via.placeholder.com/200' },
        { id: 6, name: '수건', price: 15000, originalPrice: 19000, image: 'https://via.placeholder.com/200' }
      ]
    },
    {
      id: 3,
      name: '오스람',
      category: '조명',
      logo: 'https://via.placeholder.com/100',
      description: '독일의 프리미엄 조명 브랜드',
      productCount: 456,
      rating: 4.7,
      reviewCount: 892,
      discount: 10,
      featured: false,
      products: [
        { id: 7, name: 'LED 스트립', price: 45000, originalPrice: 50000, image: 'https://via.placeholder.com/200' },
        { id: 8, name: '펜던트', price: 89000, originalPrice: 99000, image: 'https://via.placeholder.com/200' },
        { id: 9, name: '스탠드', price: 67000, originalPrice: 75000, image: 'https://via.placeholder.com/200' }
      ]
    }
  ];

  useEffect(() => {
    setBrands(mockBrands);
  }, []);

  const filteredBrands = brands.filter(brand => {
    const matchesCategory = selectedCategory === '전체' || brand.category === selectedCategory;
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedBrands = [...filteredBrands].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.reviewCount - a.reviewCount;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discount - a.discount;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="brand-page">
      <div className="brand-header">
        <h1>브랜드 상품</h1>
        <p>인기 브랜드의 다양한 상품을 만나보세요</p>
      </div>

      <div className="brand-filters">
        <div className="filter-row">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="sort-filter">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="popular">인기순</option>
              <option value="rating">평점순</option>
              <option value="discount">할인순</option>
              <option value="name">이름순</option>
            </select>
          </div>
        </div>
        
        <div className="search-filter">
          <input
            type="text"
            placeholder="브랜드명 또는 상품명으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="brands-grid">
        {sortedBrands.map(brand => (
          <div key={brand.id} className="brand-card">
            <div className="brand-header-section">
              <div className="brand-logo">
                <img src={brand.logo} alt={brand.name} />
              </div>
              <div className="brand-info">
                <h3>{brand.name}</h3>
                <p className="brand-category">{brand.category}</p>
                <p className="brand-description">{brand.description}</p>
                <div className="brand-stats">
                  <span>⭐ {brand.rating} ({brand.reviewCount})</span>
                  <span>상품 {brand.productCount}개</span>
                </div>
              </div>
              {brand.featured && <div className="featured-badge">인기</div>}
            </div>

            <div className="brand-products">
              <div className="products-header">
                <h4>대표 상품</h4>
                {brand.discount > 0 && (
                  <span className="discount-badge">{brand.discount}% 할인</span>
                )}
              </div>
              
              <div className="products-grid">
                {brand.products.slice(0, 3).map(product => (
                  <div key={product.id} className="product-item">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h5>{product.name}</h5>
                      <div className="product-price">
                        <span className="current-price">{product.price.toLocaleString()}원</span>
                        {product.originalPrice > product.price && (
                          <span className="original-price">{product.originalPrice.toLocaleString()}원</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="brand-actions">
              <button className="btn-primary" onClick={() => navigate(`/brand/${brand.id}`)}>
                브랜드 상세보기
              </button>
              <button className="btn-secondary" onClick={() => navigate(`/brand/${brand.id}/products`)}>
                전체 상품보기
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedBrands.length === 0 && (
        <div className="no-results">
          <p>검색 조건에 맞는 브랜드가 없습니다.</p>
        </div>
      )}
    </div>
  );
} 