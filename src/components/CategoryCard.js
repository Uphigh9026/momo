// src/components/CategoryCard.js
import React from 'react';

export default function CategoryCard({ icon, label }) {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', minWidth: '100px', textAlign: 'center' }}>
      <div style={{ fontSize: '24px' }}>{icon}</div>
      <div>{label}</div>
    </div>
  );
}
