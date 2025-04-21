import { useState } from "react";
import Activate1 from "./Activate1";
import Activate2 from "./Activate2";
import MainStoreview from "./MainStoreview";
import StoreEditor from "./StoreEditor";

export default function Store({ setActiveComponent }) {
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
    case "domain1":
      return <Activate1 onBack={handleBack} />;
    case "domain2":
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