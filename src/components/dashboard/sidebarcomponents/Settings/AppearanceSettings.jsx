import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const AppearanceSettings = () => {
  const [brandColor, setBrandColor] = useState("#016FDE");
  const [selectedMode, setSelectedMode] = useState("light");
  const [language, setLanguage] = useState("English (UK)");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages = [
    { name: "English (UK)", image: "/dashboard/appearance/United Kingdom.svg" },
    { name: "Spanish", image: "/dashboard/appearance/Spain.svg" },
    { name: "French", image: "/dashboard/appearance/France.svg" },
    { name: "Arabic", image: "/dashboard/appearance/arabic.svg" },
  ];

  const modeImages = {
    light: "/dashboard/appearance/Modelight.png",
    dark: "/dashboard/appearance/Modedark.png",
    system: "/dashboard/appearance/Modelight.png",
  };

  return (
    <div className="p-4  md:p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-8 lg:gap-x-12">
      <div className="col-span-1 md:col-span-2 space-y-1">
        <p className="font-semibold">Appearance</p>
        <p className="hidden md:block opacity-[0.44] text-sm">Change how your public dashboard looks and feels</p>
      </div>

      <div className="col-span-1 space-y-1">
        <p className="font-semibold">Brand Color</p>
        <p className="opacity-[0.44] text-sm">
          Select or customize your brand color
        </p>
      </div>
      <div className="col-span-1 flex items-center space-x-4">
        <input
          type="color"
          value={brandColor}
          onChange={(e) => setBrandColor(e.target.value)}
          className="w-10 h-10 cursor-pointer border border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={brandColor}
          onChange={(e) => setBrandColor(e.target.value)}
          className="border border-gray-300 p-2 w-full md:w-24 text-sm rounded-md"
        />
      </div>
       
      <div className="col-span-1 space-y-1">
        <p className="font-semibold">Dashboard Modes</p>
        <p className="opacity-[0.44] text-sm">
          Select your appearance based on time
        </p>
      </div>
      <div className="col-span-1 grid grid-cols-2 lg:grid-cols-3 gap-3 md:flex md:space-x-6">
        {Object.keys(modeImages).map((mode) => (
          <div
            key={mode}
            className={`rounded-lg cursor-pointer transition p-2 md:p-0 ${
              selectedMode === mode ? "border border-blue-500 shadow-md" : ""
            }`}
            onClick={() => setSelectedMode(mode)}
          >
            <img
              src={modeImages[mode]}
              alt={`${mode} mode`}
              className="object-cover rounded w-full md:w-auto"
            />
            <p className="text-center font-semibold text-sm mt-1">
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
            </p>
          </div>
        ))}
      </div>
      <div className="col-span-1 space-y-1">
        <p className="font-semibold">Language</p>
        <p className="opacity-[0.44] text-sm">Select default language</p>
      </div>
      <div className="col-span-1 relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-between border border-gray-300 p-3 rounded-md w-fit text-sm cursor-pointer bg-white"
        >
          <span className="flex items-center space-x-2">
            <img
              src={languages.find((lang) => lang.name === language)?.image}
              alt={language}
              className="w-6 h-6 object-cover rounded"
            />
            <span>{language}</span>
          </span>
          <span className="px-2"><IoIosArrowDown/></span>
        </button>
        {dropdownOpen && (
          <div className="absolute top-full left-0 w-full lg:w-fit bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10">
            {languages.map(({ name, image }) => (
              <div
                key={name}
                onClick={() => {
                  setLanguage(name);
                  setDropdownOpen(false);
                }}
                className="flex items-center space-x-6 p-3 hover:bg-gray-100 cursor-pointer w-full"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-6 h-6 object-cover rounded"
                />
                <span>{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="col-span-1 md:col-span-2 flex justify-end">
        <button className="bg-blue-500 text-white text-sm px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
