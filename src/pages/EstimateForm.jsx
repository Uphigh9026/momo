import React from 'react';
import EstimateStepForm from '../components/EstimateStepForm';

export default function EstimateForm() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">견적 신청</h1>
      <EstimateStepForm />
    </div>
  );
} 