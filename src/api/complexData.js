// src/api/complexData.js
// 구글 시트에서 신축 단지 데이터를 fetch하는 함수 (CSV 방식)

export async function fetchComplexData() {
  const url = 'https://docs.google.com/spreadsheets/d/1cDfCBVIH5Mtuak3kvXmKCXvvfO6apZpHR5Apv6KfcRU/export?format=csv';
  const res = await fetch(url);
  const text = await res.text();
  // CSV 파싱 (간단 버전)
  const lines = text.split('\n').filter(Boolean);
  const headers = lines[0].split(',');
  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => { obj[h.trim()] = values[i]?.trim(); });
    return obj;
  });
  return data;
} 