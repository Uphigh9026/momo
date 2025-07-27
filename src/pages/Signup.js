import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SOCIALS = [
  { type: 'kakao', logo: '/images/kakao.png' },
  { type: 'naver', logo: '/images/naver.png' },
  { type: 'google', logo: 'https://developers.google.com/identity/images/g-logo.png' },
];

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [agree, setAgree] = useState(false);
  const [age14, setAge14] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agree || !age14) {
      alert('약관 및 만 14세 이상 동의가 필요합니다.');
      return;
    }
    // TODO: 실제 회원가입 처리
    alert('회원가입 시도: ' + email);
  };

  const handleSocial = (type) => {
    alert(type + ' 회원가입 연동 예정');
  };

  return (
    <div className="momo09-auth-wrap">
      <div className="momo09-auth-box">
        <h2 className="momo09-auth-title">회원가입</h2>
        <div className="momo09-auth-socials momo09-auth-socials-logo">
          {SOCIALS.map(s => (
            <button key={s.type} className={`momo09-social-btn ${s.type}`} onClick={() => handleSocial(s.type)}>
              <img src={s.logo} alt={s.type} className="momo09-social-logo" />
            </button>
          ))}
        </div>
        <div className="momo09-auth-divider">또는 이메일로 회원가입</div>
        <form className="momo09-auth-form" onSubmit={handleSignup}>
          <input type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="비밀번호 (8자 이상, 영문+숫자)" value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="password" placeholder="비밀번호 확인" value={password2} onChange={e => setPassword2(e.target.value)} required />
          <input type="text" placeholder="닉네임 (2~20자)" value={nickname} onChange={e => setNickname(e.target.value)} required />
          <div className="momo09-auth-checks">
            <label><input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} /> 약관 전체동의</label>
            <label><input type="checkbox" checked={age14} onChange={e => setAge14(e.target.checked)} /> 만 14세 이상입니다</label>
          </div>
          <button type="submit" className="momo09-auth-btn">회원가입</button>
        </form>
        <div className="momo09-auth-links">
          <button onClick={() => navigate('/login')}>이미 아이디가 있으신가요? 로그인</button>
        </div>
      </div>
    </div>
  );
} 