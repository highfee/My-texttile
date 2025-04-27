'use client';

import { useState } from 'react';

export default function Faqsupport() {
  const [activeTab, setActiveTab] = useState('FAQs');
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How to order',
      answer: 'You can place an order by selecting the desired products and proceeding to checkout.',
    },
    {
      question: 'How to join MyTextil Campaign program',
      answer: 'Sign up through your dashboard and start promoting your designs to earn rewards!',
    },
    {
      question: 'How to be an Affiliate',
      answer: 'You earn a percentage of the revenue from every sale of your products. Your earnings are tracked in the Earnings Dashboard, and you can withdraw funds through various payout methods like bank transfer or PayPal.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-md py-4">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab('FAQs')}
          className={`pb-2 ${activeTab === 'FAQs' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
        >
          FAQs
        </button>
        <button
          onClick={() => setActiveTab('Refund')}
          className={`pb-2 ${activeTab === 'Refund' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
        >
          Refund
        </button>
      </div>

      {/* Accordions */}
      {activeTab === 'FAQs' && (
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-4 flex justify-between items-center bg-white hover:bg-gray-100"
              >
                <span>{item.question}</span>
                <span>{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <div className="bg-blue-50 p-4 text-sm text-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Refund' && (
        <div className="text-gray-700 p-4 bg-gray-100 rounded-md">
          Refund policy information goes here. (You can customize this part.)
        </div>
      )}

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* Card 1 */}
        <div className="border rounded-md p-6 hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💬</span>
            <h3 className="font-semibold">Need Help? Chat With Us!</h3>
          </div>
          <p className="text-sm text-gray-600">
            Click the Live Chat button to start a conversation with us now. 😊
          </p>
        </div>

        {/* Card 2 */}
        <div className="border rounded-md p-6 hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📰</span>
            <h3 className="font-semibold">Blog</h3>
          </div>
          <p className="text-sm text-gray-600">
            Explore tips, guides, and the latest updates on our platform. Check out our Blog for valuable contents!
          </p>
        </div>

        {/* Card 3 */}
        <div className="border rounded-md p-6 hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🎨</span>
            <h3 className="font-semibold">Creator Resources:</h3>
          </div>
          <p className="text-sm text-gray-600">
            Get guides and tutorials on how to create compelling designs.
          </p>
        </div>
      </div>
    </div>
  );
}
