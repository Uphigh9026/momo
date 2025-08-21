// src/api/complexData.js
// 구글 시트에서 신축 단지 데이터를 fetch하는 함수 (CSV 방식)

export async function fetchComplexData() {
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1cDfCBVIH5Mtuak3kvXmKCXvvfO6apZpHR5Apv6KfcRU/export?format=csv';
  const PROXY_URL = 'https://corsproxy.io/?';
  const url = PROXY_URL + SHEET_URL;
  try {
    const res = await fetch(url);
    const text = await res.text();
    // CSV 파싱 개선 (쉼표 포함 데이터 대응)
    const rows = text.split('\n').filter(Boolean);
    const headers = rows[0].split(',');
    const data = rows.slice(1).map(line => {
      const values = line.match(/("[^"]*"|[^,])+/g)?.map(v => v.replace(/^"|"$/g, '').trim()) || [];
      const obj = {};
      headers.forEach((h, i) => { obj[h.trim()] = values[i]?.trim(); });
      return obj;
    });
    return data;
  } catch (e) {
    console.error('구글시트 fetch 실패:', e);
    return [];
  }
} 