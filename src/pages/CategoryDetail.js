import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoryDetail() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://corsproxy.io/?https://docs.google.com/spreadsheets/d/1CHY3BuZi4YoGQa-OHq08kgwPHf_dNGYJyLiKbLlNXGs/export?format=csv')
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').filter(Boolean);
        const headers = rows[0].split(',');
        const catIdx = headers.findIndex(h => h.trim() === '카테고리명');
        const svcIdx = headers.findIndex(h => h.trim() === '서비스명');
        const descIdx = headers.findIndex(h => h.trim() === '설명');
        if (catIdx !== -1 && svcIdx !== -1) {
          const filtered = rows.slice(1).map(line => {
            const values = line.split(',');
            return {
              category: values[catIdx],
              service: values[svcIdx],
              desc: descIdx !== -1 ? values[descIdx] : '',
            };
          }).filter(row => row.category === categoryName);
          setServices(filtered);
        } else {
          setServices([]);
        }
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button className="mb-6 text-momo-green hover:underline" onClick={() => navigate(-1)}>&larr; 뒤로가기</button>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{categoryName} 세부 서비스</h1>
      {loading ? (
        <div className="text-center py-10 text-gray-400">불러오는 중...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-10 text-gray-400">해당 카테고리의 서비스가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="rounded-xl shadow-md bg-white hover:shadow-lg transition p-5 flex flex-col cursor-pointer border border-gray-100 hover:border-momo-green hover:scale-105 active:scale-95 active:shadow-xl active:bg-gray-100 transition-transform duration-150"
            >
              <div className="font-bold text-lg text-gray-800 mb-1">{svc.service}</div>
              {svc.desc && <div className="text-gray-500 text-sm mb-2">{svc.desc}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 