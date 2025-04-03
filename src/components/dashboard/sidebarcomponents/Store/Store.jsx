import { useState } from "react";
import Activate1 from "./Activate1";
import Activate2 from "./Activate2";
import MainStoreview from "./MainStoreview";

export default function Store() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlay1, setShowOverlay1] = useState(false);

  const handleBack = () => {
    setActiveComponent(null);
  };

  switch (activeComponent) {
    case "domain1":
      return <Activate1 onBack={handleBack} />;
    case "domain2":
      return <Activate2 onBack={handleBack} />;
    default:
      return (
        <MainStoreview
          setActiveComponent={setActiveComponent}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          showOverlay1={showOverlay1}
          setShowOverlay1={setShowOverlay1}
        />
      );
  }
}