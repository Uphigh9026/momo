import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EstimateStart() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user'); // 임시 로그인 체크
    if (!user) {
      alert('로그인 후 견적 요청이 가능합니다.');
      navigate('/login');
    } else {
      navigate('/estimate/form');
    }
  }, [navigate]);
  return null;
} 