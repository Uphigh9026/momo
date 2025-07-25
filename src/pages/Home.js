import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import ClosetIcon from '@mui/icons-material/Checkroom'; // 옷장
import CurtainsIcon from '@mui/icons-material/Window'; // 커튼
import CleaningIcon from '@mui/icons-material/CleaningServices'; // 청소
import PaintIcon from '@mui/icons-material/FormatPaint'; // 도배
import AcUnitIcon from '@mui/icons-material/AcUnit'; // 에어컨
import BathroomIcon from '@mui/icons-material/Bathroom'; // 줄눈

const SUGGESTIONS = [
  "힐스테이트 더운정", "힐스테이트 리버시티", "더샵 일산퍼스트월드",
  "커튼", "붙박이장", "줄눈", "도배", "청소", "에어컨"
];

export default function Home() {
  const navigate = useNavigate();

  const SITE_NAME = "모모";

  const CATEGORIES = [
    { id: "붙박이장", name: "붙박이장", description: "시공/제작", icon: <ClosetIcon style={{fontSize: 36, color: '#2563eb'}} /> },
    { id: "커튼", name: "커튼", description: "설치/맞춤", icon: <CurtainsIcon style={{fontSize: 36, color: '#22c55e'}} /> },
    { id: "줄눈", name: "줄눈", description: "욕실 마감", icon: <BathroomIcon style={{fontSize: 36, color: '#fbbf24'}} /> },
    { id: "도배", name: "도배", description: "벽지/페인트", icon: <PaintIcon style={{fontSize: 36, color: '#a855f7'}} /> },
    { id: "청소", name: "청소", description: "입주/이사", icon: <CleaningIcon style={{fontSize: 36, color: '#06b6d4'}} /> },
    { id: "에어컨", name: "에어컨", description: "설치/청소", icon: <AcUnitIcon style={{fontSize: 36, color: '#60a5fa'}} /> },
  ];

  const REVIEWS = [
    { id: 1, user: "김**", category: "붙박이장", content: "시공이 꼼꼼하고 친절했어요!", rating: 5 },
    { id: 2, user: "박**", category: "커튼", content: "맞춤 커튼 너무 예뻐요.", rating: 4 },
    { id: 3, user: "이**", category: "줄눈", content: "욕실이 새집처럼 변했어요!", rating: 5 },
  ];

  const RECOMMENDS = [
    { id: 1, name: "모모 인테리어", desc: "20년 경력, 후기 4.9점", tag: "프리미엄 전문가" },
    { id: 2, name: "착한커튼", desc: "합리적 가격, 빠른 시공", tag: "인기 업체" },
  ];

  // 자동완성 상태
  const [query, setQuery] = React.useState("");
  const [filtered, setFiltered] = React.useState([]);
  const [showSuggest, setShowSuggest] = React.useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setFiltered(value ? SUGGESTIONS.filter(s => s.includes(value)) : []);
    setShowSuggest(!!value);
  };

  const handleSuggestClick = (s) => {
    setQuery(s);
    setFiltered([]);
    setShowSuggest(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = query.trim();
    if (searchValue) navigate(`/search?q=${searchValue}`);
  };

  return (
    <div className="home-wrap">
      {/* 회원가입 버튼 섹션 */}
      <div className="home-signup-section">
        <h3>간편 회원가입</h3>
        <div className="home-signup-buttons">
          <button className="signup-btn naver">네이버로 시작</button>
          <button className="signup-btn google">구글로 시작</button>
          <button className="signup-btn apple">애플로 시작</button>
          <button className="signup-btn kakao">카카오로 시작</button>
          <button className="signup-btn email" onClick={() => navigate('/signup')}>이메일로 가입</button>
        </div>
      </div>

      {/* 상단 검색 배너 */}
      <div className="home-banner">
        <h1>
          <span className="home-banner-site">{SITE_NAME}</span>에서<br />입주 준비, 한 번에 끝내세요
        </h1>
        <p>신축 아파트 입주민을 위한 <b>공동구매 · 시공 플랫폼</b></p>
        <form onSubmit={handleSearch} className="home-search-form" autoComplete="off">
          <div style={{position: 'relative', width: '100%'}}>
            <input
              type="text"
              name="query"
              placeholder="시공/서비스, 단지명 검색"
              value={query}
              onChange={handleChange}
              onFocus={() => setShowSuggest(!!query)}
              onBlur={() => setTimeout(() => setShowSuggest(false), 100)}
            />
            {showSuggest && filtered.length > 0 && (
              <ul className="suggest-list">
                {filtered.map(s => (
                  <li key={s} onMouseDown={() => handleSuggestClick(s)}>{s}</li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit">검색</button>
        </form>
      </div>

      {/* 인기 카테고리 */}
      <div className="home-section">
        <h2>🏷️ 인기 카테고리</h2>
        <div className="home-flex-row">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="home-card"
              onClick={() => navigate(`/category/${cat.id}`)}
            >
              <div className="home-card-icon">{cat.icon}</div>
              <div className="home-card-title">{cat.name}</div>
              <div className="home-card-desc">{cat.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 최근 후기/시공사례 */}
      <div className="home-section">
        <h2>📝 최근 후기/시공사례</h2>
        <div className="home-flex-row">
          {REVIEWS.map((r) => (
            <div key={r.id} className="home-card home-review">
              <div className="home-review-header">
                <span className="home-review-user">{r.user}</span>
                <span className="home-review-cat">{r.category}</span>
                <span className="home-review-rating">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <div className="home-review-content">{r.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 전문가/상품 추천 */}
      <div className="home-section">
        <h2>🏅 전문가/상품 추천</h2>
        <div className="home-flex-row">
          {RECOMMENDS.map((rec) => (
            <div key={rec.id} className="home-card home-recommend">
              <div className="home-recommend-header">
                <span className="home-recommend-title">{rec.name}</span>
                <span className="home-recommend-tag">{rec.tag}</span>
              </div>
              <div className="home-recommend-desc">{rec.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 플로팅 버튼 */}
      <div className="home-floating">
        <button className="home-floating-btn home-kakao">카카오톡 상담</button>
        <button className="home-floating-btn home-register">우리 단지 등록</button>
      </div>
    </div>
  );
}
