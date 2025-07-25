import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="nav-bar">
      <div className="nav-logo" onClick={() => navigate('/')}>모모</div>
      <div className="nav-menu">
        <button onClick={() => {}}>견적요청</button>
        <button onClick={() => {}}>고수찾기</button>
        <button onClick={() => {}}>마켓</button>
        <button onClick={() => {}}>커뮤니티</button>
        <button onClick={() => {}}>인테리어</button>
        <button onClick={() => {}}>생활</button>
        <button onClick={() => {}}>고수가입</button>
      </div>
      <div className="nav-actions">
        <input className="nav-search" placeholder="통합검색" />
        <button onClick={() => {}}>글쓰기</button>
        <button onClick={() => navigate('/login')}>로그인</button>
        <button onClick={() => navigate('/signup')}>회원가입</button>
        <a href="tel:01098103024" className="nav-customer-btn">고객센터</a>
      </div>
    </nav>
  );
} 