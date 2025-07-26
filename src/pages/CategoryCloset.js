import React from 'react';
import './Home.css';

const PRODUCT_CANDIDATES = [
  { id: 1, name: '한샘 붙박이장 12자', votes: 5 },
  { id: 2, name: '한샘 붙박이장 15자', votes: 2 },
  { id: 3, name: '한샘 슬라이딩 붙박이장', votes: 3 },
];

const PARTICIPANTS = [
  { id: 1, name: '김입주', comment: '저도 참여 원해요!' },
  { id: 2, name: '박세대', comment: '15자 제품이 좋을 것 같아요.' },
  { id: 3, name: '이공동', comment: '공동구매 언제 시작하나요?' },
];

const BRANDS = [
  {
    id: 'hanssem',
    name: '한샘',
    desc: '국내 대표 종합 인테리어 브랜드',
    url: 'https://mall.hanssem.com/',
    logo: '한샘',
    actions: true,
    group: {
      deadline: '2025-12-31T23:59:00',
      discount: 10,
      remain: 3,
      extraDiscount: 3,
    },
  },
  {
    id: 'livart',
    name: '리바트',
    desc: '현대리바트의 프리미엄 가구 브랜드',
    url: 'https://www.hyundailivart.co.kr/',
    logo: '리바트',
    groupStatus: '마감',
  },
  {
    id: 'iloom',
    name: '일룸',
    desc: '생활을 바꾸는 가구, 일룸',
    url: 'https://www.iloom.com/',
    logo: '일룸',
    groupStatus: '준비중',
  },
];

function useCountdown(deadline) {
  const [remain, setRemain] = React.useState('');

  React.useEffect(() => {
    function update() {
      const end = new Date(deadline);
      const now = new Date();
      const diff = end - now;
      if (diff <= 0) {
        setRemain('마감되었습니다');
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setRemain(`${d}일 ${h}시간 ${m}분 ${s}초 남음`);
    }
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return remain;
}

export default function CategoryCloset() {
  const hanssem = BRANDS[0];
  const hanssemCountdown = useCountdown(hanssem.group.deadline);

  // 찜 상태 관리
  const [likes, setLikes] = React.useState({});
  const handleLike = (id) => {
    setLikes((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      alert(next[id] ? '찜 목록에 추가되었습니다!' : '찜이 해제되었습니다.');
      return next;
    });
  };

  // 제품 투표 상태
  const [votes, setVotes] = React.useState(PRODUCT_CANDIDATES.map(p => p.votes));
  const handleVote = (idx) => {
    setVotes(v => v.map((n, i) => i === idx ? n + 1 : n));
    alert('투표가 완료되었습니다!');
  };

  // 댓글 입력 상태
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState(PARTICIPANTS);
  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments(c => [...c, { id: c.length + 1, name: '익명', comment }]);
      setComment('');
    }
  };

  const handleAction = (type) => {
    let msg = '';
    switch(type) {
      case 'buy': msg = '구매 기능은 준비 중입니다.'; break;
      case 'reserve': msg = '예약 기능은 준비 중입니다.'; break;
      case 'deposit': msg = '계약금 결제 기능은 준비 중입니다.'; break;
      case 'group': msg = '공동구매 예약금 결제 기능은 준비 중입니다.'; break;
      case 'kakao': msg = '카카오톡 친구에게 추천하기 기능은 준비 중입니다.'; break;
      case 'apply': msg = '공동구매 신청 기능은 준비 중입니다.'; break;
      case 'suggest': msg = '공동구매 제안이 담당자 및 세대에게 전달되었습니다!'; break;
      default: msg = '준비 중입니다.';
    }
    alert(msg);
  };

  return (
    <div className="home-wrap">
      {/* 상단 자극적 배너 */}
      <div className="closet-banner">
        <span className="closet-banner-icon">🏆</span>
        <span className="closet-banner-main">전월 붙박이장 신축 단지 설치 우수 브랜드 1위: <b style={{color:'#e11d48'}}>일룸</b>!</span>
        <span className="closet-banner-sub">많은 고객님들이 <b>일룸</b>을 선택하고 있습니다!</span>
      </div>
      <h2 style={{fontSize: '1.6em', fontWeight: 'bold', marginBottom: 24}}>붙박이장 브랜드</h2>
      <div className="home-flex-row">
        {BRANDS.map((brand, idx) => (
          <div
            key={brand.id}
            className="home-card"
            style={{
              minWidth: 180,
              maxWidth: 320,
              alignItems: 'flex-start',
              textAlign: 'left',
              position: 'relative',
              background: brand.id === 'hanssem' ? '#eaf3ff' : brand.id === 'livart' ? '#f5f6fa' : '#fffbe6',
              border: '1.5px solid #e5e7eb',
              boxShadow: '0 4px 16px 0 rgba(37,99,235,0.06)',
            }}
          >
            {/* 찜 하트 */}
            <button
              className="like-btn"
              onClick={() => handleLike(brand.id)}
              style={{position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', cursor: 'pointer'}}
              aria-label="찜"
            >
              <span style={{fontSize: '1.5em', color: likes[brand.id] ? '#e11d48' : '#cbd5e1'}}>
                {likes[brand.id] ? '♥' : '♡'}
              </span>
            </button>
            {/* 오늘의집 스타일: 상단 인테리어 이미지, 로고+뱃지, 브랜드명, 별점, 설명, 버튼, 정보 */}
            <div className="ohou-card-top">
              <img
                src={brand.id === 'hanssem' ? 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
                  : brand.id === 'livart' ? 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80'
                  : 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80'}
                alt={brand.name + ' 인테리어 샘플'}
                className="ohou-main-img"
              />
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, marginTop: 10}}>
              <span className="brand-logo-text">{brand.logo}</span>
              {brand.id === 'hanssem' && (
                <>
                  <span className="badge badge-hot">인기</span>
                  <span className="badge badge-sale"><span className="highlight-sale">할인</span> 10%</span>
                  <span className="badge badge-progress">공동구매 진행중</span>
                </>
              )}
              {brand.id === 'livart' && (
                <>
                  <span className="badge badge-sale"><span className="highlight-sale">할인</span> 5%</span>
                  <span className="badge badge-deadline">공동구매 마감</span>
                </>
              )}
              {brand.id === 'iloom' && (
                <>
                  <span className="badge badge-progress">공동구매 준비중</span>
                  <span className="badge badge-best">전월 붙박이장 신축 단지 설치 우수 브랜드 1위</span>
                </>
              )}
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4}}>
              <div style={{fontWeight: 'bold', fontSize: '1.18em'}}>{brand.name}</div>
              {brand.id === 'hanssem' && (
                <span className="ohou-rating">★ 4.8 <span className="ohou-rating-count">(후기 120)</span></span>
              )}
              {brand.id === 'livart' && (
                <span className="ohou-rating">★ 4.6 <span className="ohou-rating-count">(후기 80)</span></span>
              )}
              {brand.id === 'iloom' && (
                <span className="ohou-rating">★ 4.7 <span className="ohou-rating-count">(후기 95)</span></span>
              )}
            </div>
            <div style={{fontSize: '0.99em', color: '#64748b', marginBottom: 10}}>{brand.desc}</div>
            {/* <a href={brand.url} target="_blank" rel="noopener noreferrer" style={{color: '#2563eb', fontWeight: 'bold', fontSize: '0.97em', display: 'block', marginBottom: 10}}>공식 사이트 바로가기</a> */}
            {brand.id === 'hanssem' && (
              <>
                {/* 공동구매 제안하기 */}
                <button className="group-suggest-btn" onClick={() => handleAction('suggest')}>공동구매 제안하기</button>
                {/* 제품 투표 */}
                <div className="group-vote">
                  <div className="group-vote-title">공동구매 후보 제품 투표</div>
                  <ul className="group-vote-list">
                    {PRODUCT_CANDIDATES.map((p, i) => (
                      <li key={p.id} className="group-vote-item">
                        <span>{p.name}</span>
                        <span className="group-vote-count">{votes[i]}표</span>
                        <button className="group-vote-btn" onClick={() => handleVote(i)}>투표</button>
                      </li>
                    ))}
                  </ul>
                  <div className="group-vote-winner">
                    현재 1위: <b>{PRODUCT_CANDIDATES[votes.indexOf(Math.max(...votes))].name}</b>
                  </div>
                </div>
                {/* 참여자/댓글 */}
                <div className="group-comments">
                  <div className="group-comments-title">공동구매 참여자/댓글</div>
                  <ul className="group-comments-list">
                    {comments.map(c => (
                      <li key={c.id} className="group-comment-item">
                        <span className="group-comment-name">{c.name}</span>
                        <span className="group-comment-content">{c.comment}</span>
                      </li>
                    ))}
                  </ul>
                  <form className="group-comment-form" onSubmit={handleComment}>
                    <input
                      type="text"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="댓글을 입력하세요 (익명)"
                      className="group-comment-input"
                    />
                    <button type="submit" className="group-comment-btn">댓글 등록</button>
                  </form>
                </div>
              </>
            )}
            {brand.actions && (
              <>
                <div className="brand-actions">
                  <button onClick={() => handleAction('buy')}>구매</button>
                  <button onClick={() => handleAction('reserve')}>예약</button>
                  <button onClick={() => handleAction('deposit')}>계약금 결제</button>
                  <button onClick={() => handleAction('group')}>공동구매 예약금 결제</button>
                </div>
                <div className="group-info" style={{background: '#f0f7ff', border: '1px solid #b6d4fe'}}>
                  <div className="group-deadline">
                    공동구매 마감: <b>{brand.group.deadline.replace('T', ' ').replace(':00', '')}</b>까지 <span className="highlight-sale">{brand.group.discount}% 할인</span>
                  </div>
                  <div className="group-countdown">{idx === 0 ? hanssemCountdown : null}</div>
                  <div className="group-remain" style={{color:'#f59e42', fontWeight:'bold'}}>{brand.group.remain}세대만 더 모집 시 각 세대당 추가 {brand.group.extraDiscount}% 할인!</div>
                  <div className="group-buttons">
                    <button className="kakao-btn" onClick={() => handleAction('kakao')}>카카오톡 친구에게 추천하기</button>
                    <button className="group-apply-btn" onClick={() => handleAction('apply')}>공동구매 신청하기</button>
                  </div>
                </div>
              </>
            )}
            {brand.groupStatus === '마감' && (
              <div className="group-info" style={{background: '#fff1f2', border: '1px solid #fca5a5'}}><div className="group-deadline" style={{color:'#e11d48', fontWeight:'bold'}}>공동구매 마감되었습니다</div></div>
            )}
            {brand.groupStatus === '준비중' && (
              <div className="group-info" style={{background: '#fefce8', border: '1px solid #fde68a'}}><div className="group-deadline" style={{color:'#64748b', fontWeight:'bold'}}>공동구매 준비중입니다</div></div>
            )}
            {brand.id === 'iloom' && (
              <div style={{margin: '8px 0 10px 0', color: '#e11d48', fontWeight: 'bold', fontSize: '1.02em'}}>
                전월 붙박이장 신축 단지 설치 우수 브랜드 1위!<br />많은 고객님들이 일룸을 선택하고 있습니다.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 