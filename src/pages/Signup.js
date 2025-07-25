import React from 'react';
import './Home.css';

export default function Signup() {
  return (
    <div className="home-wrap" style={{maxWidth: 400, margin: '40px auto'}}>
      <h2 style={{fontSize: '1.5em', fontWeight: 'bold', marginBottom: 24}}>회원가입</h2>
      <form className="login-form">
        <input type="email" placeholder="이메일" className="login-input" required />
        <input type="password" placeholder="비밀번호" className="login-input" required />
        <input type="password" placeholder="비밀번호 확인" className="login-input" required />
        <button type="submit" className="login-btn">회원가입</button>
      </form>
    </div>
  );
} 