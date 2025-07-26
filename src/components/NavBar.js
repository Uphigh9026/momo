import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleMenuClick = (cb) => {
    if (isMobile) setMenuOpen(false);
    cb && cb();
  };

  const menus = [
    { label: '견적요청', path: '/' },
    { label: '고수찾기', path: '/' },
    { label: '마켓', path: '/' },
    { label: '커뮤니티', path: '/feed' },
    { label: '인테리어', path: '/' },
    { label: '이벤트', path: '/' },
  ];

  return (
    <nav className="momo09-nav-bar">
      <div className="momo09-nav-logo" onClick={() => navigate('/')}>momo09</div>
      {isMobile && (
        <button className="momo09-nav-hamburger" onClick={handleMenuToggle} aria-label="메뉴 열기/닫기">
          <span className="momo09-nav-hamburger-icon">☰</span>
        </button>
      )}
      <div className={`momo09-nav-menu${isMobile ? ' momo09-nav-menu-mobile' : ''}${menuOpen ? ' open' : ''}`}>
        {menus.map((m) => (
          <button key={m.label} onClick={() => handleMenuClick(() => navigate(m.path))}>{m.label}</button>
        ))}
      </div>
      <div className="momo09-nav-actions">
        <input className="momo09-nav-search" placeholder="통합검색" />
        <button onClick={() => handleMenuClick()}>글쓰기</button>
        <button onClick={() => handleMenuClick(() => navigate('/login'))}>로그인</button>
        <button onClick={() => handleMenuClick(() => navigate('/signup'))}>회원가입</button>
        <a href="tel:16700876" className="momo09-nav-customer-btn">고객센터</a>
      </div>
    </nav>
  );
} 