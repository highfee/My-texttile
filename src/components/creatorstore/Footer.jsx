'use client';

export default function Footer({ onSupportClick }) {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        {/* Top Section - My Store */}
        <div className="text-center">
          <h2 className="text-xl font-semibold">My Store</h2>
        </div>

        {/* Middle Links */}
        <div className="flex flex-col lg:flex-row justify-center gap-6 text-sm opacity-[0.77]">
          <a href="#" className="hover:text-white">Track Item</a>
          <button onClick={onSupportClick} className="hover:text-white">
            Support
          </button>
          <a href="#" className="hover:text-white">Contact Us</a>
          <a href="#" className="hover:text-white">Refund Policy</a>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-[0.77] pt-6">
          <p>Copyright © 2025 Mystore. All Rights Reserved</p>

          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <img src="/dashboard/completelogo.svg" alt="MyTextil Logo" className="h-8" />
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms Of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
