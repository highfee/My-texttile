import { useState } from "react";

import { useCreatorStore } from "@/store/useCreatorShopFront";

export default function NavigationBarEditor() {
  const {
    navigationBackgroudColor,
    navigationForegroudColor,
    storeLogo,
    setStoreName,
    setStoreLogo,
    setNavigationBackgroudColor,
    setNavigationForegroudColor,
    setStoreLogoFile,
  } = useCreatorStore();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoreLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setStoreLogo(imageDataUrl);
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
          accept="image/*"
        />
        {storeLogo && (
          <div className="mt-2">
            <img src={storeLogo} alt="Logo preview" className="h-10" />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Site Title
        </label>
        <input
          type="text"
          // value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
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
            value={navigationBackgroudColor}
            onChange={(e) => setNavigationBackgroudColor(e.target.value)}
            className="h-10 w-10 rounded border border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-600">
            {navigationBackgroudColor}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Menu Item Color
        </label>
        <div className="flex items-center">
          <input
            type="color"
            value={navigationForegroudColor}
            onChange={(e) => setNavigationForegroudColor(e.target.value)}
            className="h-10 w-10 rounded border border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-600">
            {navigationForegroudColor}
          </span>
        </div>
      </div>

      <div className="pt-2 flex justify-end space-x-3">
        <button
          className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={() => {
            // Reset to initial values
            setNavigationBackgroudColor("#979797");
            setNavigationForegroudColor("#333333");
            setStoreName("");
            setStoreLogo(null);
          }}
        >
          Cancel
        </button>
        <button
          // onClick={() => {
          //   onSave({
          //     logo,
          //     siteTitle,
          //     bgColor,
          //     menuItemColor,
          //   });
          // }}
          className="px-3 py-1 text-sm border border-transparent rounded-md shadow-sm text-white bg-bluebutton hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
