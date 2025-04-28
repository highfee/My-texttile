'use client';

import ChatWidget from "./ChatWidget";
import Faqsupport from "./Faqsupport";
import SupportForm from "./SupportForm";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-100 relative p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Support Form */}
        <SupportForm />
        <Faqsupport/>
        <div className="h-20"></div>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}
