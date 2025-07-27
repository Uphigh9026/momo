import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExpertPage() {
  const navigate = useNavigate();
  const [experts, setExperts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['전체', '인테리어', '전기', '수도', '목공', '도배', '타일'];

  const mockExperts = [
    {
      id: 1,
      name: '김인테리어',
      category: '인테리어',
      rating: 4.8,
      reviewCount: 127,
      experience: '15년',
      location: '서울 강남구',
      image: 'https://via.placeholder.com/150',
      specialties: ['리모델링', '신축', '가구설치'],
      description: '15년간 다양한 인테리어 프로젝트를 성공적으로 완료한 전문가입니다.'
    },
    {
      id: 2,
      name: '박전기공사',
      category: '전기',
      rating: 4.9,
      reviewCount: 89,
      experience: '12년',
      location: '서울 서초구',
      image: 'https://via.placeholder.com/150',
      specialties: ['전기설비', '조명설치', '스마트홈'],
      description: '전기공사 전문가로 안전하고 효율적인 전기 설비를 제공합니다.'
    },
    {
      id: 3,
      name: '이수도공사',
      category: '수도',
      rating: 4.7,
      reviewCount: 156,
      experience: '18년',
      location: '서울 마포구',
      image: 'https://via.placeholder.com/150',
      specialties: ['급수설비', '배수설비', '온수설비'],
      description: '수도공사 전문가로 깔끔하고 안정적인 시설을 제공합니다.'
    }
  ];

  useEffect(() => {
    setExperts(mockExperts);
  }, []);

  const filteredExperts = experts.filter(expert => {
    const matchesCategory = selectedCategory === '전체' || expert.category === selectedCategory;
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="expert-page">
      <div className="expert-header">
        <h1>추천 전문가</h1>
        <p>검증된 전문가들과 함께 완벽한 인테리어를 완성하세요</p>
      </div>

      <div className="expert-filters">
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
        
        <div className="search-filter">
          <input
            type="text"
            placeholder="전문가 이름 또는 전문분야로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="experts-grid">
        {filteredExperts.map(expert => (
          <div key={expert.id} className="expert-card">
            <div className="expert-image">
              <img src={expert.image} alt={expert.name} />
              <div className="expert-rating">
                ⭐ {expert.rating} ({expert.reviewCount})
              </div>
            </div>
            
            <div className="expert-info">
              <h3>{expert.name}</h3>
              <p className="expert-category">{expert.category} 전문가</p>
              <p className="expert-experience">경력 {expert.experience}</p>
              <p className="expert-location">📍 {expert.location}</p>
              
              <div className="expert-specialties">
                {expert.specialties.map((specialty, index) => (
                  <span key={index} className="specialty-tag">{specialty}</span>
                ))}
              </div>
              
              <p className="expert-description">{expert.description}</p>
              
              <div className="expert-actions">
                <button className="btn-primary" onClick={() => navigate(`/expert/${expert.id}`)}>
                  상세보기
                </button>
                <button className="btn-secondary" onClick={() => navigate(`/expert/${expert.id}/contact`)}>
                  견적요청
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExperts.length === 0 && (
        <div className="no-results">
          <p>검색 조건에 맞는 전문가가 없습니다.</p>
        </div>
      )}
    </div>
  );
} 