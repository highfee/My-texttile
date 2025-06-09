"use client";

import React, { useEffect, useRef, useState } from "react";

import Header from "./Header";
import {
  ArrowDownToLine,
  ArrowUpToLine,
  Bold,
  CaseSensitive,
  ChevronDown,
  ChevronUp,
  Italic,
  Redo,
  Trash2,
  Underline,
  Undo,
} from "lucide-react";
import { MdOutlineRotateRight } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useDesignStore from "@/store/DesignStore";
// import useImage from "use-image";
import ApparelView from "./ApparelView";
import ElementRenderer from "./ElementRenderer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMediaQuery from "@/components/hook/usemediaquery";
import MobileHeader from "./MobileHeader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LuAlignEndHorizontal } from "react-icons/lu";
import { PiAlignCenterHorizontal } from "react-icons/pi";
import { CiAlignLeft, CiAlignRight, CiAlignTop } from "react-icons/ci";
import NextImage from "next/image";

// Element components
const TextElement = ({ element, isSelected, onSelect }) => {
  const textRef = useRef(null);
  const transformerRef = useRef(null);
  const { updateElement } = useDesignStore();

  React.useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    updateElement(element.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e) => {
    const node = textRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    updateElement(element.id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
      scaleX: 1,
      scaleY: 1,
    });
  };

  return (
    <>
      <Text
        ref={textRef}
        {...element}
        onClick={() => onSelect(element.id)}
        onTap={() => onSelect(element.id)}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const ShapeElement = ({ element, isSelected, onSelect }) => {
  const shapeRef = useRef(null);
  const transformerRef = useRef(null);
  const { updateElement } = useDesignStore();

  React.useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    updateElement(element.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    updateElement(element.id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
      scaleX: 1,
      scaleY: 1,
    });
  };

  const ShapeComponent = element.shapeType === "circle" ? Circle : Rect;

  return (
    <>
      <ShapeComponent
        ref={shapeRef}
        {...element}
        onClick={() => onSelect(element.id)}
        onTap={() => onSelect(element.id)}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const ImageElement = ({ element, isSelected, onSelect }) => {
  const imageRef = useRef(null);
  const transformerRef = useRef(null);
  const { updateElement } = useDesignStore();
  const [image] = useImage(element.src);

  React.useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    updateElement(element.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e) => {
    const node = imageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    updateElement(element.id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
      scaleX: 1,
      scaleY: 1,
    });
  };

  return (
    <>
      <KonvaImage
        ref={imageRef}
        {...element}
        image={image}
        onClick={() => onSelect(element.id)}
        onTap={() => onSelect(element.id)}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3.0;
const ZOOM_STEP = 0.1;

const Canvas = () => {
  const {
    designs,
    currentDesignId,
    selectedElementId,
    selectElement,
    deleteElement,
    bringElementToFront,
    sendElementToBack,
    bringElementForward,
    sendElementBackward,
    undo,
    redo,
    updateApparelView,
  } = useDesignStore();

  const currentDesign = designs?.find((d) => d.id === currentDesignId);

  const [contextMenu, setContextMenu] = useState({
    open: false,
    x: 0,
    y: 0,
    elementId: null,
  });

  const [zoomLevel, setZoomLevel] = useState(1.0);

  const handleZoomChange = (newZoom) => {
    const val = Array.isArray(newZoom) ? newZoom[0] : newZoom;
    setZoomLevel(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, val)));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(MAX_ZOOM, prev + ZOOM_STEP));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(MIN_ZOOM, prev - ZOOM_STEP));
  };

  const handleCanvasClick = (e) => {
    const target = e.target;
    if (target.closest("#zoom-controls-bar")) {
      return;
    }
    if (
      target === e.currentTarget ||
      target.id === "design-canvas-scroll-container" ||
      target.id === "design-canvas-scaler"
    ) {
      selectElement({ elementId: null });
    }
    if (contextMenu.open) {
      setContextMenu((prev) => ({ ...prev, open: false }));
    }
  };

  const handleElementContextMenu = (event, elementId) => {
    event.preventDefault();
    event.stopPropagation();
    if (selectedElementId !== elementId) {
      selectElement({ elementId });
    }
    setContextMenu({
      open: true,
      x: event.clientX,
      y: event.clientY,
      elementId,
    });
  };

  const handleContextMenuClose = (isOpen) => {
    if (!isOpen) {
      setContextMenu((prev) => ({ ...prev, open: false, elementId: null }));
    }
  };

  const handleDeleteElementFromMenu = () => {
    if (contextMenu.elementId) {
      deleteElement({ elementId: contextMenu.elementId });
      // toast({ title: "Element Deleted", description: "The element has been removed." });
      handleContextMenuClose(false);
    }
  };

  const handleBringToFrontFromMenu = () => {
    if (contextMenu.elementId)
      bringElementToFront({ elementId: contextMenu.elementId });
  };
  const handleSendToBackFromMenu = () => {
    if (contextMenu.elementId)
      sendElementToBack({ elementId: contextMenu.elementId });
  };
  const handleBringForwardFromMenu = () => {
    if (contextMenu.elementId)
      bringElementForward({ elementId: contextMenu.elementId });
  };
  const handleSendBackwardFromMenu = () => {
    if (contextMenu.elementId)
      sendElementBackward({ elementId: contextMenu.elementId });
  };

  const canUndo = currentDesign ? (currentDesign.historyIndex || 0) > 0 : false;
  const canRedo = currentDesign
    ? (currentDesign.historyIndex || 0) <
      (currentDesign.history || []).length - 1
    : false;

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && contextMenu.open) {
        handleContextMenuClose(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [contextMenu.open]);

  const visibleElements = currentDesign
    ? (currentDesign.elements || []).filter(
        (el) => el.associatedView === currentDesign.apparelView
      )
    : [];

  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <main className="flex-1 bg-off-white h-[3000px] overflow-y-auto no-scrollbar">
      {!isMobile && <Header />}

      {isMobile && <MobileHeader />}

      {/* text toolbar for mobile */}
      {isMobile && (
        <nav className="bg-white shadow-md rounded-md p-2 mx-auto w-max mt-3">
          <div className="flex items-center gap-2">
            <div>
              <Label htmlFor="color" className="cursor-pointer relative">
                <NextImage
                  src="/design/icons/colors.svg"
                  alt=""
                  width={25}
                  height={28}
                  className="translate-y-[4px] "
                />
                <Input
                  type="color"
                  id="color"
                  className="opacity-0 absolute pointer-events-none bottom-0 left-0 hidde"
                  // onChange={(e) => handleColorChange(e.target.value)}
                />
              </Label>
            </div>

            <div
              className={cn(" cursor-pointer p-1 rounded-md", {
                // "bg-gray-200": selectedElement?.fontWeight === "bold",
              })}
            >
              <Bold
                color={"rgba(18, 18, 18, 0.44)"}
                size={20}
                // onClick={() => toggleStyle("fontWeight", "bold")}
              />
            </div>

            <div
              className={cn(" cursor-pointer p-1 rounded-md", {
                // "bg-gray-200": selectedElement?.fontStyle === "italic",
              })}
            >
              <Italic
                color="rgba(18, 18, 18, 0.44)"
                size={20}
                className=" cursor-pointer"
                // onClick={() => toggleStyle("fontStyle", "italic")}
              />
            </div>

            <div
              className={cn("cursor-pointer p-1 rounded-md", {
                // "bg-gray-200":
                //   selectedElement?.textTransform === "uppercase" ||
                //   selectedElement?.textTransform === "lowercase",
              })}
            >
              <CaseSensitive
                color="rgba(18, 18, 18, 0.44)"
                size={20}
                // onClick={toggleCase}
              />
            </div>

            <div
              className={cn(" cursor-pointer p-1 rounded-md", {
                // "bg-gray-200": selectedElement?.textDecoration === "underline",
              })}
            >
              <Underline
                color="rgba(18, 18, 18, 0.44)"
                size={20}
                className=" cursor-pointer"
                // onClick={() => toggleStyle("textDecoration", "underline")}
              />
            </div>

            <LuAlignEndHorizontal
              color="rgba(18, 18, 18, 0.44)"
              className=" cursor-pointer"
            />
            <PiAlignCenterHorizontal
              color="rgba(18, 18, 18, 0.44)"
              size="22"
              className=" cursor-pointer"
            />
            <CiAlignLeft
              color="rgba(18, 18, 18, 0.44)"
              size="22"
              className=" cursor-pointer"
            />
            <CiAlignRight
              color="rgba(18, 18, 18, 0.44)"
              size="22"
              className=" cursor-pointer"
            />
            <CiAlignTop
              color="rgba(18, 18, 18, 0.44)"
              size="22"
              className=" cursor-pointer"
            />
          </div>
        </nav>
      )}

      <section className="flex flex-col items-center justify-center lg:h-[calc(100vh-4rem)] mt-10 lg:mt-0 overflow-auto">
        <header className="p-2 lg:bg-primary md:w-[450px] w-[80%] max-w-[450px] rounded-md mb-4 flex items-center gap-3 px-4">
          <div
            className="grid place-items-center size-[30px] bg-dark-gray rounded-md cursor-pointer"
            // onClick={clearCanvas}
          >
            <Trash2 color="white" size={20} />
          </div>

          <div
            className={`cursor-pointer ${canUndo ? "" : "opacity-50"}`}
            onClick={undo}
          >
            <Undo
              color={canUndo ? "white" : "rgb(255,255,255,0.44)"}
              size={20}
            />
          </div>

          <div
            className={`cursor-pointer ${canRedo ? "" : "opacity-50"}`}
            onClick={redo}
          >
            <Redo
              color={canRedo ? "white" : "rgb(255,255,255,0.44)"}
              size={20}
            />
          </div>

          <div
            className="grid place-items-center size-[30px] bg-dark-gray rounded-md cursor-pointer"
            // onClick={handleRotateSelected}
          >
            <MdOutlineRotateRight color="white" size={20} />
          </div>

          <div className="lg:ml-auto">
            <div className="hidden lg:block">
              <Select
                value={currentDesign.apparelView}
                onValueChange={(value) => updateApparelView({ view: value })}
              >
                <SelectTrigger className="bg-dark-gray data-[placeholder]:text-white rounded-md cursor-pointer border-none gap-2 text-white">
                  <SelectValue
                    placeholder={currentDesign.apparelView}
                    className="text-white capitalize"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="front">Front</SelectItem>
                  <SelectItem value="back">Back</SelectItem>
                  <SelectItem value="left">Left Side</SelectItem>
                  <SelectItem value="right">Right Side</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        <section
          className="md:w-[450px] md:h-[425px] w-[80%] max-w-[450px] bg-white border border-primary/40 rounded-md shadow-sm overflow-hidde"
          id="design-canvas-scaler"
          onContextMenu={(e) => {
            e.preventDefault();
            if (contextMenu.open) {
              handleContextMenuClose(false);
            }
          }}
        >
          <div
            id="design-canvas-scaler"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
              transition: "transform 0.1s ease-out",
            }}
          >
            <div
              id="design-canvas-container"
              className="relative shadow-2xl bg-white rounded-lg"
            >
              {currentDesign ? (
                <>
                  <ApparelView
                    apparelType={currentDesign.apparelType}
                    apparelColor={currentDesign.apparelColor}
                    apparelView={currentDesign.apparelView}
                  />
                  {visibleElements.map((element) => (
                    <ElementRenderer
                      key={element.id}
                      element={element}
                      isSelected={element.id === selectedElementId}
                      onElementContextMenu={handleElementContextMenu}
                      zoomLevel={zoomLevel}
                    />
                  ))}
                </>
              ) : (
                <div
                  className="flex items-center justify-center h-full w-full p-20"
                  style={{ width: "400px", height: "500px" }}
                >
                  <p className="text-muted-foreground">
                    No design selected or available. Create one from the panel.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {contextMenu.open && contextMenu.elementId && (
          <DropdownMenu
            open={contextMenu.open}
            onOpenChange={handleContextMenuClose}
          >
            <DropdownMenuTrigger asChild>
              <div
                style={{
                  position: "fixed",
                  left: contextMenu.x,
                  top: contextMenu.y,
                  width: 1,
                  height: 1,
                  pointerEvents: "none",
                }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={handleBringForwardFromMenu}>
                <ChevronUp className="mr-2 h-4 w-4" /> Bring Forward
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSendBackwardFromMenu}>
                <ChevronDown className="mr-2 h-4 w-4" /> Send Backward
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBringToFrontFromMenu}>
                <ArrowUpToLine className="mr-2 h-4 w-4" /> Bring to Front
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSendToBackFromMenu}>
                <ArrowDownToLine className="mr-2 h-4 w-4" /> Send to Back
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDeleteElementFromMenu}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Element
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </section>
    </main>
  );
};

export default Canvas;
