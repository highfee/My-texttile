'use client';
import { useState } from 'react';
export default function FooterBar() {
  const [backgroundColor, setBackgroundColor] = useState('#979797');
  const [textColor, setTextColor] = useState('#ffffff');
  const [about, setAbout] = useState('');
  const [showSocialLinks, setShowSocialLinks] = useState(true);
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    facebook: '',
    tiktok: '',
    twitter: '',
  });
  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Background color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-10 h-10 border rounded"
          />
          <input
            type="text"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Text Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-10 h-10 border rounded"
          />
          <input
            type="text"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>

      {/* About Textarea */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">About</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="About your brand"
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none"
        />
      </div>

      {/* Social Links Toggle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Social Links</label>
          <button
            type="button"
            onClick={() => setShowSocialLinks(!showSocialLinks)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${showSocialLinks ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${showSocialLinks ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
        </div>

        {/* Social Inputs */}
        {showSocialLinks && (
          <div className="space-y-4">
            {['instagram', 'facebook', 'tiktok', 'twitter'].map((platform) => (
              <div key={platform}>
                <label className="block text-sm text-gray-700 capitalize">
                  {platform === 'twitter' ? 'X(Twitter)' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                </label>
                <input
                  type="text"
                  placeholder="@username"
                  value={socialLinks[platform]}
                  onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
