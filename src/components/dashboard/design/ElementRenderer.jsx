"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import useDesignStore from "@/store/DesignStore";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_ELEMENT_COLOR,
  DEFAULT_TEXT_ALIGN,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_STYLE,
} from "@/constants/index";
import { RotateCcw } from "lucide-react";

export default function ElementRenderer({
  element,
  isSelected,
  onElementContextMenu,
  zoomLevel,
}) {
  const { updateElement, selectElement } = useDesignStore();
  const elementRef = useRef(null);

  const [interactionMode, setInteractionMode] = useState(null);
  const [initialInteractionPos, setInitialInteractionPos] = useState({
    mouseX: 0,
    mouseY: 0,
    elementX: 0, // %
    elementY: 0, // %
    elementWidth: 0, // px
    elementHeight: 0, // px
    elementRotation: 0, // degrees
    canvasWidth: 1,
    canvasHeight: 1,
  });

  const [isEditingText, setIsEditingText] = useState(false);
  const [editTextValue, setEditTextValue] = useState(
    element.type === "text" ? element.text || "" : ""
  );
  const textareaRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isEditingText) {
      selectElement({ elementId: element.id });
    }
  };

  const handleDoubleClick = (e) => {
    if (element.type === "text") {
      e.stopPropagation();
      setIsEditingText(true);
      setEditTextValue(element.text || "");
    }
  };

  const handleContextMenu = (e) => {
    onElementContextMenu(e, element.id);
  };

  const handleTextareaChange = (e) => {
    setEditTextValue(e.target.value);
  };

  const handleTextareaBlur = () => {
    if (element.type === "text" && isEditingText) {
      updateElement({
        elementId: element.id,
        updates: { text: editTextValue },
      });
      setIsEditingText(false);
    }
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextareaBlur();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setEditTextValue(element.text || "");
      setIsEditingText(false);
    }
  };

  useEffect(() => {
    if (isEditingText && element.type === "text" && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditingText, element.type]);

  const onInteractionStart = (e, mode) => {
    if (!isSelected || isEditingText) return;
    if (e.button === 2 && mode === "drag") {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    setInteractionMode(mode);

    const parentCanvasContainer = document.getElementById(
      "design-canvas-container"
    );
    const canvasRect = parentCanvasContainer
      ? {
          width: parentCanvasContainer.offsetWidth,
          height: parentCanvasContainer.offsetHeight,
          left: parentCanvasContainer.getBoundingClientRect().left,
          top: parentCanvasContainer.getBoundingClientRect().top,
        }
      : { width: 1, height: 1, left: 0, top: 0 };

    setInitialInteractionPos({
      mouseX: e.clientX,
      mouseY: e.clientY,
      elementX: element.x,
      elementY: element.y,
      elementWidth: element.width,
      elementHeight: element.height,
      elementRotation: element.rotation || 0,
      canvasWidth: canvasRect.width,
      canvasHeight: canvasRect.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!interactionMode || !elementRef.current) return;

      const dx = e.clientX - initialInteractionPos.mouseX;
      const dy = e.clientY - initialInteractionPos.mouseY;

      const scaledDx = dx / zoomLevel;
      const scaledDy = dy / zoomLevel;

      switch (interactionMode) {
        case "drag": {
          const newXPercent =
            initialInteractionPos.elementX +
            (scaledDx / initialInteractionPos.canvasWidth) * 100;
          const newYPercent =
            initialInteractionPos.elementY +
            (scaledDy / initialInteractionPos.canvasHeight) * 100;
          updateElement({
            elementId: element.id,
            updates: { x: newXPercent, y: newYPercent },
          });
          break;
        }
        case "resize": {
          let newWidth = initialInteractionPos.elementWidth + scaledDx;
          let newHeight = initialInteractionPos.elementHeight + scaledDy;

          if (
            element.type === "image" &&
            element.originalWidth &&
            element.originalHeight
          ) {
            const aspectRatio = element.originalWidth / element.originalHeight;
            if (Math.abs(scaledDx) > Math.abs(scaledDy)) {
              newHeight = newWidth / aspectRatio;
            } else {
              newWidth = newHeight * aspectRatio;
            }
          }

          newWidth = Math.max(newWidth, 20);
          newHeight = Math.max(newHeight, 20);

          updateElement({
            elementId: element.id,
            updates: { width: newWidth, height: newHeight },
          });
          break;
        }
        case "rotate": {
          const rect = elementRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
          let angleDeg = angleRad * (180 / Math.PI);

          const initialMouseAngleRad = Math.atan2(
            initialInteractionPos.mouseY - centerY,
            initialInteractionPos.mouseX - centerX
          );
          const initialMouseAngleDeg = initialMouseAngleRad * (180 / Math.PI);

          let newRotation =
            initialInteractionPos.elementRotation +
            (angleDeg - initialMouseAngleDeg);
          newRotation = ((newRotation % 360) + 360) % 360;

          updateElement({
            elementId: element.id,
            updates: { rotation: newRotation },
          });
          break;
        }
      }
    };

    const handleMouseUp = () => {
      if (interactionMode) {
        setInteractionMode(null);
      }
    };

    if (interactionMode) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      if (interactionMode === "drag") document.body.style.cursor = "grabbing";
      else if (interactionMode === "resize")
        document.body.style.cursor = "nwse-resize";
      else if (interactionMode === "rotate")
        document.body.style.cursor = "grabbing";
    } else {
      document.body.style.cursor = "default";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "default";
    };
  }, [
    interactionMode,
    initialInteractionPos,
    updateElement,
    element.id,
    element.type,
    element.originalWidth,
    element.originalHeight,
    zoomLevel,
  ]);

  const style = {
    position: "absolute",
    left: `${element.x}%`,
    top: `${element.y}%`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    transform: `translate(-50%, -50%) rotate(${element.rotation || 0}deg)`,
    transformOrigin: "center center",
    cursor:
      isSelected && !interactionMode && !isEditingText ? "grab" : "default",
    border: isSelected
      ? "2px dashed hsl(var(--primary))"
      : "1px solid transparent",
    boxSizing: "border-box",
    zIndex: element.zIndex,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  if (interactionMode === "drag") style.cursor = "grabbing";

  const renderContent = () => {
    if (isEditingText && element.type === "text") {
      return (
        <textarea
          ref={textareaRef}
          value={editTextValue}
          onChange={handleTextareaChange}
          onBlur={handleTextareaBlur}
          onKeyDown={handleTextareaKeyDown}
          style={{
            width: "100%",
            height: "100%",
            fontFamily: element.fontFamily || DEFAULT_FONT_FAMILY,
            fontSize: `${element.fontSize || DEFAULT_FONT_SIZE}px`,
            fontWeight: element.fontWeight || DEFAULT_FONT_WEIGHT,
            fontStyle: element.fontStyle || DEFAULT_FONT_STYLE,
            color: element.color || DEFAULT_ELEMENT_COLOR,
            textAlign: element.textAlign || DEFAULT_TEXT_ALIGN,
            border: "none",
            outline: "none",
            resize: "none",
            boxSizing: "border-box",
            padding: "2px",
            margin: "0",
            background: "rgba(255, 255, 255, 0.9)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        />
      );
    }

    switch (element.type) {
      case "text":
        return (
          <div
            style={{
              fontFamily: element.fontFamily || DEFAULT_FONT_FAMILY,
              fontSize: `${element.fontSize || DEFAULT_FONT_SIZE}px`,
              fontWeight: element.fontWeight || DEFAULT_FONT_WEIGHT,
              fontStyle: element.fontStyle || DEFAULT_FONT_STYLE,
              color: element.color || DEFAULT_ELEMENT_COLOR,
              textAlign: element.textAlign || DEFAULT_TEXT_ALIGN,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent:
                element.textAlign === "left"
                  ? "flex-start"
                  : element.textAlign === "right"
                  ? "flex-end"
                  : "center",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              padding: "2px",
              overflow: "hidden",
            }}
            className="pointer-events-none"
          >
            {element.text}
          </div>
        );
      case "shape":
        const shapeStyle = {
          width: "100%",
          height: "100%",
          backgroundColor: element.color || DEFAULT_ELEMENT_COLOR,
        };
        if (element.shapeType === "circle") {
          shapeStyle.borderRadius = "50%";
        }
        return <div style={shapeStyle} className="pointer-events-none" />;
      case "image":
        if (!element.imageUrl) return null;
        return (
          <Image
            src={element.imageUrl}
            alt="User uploaded content"
            layout="fill"
            objectFit="contain"
            className="pointer-events-none"
            priority={isSelected}
          />
        );
      default:
        return null;
    }
  };

  const HANDLE_SIZE = 10 / zoomLevel;
  const HANDLE_OFFSET = -HANDLE_SIZE / 2 - 1 / zoomLevel;

  return (
    <div
      ref={elementRef}
      style={style}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={(e) => onInteractionStart(e, "drag")}
      onContextMenu={handleContextMenu}
      draggable="false"
    >
      {renderContent()}
      {isSelected && !isEditingText && (
        <>
          <div
            style={{
              position: "absolute",
              bottom: `${HANDLE_OFFSET}px`,
              right: `${HANDLE_OFFSET}px`,
              width: `${HANDLE_SIZE}px`,
              height: `${HANDLE_SIZE}px`,
              backgroundColor: "hsl(var(--primary))",
              border: `${1 / zoomLevel}px solid hsl(var(--background))`,
              borderRadius: `${2 / zoomLevel}px`,
              cursor: "nwse-resize",
              zIndex: (element.zIndex || 0) + 1001,
            }}
            onMouseDown={(e) => onInteractionStart(e, "resize")}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            style={{
              position: "absolute",
              top: `${HANDLE_OFFSET - HANDLE_SIZE - 2 / zoomLevel}px`,
              left: `calc(50% - ${(HANDLE_SIZE + 4 / zoomLevel) / 2}px)`,
              width: `${HANDLE_SIZE + 4 / zoomLevel}px`,
              height: `${HANDLE_SIZE + 4 / zoomLevel}px`,
              color: "hsl(var(--primary))",
              backgroundColor: "hsl(var(--background))",
              border: `${1 / zoomLevel}px solid hsl(var(--primary))`,
              borderRadius: "50%",
              cursor: "grab",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: (element.zIndex || 0) + 1001,
              boxShadow: `0 0 ${3 / zoomLevel}px rgba(0,0,0,0.2)`,
            }}
            onMouseDown={(e) => onInteractionStart(e, "rotate")}
            onClick={(e) => e.stopPropagation()}
            title="Rotate Element"
          >
            <RotateCcw size={HANDLE_SIZE} />
          </div>
        </>
      )}
    </div>
  );
}
