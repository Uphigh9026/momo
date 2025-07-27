import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <nav className="w-full fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-gray-200 flex items-center justify-between px-2 sm:px-10 z-[1000] box-border shadow-[0_2px_12px_0_rgba(3,199,90,0.04)]">
      <div className="flex items-center w-full">
        {/* 햄버거 메뉴를 제일 좌측에 배치 */}
        {isMobile && (
          <button
            className="block bg-none border-none text-2xl text-[#03c75a] cursor-pointer mr-2 z-[1001]"
            onClick={handleMenuToggle}
            aria-label="메뉴 열기/닫기"
          >
            <span className="text-[1.5em] leading-none">☰</span>
          </button>
        )}
        <div
          className="text-[1.7em] font-extrabold text-[#03c75a] cursor-pointer mr-4 tracking-tight font-sans"
          onClick={() => navigate('/')}
        >
          momo09
        </div>
        {/* 메뉴 */}
        <div
          className={
            `${isMobile ? 'hidden absolute top-16 left-0 w-screen bg-white flex-col gap-0 shadow-[0_4px_16px_0_rgba(3,199,90,0.08)] z-[1000] px-0 pb-2 rounded-b-xl' : 'flex gap-6 flex-1 justify-center items-center'} ` +
            `${isMobile && menuOpen ? '!flex' : ''}`
          }
        >
          {menus.map((m) => (
            <button
              key={m.label}
              className={`bg-none border-none text-[1.08em] text-[#222] font-semibold cursor-pointer px-3 py-2 rounded-lg transition-colors duration-150 font-inherit ${isMobile ? 'w-full text-left px-5 py-4 text-[1.08em] rounded-none border-b border-[#e9fbe7] last:border-b-0 hover:bg-[#e9fbe7] hover:text-[#03c75a]' : 'hover:bg-[#e9fbe7] hover:text-[#03c75a]'}`}
              onClick={() => handleMenuClick(() => navigate(m.path))}
            >
              {m.label}
            </button>
          ))}
        </div>
        {/* 로그인/회원가입/고객센터 - 모바일에서도 가로 정렬 */}
        <div className={`flex flex-row items-center gap-2 sm:gap-3 ml-auto`} style={{ minWidth: isMobile ? '0' : 'auto' }}>
          <button
            className="bg-[#e9fbe7] border-none rounded-lg px-4 py-2 text-base text-[#03c75a] font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#03c75a] hover:text-white whitespace-nowrap"
            onClick={() => handleMenuClick(() => navigate('/login'))}
          >
            로그인
          </button>
          <button
            className="bg-[#e9fbe7] border-none rounded-lg px-4 py-2 text-base text-[#03c75a] font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#03c75a] hover:text-white whitespace-nowrap"
            onClick={() => handleMenuClick(() => navigate('/signup'))}
          >
            회원가입
          </button>
          <a
            href="tel:16700876"
            className="bg-[#e9fbe7] border-none rounded-lg px-4 py-2 text-base text-[#03c75a] font-semibold cursor-pointer no-underline transition-colors duration-150 inline-block hover:bg-[#03c75a] hover:text-white whitespace-nowrap"
          >
            고객센터
          </a>
        </div>
      </div>
    </nav>
  );
}