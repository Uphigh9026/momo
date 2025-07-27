import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryCloset() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://api.allorigins.win/raw?url=https://docs.google.com/spreadsheets/d/1CHY3BuZi4YoGQa-OHq08kgwPHf_dNGYJyLiKbLlNXGs/export?format=csv')
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').filter(Boolean);
        const headers = rows[0].split(',');
        const catIdx = headers.findIndex(h => h.trim() === '카테고리명');
        if (catIdx !== -1) {
          const all = rows.slice(1).map(line => {
            const values = line.split(',');
            return values[catIdx]?.trim();
          }).filter(Boolean);
          // 기타 카테고리만 추출
          const main = ['이사', '줄눈', '탄성', '붙박이장', '시스템에어컨', '입주청소', '커튼', '블라인드'];
          setCategories(all.filter(cat => !main.includes(cat)));
        }
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">기타 카테고리</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div
            key={cat}
            className="rounded-xl shadow-md bg-white hover:shadow-lg transition p-4 flex flex-col items-center cursor-pointer border border-gray-100 hover:border-momo-green text-center"
            onClick={() => navigate(`/category/${cat}`)}
          >
            <div className="font-bold text-base text-gray-800 mb-1 whitespace-nowrap">{cat}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 