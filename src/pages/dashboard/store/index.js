import { useState } from "react";
import Activate1 from "@/components/dashboard/sidebarcomponents/Store/Activate1";
import Activate2 from "@/components/dashboard/sidebarcomponents/Store/Activate2";
import MainStoreview from "@/components/dashboard/sidebarcomponents/Store/MainStoreview";
import StoreEditor from "@/components/dashboard/sidebarcomponents/Store/StoreEditor";

export default function index({ setActiveComponent }) {
  const [activeComponent, setActiveComponentInternal] = useState(null);
  const [editorViewType, setEditorViewType] = useState("desktop");

  const handleBack = () => {
    setActiveComponentInternal(null);
  };

  const handleEditorOpen = (viewType) => {
    setEditorViewType(viewType);
    setActiveComponentInternal("editor");
  };

  switch (activeComponent) {
    case "Activate1":
      return <Activate1 onBack={handleBack} />;
    case "Activate2":
      return <Activate2 onBack={handleBack} />;
    case "editor":
      return <StoreEditor onBack={handleBack} initialView={editorViewType} />;
    default:
      return (
        <MainStoreview
          setActiveComponent={setActiveComponent || setActiveComponentInternal}
          onEditorOpen={handleEditorOpen}
        />
      );
  }
}
