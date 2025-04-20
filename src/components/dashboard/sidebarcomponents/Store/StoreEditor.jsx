import { useState } from "react";
import { FiSmartphone, FiMonitor, FiEdit2 } from "react-icons/fi";
import NavigationBarEditor from "./NavigationBarEditor";

export default function StoreEditor({ onBack, initialView = "desktop" }) {
  const [activeView, setActiveView] = useState(initialView);
  const [editingSection, setEditingSection] = useState(null);
  const [navBarSettings, setNavBarSettings] = useState({
    logo: null,
    siteTitle: "",
    bgColor: "#979797",
    menuItemColor: "#979797"
  });

  const handleEditSection = (section) => {
    setEditingSection(editingSection === section ? null : section);
  };

  const handleSaveNavBar = (settings) => {
    setNavBarSettings(settings);
    setEditingSection(null);
  };

  const sections = [
    { id: "Navigation Bar", name: "Navigation Bar" },
    { id: "Hero Banner", name: "Hero Banner" },
    { id: "Products", name: "Products" },
    { id: "Footer", name: "Footer" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="w-72 absolute top-0 z-50 p-4">
        <button
          onClick={onBack}
          className="flex items-center border border-graycolor rounded-lg p-2 opacity-[0.44] hover:opacity-100"
        >
          <FiEdit2 className="mr-2" />
          Quit Editor
        </button>

        <div className="space-y-6 py-6">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col">
              <div
                className={`flex items-center justify-between p-2 rounded ${
                  editingSection === section.id
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleEditSection(section.id)}
              >
                <span>{section.name}</span>
                <FiEdit2 className="text-gray-500" />
              </div>
              {editingSection === section.id && section.id === "Navigation Bar" && (
                <NavigationBarEditor
                  onSave={handleSaveNavBar}
                  onCancel={() => setEditingSection(null)}
                  initialSettings={navBarSettings}
                />
              )}
              {editingSection === section.id && section.id !== "Navigation Bar" && (
                <div className="ml-4 p-2 bg-gray-50 rounded mt-1">
                  <p className="text-sm text-gray-600">
                    Edit {section.name.toLowerCase()} content
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-20">
        <div className="flex justify-center space-x-4 p-4">
          <button
            className={`flex items-center ${
              activeView === "desktop" ? "text-graycolor" : "opacity-[0.44]"
            }`}
            onClick={() => setActiveView("desktop")}
          >
            <FiMonitor />
          </button>
          <button
            className={`flex items-center ${
              activeView === "mobile" ? "text-graycolor" : "opacity-[0.44]"
            }`}
            onClick={() => setActiveView("mobile")}
          >
            <FiSmartphone />
          </button>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="relative">
            {activeView === "desktop" ? (
              <img
                src="/dashboard/store/desktop.png"
                alt="Desktop Preview"
                className="max-w-full h-auto border rounded-lg shadow-sm"
              />
            ) : (
              <img
                src="/dashboard/store/mobile.png"
                alt="Mobile Preview"
                className="max-w-xs h-auto border rounded-lg shadow-sm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}