'use client';
import { useState } from 'react';

export default function HeroBar() {
  const [heroTitle, setHeroTitle] = useState('Elevate your looks with Dabz Collection');
  const [heroText, setHeroText] = useState('Elevate your looks with Dabz Collection');
  const [heroCTA, setHeroCTA] = useState('Shop Now');
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Background Image</label>
        <p className="text-xs text-gray-400">Recommended size 1245x450px</p>
        <div className="relative border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">
          {backgroundImage ? (
            <img src={backgroundImage} alt="Background" className="object-cover w-full h-48 rounded-md" />
          ) : (
            <>
              <label className="cursor-pointer inline-block bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-blue-600">
                upload logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Hero Title</label>
        <input
          type="text"
          value={heroTitle}
          onChange={(e) => setHeroTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Hero Text</label>
        <input
          type="text"
          value={heroText}
          onChange={(e) => setHeroText(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Hero CTA</label>
        <button className="border border-gray-300 rounded-md w-full px-4 py-2 font-medium hover:bg-gray-100">
          {heroCTA}
        </button>
      </div>
    </div>
  );
}
