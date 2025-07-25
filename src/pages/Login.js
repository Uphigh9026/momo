import React from 'react';
import './Home.css';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Login() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('구글 로그인 성공!');
      // TODO: 로그인 후 메인 페이지 이동 등 추가 처리
    } catch (error) {
      alert('구글 로그인 실패: ' + error.message);
    }
  };

  return (
    <div className="home-wrap" style={{maxWidth: 400, margin: '40px auto'}}>
      <h2 style={{fontSize: '1.5em', fontWeight: 'bold', marginBottom: 24}}>로그인</h2>
      <form className="login-form">
        <input type="email" placeholder="이메일" className="login-input" required />
        <input type="password" placeholder="비밀번호" className="login-input" required />
        <button type="submit" className="login-btn">로그인</button>
      </form>
      <div style={{margin: '24px 0', textAlign: 'center'}}>
        <button type="button" className="login-btn google" onClick={handleGoogleLogin} style={{background: '#fff', color: '#222', border: '1px solid #e5e7eb', marginTop: 8}}>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={{width: 20, marginRight: 8, verticalAlign: 'middle'}} />
          구글로 로그인
        </button>
      </div>
    </div>
  );
} 