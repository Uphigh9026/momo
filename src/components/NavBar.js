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

  return (
    <nav className="nav-bar">
      <div className="nav-logo" onClick={() => navigate('/')}>모모</div>
      {isMobile && (
        <button className="nav-hamburger" onClick={handleMenuToggle} aria-label="메뉴 열기/닫기">
          <span className="nav-hamburger-icon">☰</span>
        </button>
      )}
      <div className={`nav-menu${isMobile ? ' nav-menu-mobile' : ''}${menuOpen ? ' open' : ''}`}>
        <button onClick={() => handleMenuClick()}>견적요청</button>
        <button onClick={() => handleMenuClick()}>고수찾기</button>
        <button onClick={() => handleMenuClick()}>마켓</button>
        <button onClick={() => handleMenuClick()}>커뮤니티</button>
        <button onClick={() => handleMenuClick()}>인테리어</button>
        <button onClick={() => handleMenuClick()}>생활</button>
        <button onClick={() => handleMenuClick()}>고수가입</button>
      </div>
      <div className="nav-actions">
        <input className="nav-search" placeholder="통합검색" />
        <button onClick={() => handleMenuClick()}>글쓰기</button>
        <button onClick={() => handleMenuClick(() => navigate('/login'))}>로그인</button>
        <button onClick={() => handleMenuClick(() => navigate('/signup'))}>회원가입</button>
        <a href="tel:01098103024" className="nav-customer-btn">고객센터</a>
      </div>
    </nav>
  );
} 