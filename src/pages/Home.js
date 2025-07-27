import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchComplexData } from '../api/complexData';

export default function Home() {
  const navigate = useNavigate();

  // 자동완성용 단지명 리스트
  const [suggestions, setSuggestions] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [filtered, setFiltered] = React.useState([]);
  const [showSuggest, setShowSuggest] = React.useState(false);

  // 카테고리 시트 fetch용 상태
  const [extraCategories, setExtraCategories] = React.useState([]);

  React.useEffect(() => {
    fetchComplexData().then(data => {
      console.log('구글시트 fetch 결과:', data);
      if (data && data.length > 0) {
        console.log('첫 데이터의 키:', Object.keys(data[0]));
      }
      // 입주APT명, 세대수, 시/도(시트의 B열)를 함께 suggestions에 저장
      const items = data
        .filter(d => d['입주APT'] && d['세대수'] && d['시/도'])
        .map(d => ({ name: d['입주APT'], count: d['세대수'], city: d['시/도'], type: 'apt' }));

      // 카테고리 시트 fetch (두 번째 구글시트)
      fetch('https://api.allorigins.win/raw?url=https://docs.google.com/spreadsheets/d/1CHY3BuZi4YoGQa-OHq08kgwPHf_dNGYJyLiKbLlNXGs/export?format=csv')
        .then(res => res.text())
        .then(text => {
          const rows = text.split('\n').filter(Boolean);
          const headers = rows[0].split(',');
          const catIdx = headers.findIndex(h => h.trim() === '카테고리명');
          if (catIdx !== -1) {
            const categories = rows.slice(1).map(line => {
              const values = line.split(',');
              return values[catIdx]?.trim();
            }).filter(Boolean);
            // 기타 카테고리용 상태 저장
            setExtraCategories(categories.filter(cat => ![
              '이사', '줄눈', '탄성', '붙박이장', '시스템에어컨', '입주청소', '커튼', '블라인드'
            ].includes(cat)));
          }
        })
        .catch(() => setSuggestions([...items]));
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setFiltered(value ? suggestions.filter(s => s.name.includes(value)) : []);
    setShowSuggest(!!value);
    // 진단용 콘솔 로그
    console.log('suggestions:', suggestions);
    console.log('filtered:', value ? suggestions.filter(s => s.name.includes(value)) : []);
    console.log('showSuggest:', !!value);
  };
  const handleSuggestClick = (s) => {
    setQuery(s.name);
    setFiltered([]);
    setShowSuggest(false);
    if (s.type === 'category') {
      navigate(`/category/${s.name}`);
    }
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

  // 카테고리 카드 순서 및 정보
  const mainCategories = [
    { id: '이사', name: '이사', icon: '🚚', desc: '포장이사, 잔짐정리 등' },
    { id: '줄눈', name: '줄눈', icon: '🧽', desc: '줄눈시공, 욕실관리' },
    { id: '탄성', name: '탄성', icon: '🧴', desc: '탄성코트, 방수' },
    { id: '붙박이장', name: '붙박이장', icon: '🧰', desc: '맞춤 붙박이장' },
    { id: '시스템에어컨', name: '시스템에어컨', icon: '❄️', desc: '에어컨 설치/청소' },
    { id: '입주청소', name: '입주청소', icon: '🧹', desc: '입주/이사 청소' },
    { id: '커튼', name: '커튼', icon: '🪟', desc: '커튼, 블라인드' },
    { id: '블라인드', name: '블라인드', icon: '🪟', desc: '블라인드, 창호' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-pretendard">
      {/* 메인 배너 - Tailwind CSS 적용 */}
      <div className="bg-gradient-to-br from-momo-light-green to-gray-50 py-12 text-center border-b-2 border-gray-200 flex flex-col items-center">
        <div className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
          <span className="text-momo-green font-black text-5xl tracking-wide">모모09</span>에서<br />
          입주 준비, 한 번에 끝내세요
        </div>
        <div className="text-gray-600 text-lg mb-4">
          모두 모아 공구, <b>신축 아파트 입주민을 위한 공동구매·시공 플랫폼</b>
        </div>
        <form className="flex justify-center items-center gap-0 mb-3 relative w-full max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="시공/서비스, 단지명, 브랜드 검색" 
            onChange={handleChange} 
            onFocus={() => setShowSuggest(true)} 
            onBlur={() => setTimeout(() => setShowSuggest(false), 100)}
            className="w-full px-4 py-3 rounded-l-lg text-base bg-white border-none outline-none shadow-none focus:ring-0 focus:border-transparent appearance-none"
          />
          {showSuggest && query && (
            <ul className="absolute left-0 top-full w-full bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto mt-1">
              {filtered.slice(0, 5).map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestClick(s)}
                  className="flex items-center px-2 py-2 sm:px-4 sm:py-3 cursor-pointer text-gray-800 transition-colors duration-150 hover:bg-momo-light-green hover:text-momo-green first:rounded-t-xl last:rounded-b-xl min-w-0"
                >
                  <svg className="w-5 h-5 text-momo-green mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
                  <span className="font-semibold flex-1 text-left truncate whitespace-nowrap overflow-hidden">{s.name}</span>
                  {s.type === 'apt' && <span className="text-xs text-gray-500 flex-1 text-center truncate whitespace-nowrap overflow-hidden">{s.count}세대</span>}
                  {s.type === 'apt' && <span className="ml-auto text-xs text-gray-400 text-right truncate whitespace-nowrap overflow-hidden">{s.city}</span>}
                </li>
              ))}
            </ul>
          )}
          <button type="submit" className="px-6 py-3 bg-momo-green text-white border-none rounded-r-lg text-base font-bold cursor-pointer hover:bg-momo-dark-green transition-colors">
            검색
          </button>
        </form>
        {/* 인기 검색어 */}
        <div className="max-w-6xl mx-auto mt-2 px-4">
          <div className="flex items-center gap-2 text-gray-500 text-base mb-3">
            <span className="flex-shrink-0">인기 검색어:</span>
            <div className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide">
              {trending.map((t, i) => (
                <span key={i} className="bg-momo-light-green text-momo-green rounded-full px-3 py-1 font-medium text-sm whitespace-nowrap min-w-fit">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 공지사항/이벤트 배너 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="bg-gradient-to-br from-yellow-100 to-white rounded-xl p-4 border border-yellow-300 mb-5">
          {notices.map(notice => (
            <div key={notice.id} className={`flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0 ${notice.important ? 'bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg p-3 my-2' : ''}`}>
              <span className={`font-semibold text-sm ${notice.important ? '' : ''}`}>{notice.title}</span>
              <span className={`text-xs ${notice.important ? 'text-white/80' : 'text-gray-500'}`}>{notice.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리 바로가기 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">카테고리 바로가기</h2>
        <div className="flex gap-4 flex-wrap justify-start">
          {mainCategories.map(cat => (
            <div
              key={cat.id}
              className="rounded-xl shadow-md bg-white hover:shadow-lg transition p-4 flex flex-col items-center w-32 sm:w-36 cursor-pointer border border-gray-100 hover:border-momo-green"
              onClick={() => navigate(`/category/${cat.name}`)}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-bold text-lg text-gray-800 mb-1 whitespace-nowrap">{cat.name}</div>
              <div className="text-gray-500 text-xs text-center whitespace-nowrap">{cat.desc}</div>
            </div>
          ))}
          {/* 기타 카테고리 카드 */}
          {extraCategories.length > 0 && (
            <div className="rounded-xl shadow-md bg-white hover:shadow-lg transition p-4 flex flex-col items-center w-32 sm:w-36 cursor-pointer border border-gray-100 hover:border-momo-green"
              onClick={() => navigate('/category/기타')}
            >
              <div className="text-2xl mb-2">🗂️</div>
              <div className="font-bold text-lg text-gray-800 mb-1 whitespace-nowrap">기타</div>
              <div className="text-gray-500 text-xs text-center whitespace-nowrap mb-1">더 많은 시공/서비스</div>
            </div>
          )}
        </div>
      </div>

      {/* 시공 전후 갤러리 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">시공 전후 갤러리</h2>
        <div className="flex gap-4 flex-wrap">
          {beforeAfterGallery.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-4 min-w-72 max-w-80 flex-1 mb-3 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 hover:scale-105">
              <div className="flex gap-3 mb-3">
                <div className="flex-1 text-center p-4 rounded-xl bg-gray-50">
                  <span className="text-5xl block mb-2">{item.before}</span>
                  <span className="text-sm font-semibold text-gray-600">시공 전</span>
                </div>
                <div className="flex-1 text-center p-4 rounded-xl bg-gradient-to-br from-momo-light-green to-blue-50">
                  <span className="text-5xl block mb-2">{item.after}</span>
                  <span className="text-sm font-semibold text-momo-green">시공 후</span>
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-momo-green text-lg mb-1">{item.category}</div>
                <div className="text-gray-600 text-sm">{item.complex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 실시간 공동구매 진행현황 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">🔥 실시간 공동구매 진행현황</h2>
        <div className="flex gap-4 flex-wrap">
          {groupPurchases.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-red-500 to-red-400 rounded-2xl p-4 min-w-72 max-w-80 flex-1 mb-3 text-white">
              <div className="flex justify-between items-center mb-3">
                <div className="font-bold text-lg">{item.product}</div>
                <div className="bg-white/20 px-2 py-1 rounded-lg text-sm font-bold">{item.discount} 할인</div>
              </div>
              <div className="mb-3">
                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{width: `${(item.current / item.target) * 100}%`}}
                  ></div>
                </div>
                <div className="text-sm text-center">{item.current}/{item.target}명 참여</div>
              </div>
              <div className="text-xs text-center opacity-90">마감일: {item.endDate}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 실시간 후기/시공사례 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">실시간 후기/시공사례</h2>
        <div className="flex gap-4 flex-wrap">
          {reviews.map(r => (
            <div key={r.id} className="bg-white rounded-2xl shadow-lg p-4 min-w-56 max-w-64 flex-1 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-momo-green">{r.user}</span>
                <span className="bg-momo-light-green text-momo-green rounded-lg px-2 py-1 text-sm ml-1">{r.category}</span>
                <span className="text-yellow-400 text-lg ml-2">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <div className="text-gray-700 text-sm">{r.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 고객 후기 사진 갤러리 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">📸 고객 후기 사진 갤러리</h2>
        <div className="flex gap-4 flex-wrap">
          {reviewPhotos.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-4 min-w-56 max-w-64 flex-1 mb-3 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 hover:scale-105">
              <div className="text-center mb-3">
                <span className="text-6xl block">{item.photo}</span>
              </div>
              <div className="text-center">
                <div className="font-bold text-momo-green mb-1">{item.user}</div>
                <div className="bg-momo-light-green text-momo-green rounded-lg px-2 py-1 text-sm inline-block mb-2">{item.category}</div>
                <div className="text-yellow-400 text-lg mb-2">{'★'.repeat(item.rating)}</div>
                <div className="text-gray-700 text-sm">{item.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추천 전문가/브랜드/상품 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">추천 전문가/브랜드/상품</h2>
        <div className="flex gap-4 flex-wrap">
          {recommends.map(rec => (
            <div key={rec.id} className="bg-white rounded-2xl shadow-lg p-4 min-w-56 max-w-64 flex-1 mb-3">
              <div className="font-bold text-momo-green text-lg mb-1">{rec.name}</div>
              <div className="bg-momo-light-green text-momo-green rounded-lg px-2 py-1 text-sm mb-2 inline-block">{rec.tag}</div>
              <div className="text-gray-700 text-sm">{rec.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 전문가 인터뷰/스토리 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">👨‍🔧 전문가 인터뷰</h2>
        <div className="flex gap-4 flex-wrap">
          {expertStories.map(expert => (
            <div key={expert.id} className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 min-w-72 max-w-80 flex-1 mb-3 text-white">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-lg">{expert.name}</div>
                <div className="bg-white/20 px-2 py-1 rounded-lg text-sm">{expert.specialty} 전문</div>
              </div>
              <div className="text-sm mb-3 opacity-90">{expert.experience} 경력</div>
              <div className="italic leading-relaxed">{expert.story}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 고객 만족도 통계 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">📊 고객 만족도 통계</h2>
        <div className="flex gap-4 flex-wrap">
          {satisfactionStats.map(stat => (
            <div key={stat.category} className="bg-white rounded-2xl shadow-lg p-4 min-w-52 max-w-60 flex-1 mb-3 text-center">
              <div className="font-bold text-momo-green text-lg mb-2">{stat.category}</div>
              <div className="text-4xl font-bold text-momo-green mb-1">{stat.satisfaction}%</div>
              <div className="text-gray-600 text-sm">{stat.count}건</div>
            </div>
          ))}
        </div>
      </div>

      {/* 단지별 인기 상품 TOP 10 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">🏆 인기 상품 TOP 5</h2>
        <div className="flex gap-4 flex-wrap">
          {topProducts.map((product, index) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg p-4 min-w-56 max-w-64 flex-1 mb-3 relative cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 hover:scale-105">
              <div className="absolute -top-2 -left-2 bg-gradient-to-br from-red-500 to-red-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                #{index + 1}
              </div>
              <div className="font-bold text-gray-800 text-lg mb-2 mt-2">{product.name}</div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 text-sm">판매 {product.sales}건</span>
                <span className="text-yellow-400 font-bold">★ {product.rating}</span>
              </div>
              <div className="font-bold text-momo-green text-lg">{product.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 시즌별 추천 상품 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">🎁 시즌별 추천 상품</h2>
        <div className="flex gap-4 flex-wrap">
          {seasonalProducts.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl p-4 min-w-56 max-w-64 flex-1 mb-3 text-white cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 hover:scale-105">
              <div className="font-bold text-lg mb-2">{item.name}</div>
              <div className="text-2xl font-bold mb-2">{item.discount}</div>
              <div className="bg-white/20 px-2 py-1 rounded-lg text-sm inline-block">{item.tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 단지 커뮤니티 */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">인기 단지 커뮤니티</h2>
        <div className="flex gap-4 flex-wrap">
          {communities.map(comm => (
            <div key={comm.id} className="bg-gradient-to-br from-momo-light-green to-gray-50 rounded-2xl shadow-lg p-4 min-w-56 max-w-64 flex-1 mb-3 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 hover:scale-105" onClick={() => navigate(`/complex/${comm.id}/community`)}>
              <div className="font-bold text-momo-green text-lg mb-1">{comm.name}</div>
              <div className="text-gray-600 text-sm mb-2">👥 {comm.members}명 · 💬 {comm.posts}개 글</div>
              <div className="bg-white text-momo-green rounded-lg px-2 py-1 text-sm inline-block">{comm.tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고객센터/회사정보 */}
      <footer className="bg-white text-gray-600 text-center py-8 mt-12 border-t-2 border-gray-200">
        <div>고객센터 1670-0876 (09:00~18:00)</div>
        <div>모두 모아 공구, <b className="text-momo-green">모모09</b></div>
        <div>© 2024 momo09. All rights reserved.</div>
      </footer>
    </div>
  );
}
