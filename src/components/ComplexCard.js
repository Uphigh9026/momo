// src/components/ComplexCard.js
import React from 'react';

export default function ComplexCard({ complex }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '10px' }}>
      <h3>{complex.name}</h3>
      <p>입주일: {complex.moveInDate}</p>
      <a href={complex.chatUrl} target="_blank" rel="noopener noreferrer">
        <button>오픈채팅 입장</button>
      </a>
    </div>
  );
}
