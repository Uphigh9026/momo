import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const SOCIALS = [
  { type: 'kakao', logo: '/images/kakao.png' },
  { type: 'naver', logo: '/images/naver.png' },
  { type: 'google', logo: 'https://developers.google.com/identity/images/g-logo.png' },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: 실제 로그인 처리
    alert('로그인 시도: ' + email);
  };

  const handleSocial = (type) => {
    alert(type + ' 로그인 연동 예정');
  };

  return (
    <div className="momo09-auth-wrap">
      <div className="momo09-auth-box">
        <h2 className="momo09-auth-title">로그인</h2>
        <div className="momo09-auth-socials momo09-auth-socials-logo">
          {SOCIALS.map(s => (
            <button key={s.type} className={`momo09-social-btn ${s.type}`} onClick={() => handleSocial(s.type)}>
              <img src={s.logo} alt={s.type} className="momo09-social-logo" />
            </button>
          ))}
        </div>
        <div className="momo09-auth-divider">또는 이메일로 로그인</div>
        <form className="momo09-auth-form" onSubmit={handleLogin}>
          <input type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="momo09-auth-btn">로그인</button>
        </form>
        <div className="momo09-auth-links">
          <button onClick={() => alert('비밀번호 찾기 준비중')}>비밀번호 찾기</button>
          <span>·</span>
          <button onClick={() => navigate('/signup')}>회원가입</button>
        </div>
      </div>
    </div>
  );
} 