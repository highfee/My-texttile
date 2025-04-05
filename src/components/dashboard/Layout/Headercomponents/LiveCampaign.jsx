import React, { useEffect } from "react";
import { Copy } from "lucide-react";
import { FaXTwitter, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa6";

export function LiveCampaign({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const link = "https://www.my-store-1029a69b.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 z-0 flex items-center py-10  justify-center pointer-events-none">
          <img
            src="/landingpage/Group2.png"
            alt="confetti"
            className="opacity-80 object-contain max-w-[300px]"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-4">Campaign is Live!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your campaign has been successfully published and is now visible to
            your community.
          </p>
          <div className="w-28 rounded-full flex items-center justify-center animate-pulse mb-6">
            <img
              src="/landingpage/Clippathgroup.png"
              alt="confetti icon"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-lg mb-2">Share on social media</h3>
          <div className="flex items-center gap-2 justify-center mb-4 flex-wrap">
            <a
              href={link}
              className="text-blue-600 underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-sm border px-2 py-1 rounded hover:bg-gray-100"
            >
              <Copy size={16} />
              Copy Link
            </button>
          </div>
          <div className="flex justify-center items-center gap-6 text-2xl mt-2">
            <FaXTwitter />
            <FaFacebook className="text-bluebutton" />
            <FaTiktok className="text-black" />
            <FaInstagram
              className="text-3xl text-[#E1306C]"/>
          </div>
        </div>
      </div>
    </div>
  );
}
