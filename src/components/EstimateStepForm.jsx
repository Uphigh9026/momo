import React, { useState } from 'react';

const steps = [
  {
    label: '어떤 서비스를 신청하시겠어요?',
    type: 'select',
    options: ['줄눈', '붙박이장', '커튼', '입주청소', '탄성', '에어컨'],
    key: 'service',
  },
  // 추후 단계별 질문 추가 예정
];

export default function EstimateStepForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [steps[step].key]: e.target.value });
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    // 마지막 단계에서는 제출 처리 예정
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-4 font-semibold text-lg">{steps[step].label}</div>
      {steps[step].type === 'select' && (
        <select
          className="w-full border rounded p-2 mb-4"
          value={form[steps[step].key] || ''}
          onChange={handleChange}
        >
          <option value="">선택하세요</option>
          {steps[step].options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}
      <button
        className="w-full bg-momo-green text-white py-2 rounded mt-2 hover:bg-green-600 transition"
        onClick={handleNext}
        disabled={!form[steps[step].key]}
      >
        다음
      </button>
    </div>
  );
} 