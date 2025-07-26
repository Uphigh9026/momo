import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularComplexPage.css';

export default function PopularComplexPage() {
  const navigate = useNavigate();
  const [complexes, setComplexes] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedType, setSelectedType] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const regions = ['전체', '서울', '경기', '인천', '부산', '대구', '광주', '대전'];
  const types = ['전체', '아파트', '오피스텔', '빌라', '단독주택', '상가'];

  const mockComplexes = [
    {
      id: 1,
      name: '래미안강남타워',
      region: '서울',
      type: '아파트',
      address: '서울 강남구 역삼동',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.7,
      reviewCount: 234,
      priceRange: '15억~25억',
      sizeRange: '84㎡~132㎡',
      completionYear: 2020,
      householdCount: 1200,
      facilities: ['헬스장', '수영장', '독서실', '놀이터'],
      description: '강남역 인근 프리미엄 아파트로 교통편이 매우 편리합니다.',
      popular: true
    },
    {
      id: 2,
      name: '롯데캐슬클라시아',
      region: '경기',
      type: '아파트',
      address: '경기 성남시 분당구',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.8,
      reviewCount: 189,
      priceRange: '12억~18억',
      sizeRange: '84㎡~110㎡',
      completionYear: 2019,
      householdCount: 800,
      facilities: ['공원', '상가', '주차장', '보안시설'],
      description: '분당 신도시의 대표적인 아파트 단지입니다.',
      popular: true
    },
    {
      id: 3,
      name: '푸르지오시티',
      region: '인천',
      type: '오피스텔',
      address: '인천 연수구',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.5,
      reviewCount: 156,
      priceRange: '3억~5억',
      sizeRange: '25㎡~45㎡',
      completionYear: 2021,
      householdCount: 500,
      facilities: ['편의점', '카페', '피트니스', '세탁실'],
      description: '연수구 중심가의 오피스텔로 생활편의시설이 잘 갖춰져 있습니다.',
      popular: false
    },
    {
      id: 4,
      name: '마포리버파크',
      region: '서울',
      type: '빌라',
      address: '서울 마포구 합정동',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.6,
      reviewCount: 98,
      priceRange: '8억~12억',
      sizeRange: '60㎡~85㎡',
      completionYear: 2018,
      householdCount: 200,
      facilities: ['공원', '주차장', 'CCTV'],
      description: '한강변에 위치한 프리미엄 빌라 단지입니다.',
      popular: true
    }
  ];

  useEffect(() => {
    setComplexes(mockComplexes);
  }, []);

  const filteredComplexes = complexes.filter(complex => {
    const matchesRegion = selectedRegion === '전체' || complex.region === selectedRegion;
    const matchesType = selectedType === '전체' || complex.type === selectedType;
    const matchesSearch = complex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complex.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesType && matchesSearch;
  });

  const sortedComplexes = [...filteredComplexes].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return b.rating - a.rating;
  });

  return (
    <div className="popular-complex-page">
      <div className="complex-header">
        <h1>인기 단지</h1>
        <p>사용자들이 가장 많이 찾는 인기 단지들을 확인해보세요</p>
      </div>

      <div className="complex-filters">
        <div className="filter-row">
          <div className="region-filters">
            <label>지역:</label>
            {regions.map(region => (
              <button
                key={region}
                className={`filter-btn ${selectedRegion === region ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
          
          <div className="type-filters">
            <label>유형:</label>
            {types.map(type => (
              <button
                key={type}
                className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="search-filter">
          <input
            type="text"
            placeholder="단지명 또는 주소로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="complexes-grid">
        {sortedComplexes.map(complex => (
          <div key={complex.id} className="complex-card">
            <div className="complex-image">
              <img src={complex.image} alt={complex.name} />
              {complex.popular && <div className="popular-badge">인기</div>}
              <div className="complex-rating">
                ⭐ {complex.rating} ({complex.reviewCount})
              </div>
            </div>
            
            <div className="complex-info">
              <h3>{complex.name}</h3>
              <p className="complex-address">📍 {complex.address}</p>
              <p className="complex-type">{complex.type} • {complex.completionYear}년 준공</p>
              
              <div className="complex-details">
                <div className="detail-item">
                  <span className="detail-label">가격대:</span>
                  <span className="detail-value">{complex.priceRange}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">면적:</span>
                  <span className="detail-value">{complex.sizeRange}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">세대수:</span>
                  <span className="detail-value">{complex.householdCount}세대</span>
                </div>
              </div>
              
              <div className="complex-facilities">
                <span className="facilities-label">주요시설:</span>
                <div className="facilities-tags">
                  {complex.facilities.slice(0, 3).map((facility, index) => (
                    <span key={index} className="facility-tag">{facility}</span>
                  ))}
                  {complex.facilities.length > 3 && (
                    <span className="facility-tag">+{complex.facilities.length - 3}</span>
                  )}
                </div>
              </div>
              
              <p className="complex-description">{complex.description}</p>
              
              <div className="complex-actions">
                <button className="btn-primary" onClick={() => navigate(`/complex/${complex.id}`)}>
                  상세정보
                </button>
                <button className="btn-secondary" onClick={() => navigate(`/complex/${complex.id}/community`)}>
                  커뮤니티
                </button>
                <button className="btn-outline" onClick={() => navigate(`/complex/${complex.id}/reviews`)}>
                  리뷰보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedComplexes.length === 0 && (
        <div className="no-results">
          <p>검색 조건에 맞는 단지가 없습니다.</p>
        </div>
      )}
    </div>
  );
} 