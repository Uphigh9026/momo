// src/components/CategoryCard.js
import React from 'react';

export default function CategoryCard({ icon, label, desc, onClick }) {
  return (
    <div
      className="rounded-xl shadow-md bg-white hover:shadow-lg transition p-4 flex flex-col items-center cursor-pointer border border-gray-100 hover:border-momo-green text-center w-32 sm:w-36 m-1 hover:scale-105 active:scale-95 active:shadow-xl active:bg-gray-100 transition-transform duration-150"
      onClick={onClick}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-bold text-lg text-gray-800 mb-1 whitespace-nowrap">{label}</div>
      {desc && <div className="text-gray-500 text-xs text-center whitespace-nowrap">{desc}</div>}
    </div>
  );
}
