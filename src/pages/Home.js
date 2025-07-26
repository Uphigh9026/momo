import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { fetchComplexData } from '../api/complexData';

export default function Home() {
  const navigate = useNavigate();

  // 자동완성용 단지명 리스트
  const [suggestions, setSuggestions] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [filtered, setFiltered] = React.useState([]);
  const [showSuggest, setShowSuggest] = React.useState(false);

  React.useEffect(() => {
    fetchComplexData().then(data => {
      // 단지명 컬럼명: '입주APT' (구글시트 기준)
      const names = data.map(d => d['입주APT']).filter(Boolean);
      setSuggestions(names);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setFiltered(value ? suggestions.filter(s => s.includes(value)) : []);
    setShowSuggest(!!value);
  };
  const handleSuggestClick = (s) => {
    setQuery(s);
    setFiltered([]);
    setShowSuggest(false);
  };

  // 더미 데이터
  const categories = [
    { id: 'closet', name: '붙박이장', icon: '🧰' },
    { id: 'curtain', name: '커튼', icon: '🪟' },
    { id: 'tile', name: '줄눈', icon: '🧽' },
    { id: 'wall', name: '도배', icon: '🖌️' },
    { id: 'clean', name: '청소', icon: '🧹' },
    { id: 'aircon', name: '에어컨', icon: '❄️' },
  ];
  
  const reviews = [
    { id: 1, user: '김**', category: '붙박이장', content: '시공이 꼼꼼하고 친절했어요!', rating: 5 },
    { id: 2, user: '박**', category: '커튼', content: '맞춤 커튼 너무 예뻐요.', rating: 4 },
    { id: 3, user: '이**', category: '줄눈', content: '욕실이 새집처럼 변했어요!', rating: 5 },
    { id: 4, user: '최**', category: '도배', content: '벽지 색감이 너무 마음에 들어요.', rating: 5 },
  ];
  
  const recommends = [
    { id: 1, name: '모모09 인테리어', desc: '20년 경력, 후기 4.9점', tag: '프리미엄 전문가' },
    { id: 2, name: '착한커튼', desc: '합리적 가격, 빠른 시공', tag: '인기 업체' },
    { id: 3, name: '클린홈', desc: '입주/이사 청소 전문, 만족도 98%', tag: '청소 전문가' },
  ];
  
  const communities = [
    { id: 1, name: '힐스테이트 더운정', members: 156, posts: 23, tag: '활발한 커뮤니티' },
    { id: 2, name: '더샵 일산퍼스트월드', members: 234, posts: 45, tag: '인기 단지' },
  ];
  
  const trending = ['붙박이장', '커튼', '줄눈', '에어컨', '입주청소', '공동구매'];

  // 새로운 섹션들을 위한 데이터
  const beforeAfterGallery = [
    { id: 1, before: '🏠', after: '🏠✨', category: '붙박이장', complex: '힐스테이트 더운정' },
    { id: 2, before: '🛁', after: '🛁✨', category: '줄눈', complex: '더샵 일산퍼스트월드' },
    { id: 3, before: '🪟', after: '🪟✨', category: '커튼', complex: '래미안 엘리니티' },
    { id: 4, before: '🧹', after: '🧹✨', category: '입주청소', complex: '자이 더샵' },
  ];

  const groupPurchases = [
    { id: 1, product: '삼성 에어컨', target: 50, current: 32, discount: '25%', endDate: '2024-01-15' },
    { id: 2, product: 'LG 커튼', target: 100, current: 78, discount: '30%', endDate: '2024-01-20' },
    { id: 3, product: '붙박이장 시공', target: 30, current: 25, discount: '20%', endDate: '2024-01-25' },
  ];

  const topProducts = [
    { id: 1, name: '삼성 무풍 에어컨', sales: 234, rating: 4.8, price: '89만원' },
    { id: 2, name: 'LG 스마트 커튼', sales: 189, rating: 4.7, price: '45만원' },
    { id: 3, name: '붙박이장 시공', sales: 156, rating: 4.9, price: '120만원' },
    { id: 4, name: '입주청소 서비스', sales: 145, rating: 4.6, price: '25만원' },
    { id: 5, name: '욕실 줄눈 시공', sales: 134, rating: 4.8, price: '15만원' },
  ];

  const expertStories = [
    { id: 1, name: '김인테리어', experience: '15년', specialty: '붙박이장', story: '고객의 꿈을 현실로 만드는 것이 제 일입니다.' },
    { id: 2, name: '박커튼', experience: '12년', specialty: '커튼', story: '맞춤 커튼으로 공간을 더욱 아름답게 만들어드립니다.' },
  ];

  const satisfactionStats = [
    { category: '붙박이장', satisfaction: 98, count: 156 },
    { category: '커튼', satisfaction: 96, count: 234 },
    { category: '줄눈', satisfaction: 97, count: 189 },
    { category: '입주청소', satisfaction: 95, count: 267 },
  ];

  const seasonalProducts = [
    { id: 1, name: '겨울철 에어컨 청소', discount: '15%', tag: '시즌 특가' },
    { id: 2, name: '봄맞이 커튼 교체', discount: '20%', tag: '신상품' },
    { id: 3, name: '입주 준비 패키지', discount: '25%', tag: '패키지 할인' },
  ];

  const notices = [
    { id: 1, title: '🎉 신년 이벤트: 모든 상품 10% 할인', date: '2024-01-01', important: true },
    { id: 2, title: '📢 붙박이장 시공 일정 조정 안내', date: '2024-01-05', important: false },
    { id: 3, title: '🎁 첫 구매 고객님께 사은품 증정', date: '2024-01-10', important: false },
  ];

  const reviewPhotos = [
    { id: 1, user: '김**', category: '붙박이장', photo: '📸', rating: 5, comment: '정말 만족스러워요!' },
    { id: 2, user: '박**', category: '커튼', photo: '📸', rating: 5, comment: '색감이 너무 예뻐요' },
    { id: 3, user: '이**', category: '줄눈', photo: '📸', rating: 4, comment: '깔끔하게 마무리됐어요' },
    { id: 4, user: '최**', category: '청소', photo: '📸', rating: 5, comment: '완벽한 청소였습니다' },
  ];

  return (
    <div className="momo09-home-wrap">
      {/* 메인 배너 */}
      <div className="momo09-main-banner">
        <div className="momo09-main-banner-title">
          <span className="momo09-logo">모모09</span>에서<br />
          입주 준비, 한 번에 끝내세요
        </div>
        <div className="momo09-main-banner-desc">
          모두 모아 공구, <b>신축 아파트 입주민을 위한 공동구매·시공 플랫폼</b>
        </div>
        <form className="momo09-search-form">
          <input type="text" placeholder="시공/서비스, 단지명, 브랜드 검색" onChange={handleChange} onFocus={() => setShowSuggest(true)} onBlur={() => setTimeout(() => setShowSuggest(false), 100)} />
          {showSuggest && query && (
            <ul className="momo09-suggestions">
              {filtered.slice(0, 5).map((s, i) => (
                <li key={i} onClick={() => handleSuggestClick(s)}>{s}</li>
              ))}
            </ul>
          )}
          <button type="submit">검색</button>
        </form>
        <div className="momo09-trending">
          <span>인기 검색어:</span>
          {trending.map((t, i) => (
            <span key={i} className="momo09-trend-item">{t}</span>
          ))}
        </div>
      </div>

      {/* 공지사항/이벤트 배너 */}
      <div className="momo09-section">
        <div className="momo09-notice-banner">
          {notices.map(notice => (
            <div key={notice.id} className={`momo09-notice-item ${notice.important ? 'important' : ''}`}>
              <span className="momo09-notice-title">{notice.title}</span>
              <span className="momo09-notice-date">{notice.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리 바로가기 */}
      <div className="momo09-section">
        <h2>카테고리 바로가기</h2>
        <div className="momo09-category-row">
          {categories.map(cat => (
            <div key={cat.id} className="momo09-category-card" onClick={() => navigate(`/category/${cat.name}`)}>
              <div className="momo09-category-icon">{cat.icon}</div>
              <div className="momo09-category-name">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 시공 전후 갤러리 */}
      <div className="momo09-section">
        <h2>시공 전후 갤러리</h2>
        <div className="momo09-gallery-row">
          {beforeAfterGallery.map(item => (
            <div key={item.id} className="momo09-gallery-card">
              <div className="momo09-gallery-images">
                <div className="momo09-before-after">
                  <div className="momo09-before">
                    <span className="momo09-image-placeholder">{item.before}</span>
                    <span className="momo09-before-label">시공 전</span>
                  </div>
                  <div className="momo09-after">
                    <span className="momo09-image-placeholder">{item.after}</span>
                    <span className="momo09-after-label">시공 후</span>
                  </div>
                </div>
              </div>
              <div className="momo09-gallery-info">
                <div className="momo09-gallery-category">{item.category}</div>
                <div className="momo09-gallery-complex">{item.complex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 실시간 공동구매 진행현황 */}
      <div className="momo09-section">
        <h2>🔥 실시간 공동구매 진행현황</h2>
        <div className="momo09-group-purchase-row">
          {groupPurchases.map(item => (
            <div key={item.id} className="momo09-group-purchase-card">
              <div className="momo09-group-purchase-header">
                <div className="momo09-group-purchase-title">{item.product}</div>
                <div className="momo09-group-purchase-discount">{item.discount} 할인</div>
              </div>
              <div className="momo09-group-purchase-progress">
                <div className="momo09-progress-bar">
                  <div 
                    className="momo09-progress-fill" 
                    style={{width: `${(item.current / item.target) * 100}%`}}
                  ></div>
                </div>
                <div className="momo09-progress-text">
                  {item.current}/{item.target}명 참여
                </div>
              </div>
              <div className="momo09-group-purchase-end">
                마감일: {item.endDate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 실시간 후기/시공사례 */}
      <div className="momo09-section">
        <h2>실시간 후기/시공사례</h2>
        <div className="momo09-review-row">
          {reviews.map(r => (
            <div key={r.id} className="momo09-review-card">
              <div className="momo09-review-header">
                <span className="momo09-review-user">{r.user}</span>
                <span className="momo09-review-cat">{r.category}</span>
                <span className="momo09-review-rating">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <div className="momo09-review-content">{r.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 고객 후기 사진 갤러리 */}
      <div className="momo09-section">
        <h2>📸 고객 후기 사진 갤러리</h2>
        <div className="momo09-review-photo-row">
          {reviewPhotos.map(item => (
            <div key={item.id} className="momo09-review-photo-card">
              <div className="momo09-review-photo-image">
                <span className="momo09-photo-placeholder">{item.photo}</span>
              </div>
              <div className="momo09-review-photo-info">
                <div className="momo09-review-photo-user">{item.user}</div>
                <div className="momo09-review-photo-category">{item.category}</div>
                <div className="momo09-review-photo-rating">{'★'.repeat(item.rating)}</div>
                <div className="momo09-review-photo-comment">{item.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추천 전문가/브랜드/상품 */}
      <div className="momo09-section">
        <h2>추천 전문가/브랜드/상품</h2>
        <div className="momo09-recommend-row">
          {recommends.map(rec => (
            <div key={rec.id} className="momo09-recommend-card">
              <div className="momo09-recommend-title">{rec.name}</div>
              <div className="momo09-recommend-tag">{rec.tag}</div>
              <div className="momo09-recommend-desc">{rec.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 전문가 인터뷰/스토리 */}
      <div className="momo09-section">
        <h2>👨‍🔧 전문가 인터뷰</h2>
        <div className="momo09-expert-story-row">
          {expertStories.map(expert => (
            <div key={expert.id} className="momo09-expert-story-card">
              <div className="momo09-expert-header">
                <div className="momo09-expert-name">{expert.name}</div>
                <div className="momo09-expert-specialty">{expert.specialty} 전문</div>
              </div>
              <div className="momo09-expert-experience">{expert.experience} 경력</div>
              <div className="momo09-expert-story">{expert.story}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 고객 만족도 통계 */}
      <div className="momo09-section">
        <h2>📊 고객 만족도 통계</h2>
        <div className="momo09-satisfaction-row">
          {satisfactionStats.map(stat => (
            <div key={stat.category} className="momo09-satisfaction-card">
              <div className="momo09-satisfaction-category">{stat.category}</div>
              <div className="momo09-satisfaction-rate">{stat.satisfaction}%</div>
              <div className="momo09-satisfaction-count">{stat.count}건</div>
            </div>
          ))}
        </div>
      </div>

      {/* 단지별 인기 상품 TOP 10 */}
      <div className="momo09-section">
        <h2>🏆 인기 상품 TOP 5</h2>
        <div className="momo09-top-products-row">
          {topProducts.map((product, index) => (
            <div key={product.id} className="momo09-top-product-card">
              <div className="momo09-top-product-rank">#{index + 1}</div>
              <div className="momo09-top-product-name">{product.name}</div>
              <div className="momo09-top-product-stats">
                <span className="momo09-top-product-sales">판매 {product.sales}건</span>
                <span className="momo09-top-product-rating">★ {product.rating}</span>
              </div>
              <div className="momo09-top-product-price">{product.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 시즌별 추천 상품 */}
      <div className="momo09-section">
        <h2>🎁 시즌별 추천 상품</h2>
        <div className="momo09-seasonal-row">
          {seasonalProducts.map(item => (
            <div key={item.id} className="momo09-seasonal-card">
              <div className="momo09-seasonal-name">{item.name}</div>
              <div className="momo09-seasonal-discount">{item.discount}</div>
              <div className="momo09-seasonal-tag">{item.tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 단지 커뮤니티 */}
      <div className="momo09-section">
        <h2>인기 단지 커뮤니티</h2>
        <div className="momo09-community-row">
          {communities.map(comm => (
            <div key={comm.id} className="momo09-community-card" onClick={() => navigate(`/complex/${comm.id}/community`)}>
              <div className="momo09-community-name">{comm.name}</div>
              <div className="momo09-community-stats">👥 {comm.members}명 · 💬 {comm.posts}개 글</div>
              <div className="momo09-community-tag">{comm.tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고객센터/회사정보 */}
      <footer className="momo09-footer">
        <div>고객센터 1670-0876 (09:00~18:00)</div>
        <div>모두 모아 공구, <b>모모09</b></div>
        <div>© 2024 momo09. All rights reserved.</div>
      </footer>
    </div>
  );
}
