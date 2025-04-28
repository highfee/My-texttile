import { useState } from "react";

export default function NavigationBarEditor({ onSave, onCancel }) {
    const [logo, setLogo] = useState(null);
    const [siteTitle, setSiteTitle] = useState("");
    const [bgColor, setBgColor] = useState("#979797");
    const [menuItemColor, setMenuItemColor] = useState("#979797");
  
    const handleLogoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogo(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="ml-4 p-4 bg-gray-50 rounded mt-1 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Leave blank to display site title
          </p>
          <input
            type="file"
            onChange={handleLogoUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {logo && (
            <div className="mt-2">
              <img src={logo} alt="Logo preview" className="h-10" />
            </div>
          )}
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Title
          </label>
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter site title"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <div className="flex items-center">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-10 rounded border border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">{bgColor}</span>
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Menu Item Color
          </label>
          <div className="flex items-center">
            <input
              type="color"
              value={menuItemColor}
              onChange={(e) => setMenuItemColor(e.target.value)}
              className="h-10 w-10 rounded border border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">{menuItemColor}</span>
          </div>
        </div>
  
        <div className="pt-2 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({
                logo,
                siteTitle,
                bgColor,
                menuItemColor
              });
            }}
            className="px-3 py-1 text-sm border border-transparent rounded-md shadow-sm text-white bg-bluebutton hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  }