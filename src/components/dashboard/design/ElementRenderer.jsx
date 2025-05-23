"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// DesignElement type import is removed for plain JS, its structure is implicitly used.
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

const MIN_DIMENSION = 20; // Minimum width/height in pixels

export default function ElementRenderer({
  element,
  isSelected,
  onElementContextMenu,
  zoomLevel,
}) {
  const { designs, currentDesignId, updateElement, selectElement } =
    useDesignStore();
  const elementRef = useRef(null);

  const currentDesign = designs.find((d) => d.id === currentDesignId);
  const imageBank = currentDesign?.imageBank || {};

  const [interactionMode, setInteractionMode] = useState(null);
  const [initialInteractionPos, setInitialInteractionPos] = useState({
    mouseX: 0,
    mouseY: 0,
    elementXPercent: 0,
    elementYPercent: 0,
    elementWidthPx: 0,
    elementHeightPx: 0,
    elementRotation: 0,
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
    if (
      e.button === 2 &&
      (mode === "drag" || mode?.startsWith("resize-") || mode === "rotate")
    ) {
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
      elementXPercent: element.x,
      elementYPercent: element.y,
      elementWidthPx: element.width,
      elementHeightPx: element.height,
      elementRotation: element.rotation || 0,
      canvasWidth: canvasRect.width,
      canvasHeight: canvasRect.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!interactionMode || !elementRef.current) return;

      const dxScreen = e.clientX - initialInteractionPos.mouseX;
      const dyScreen = e.clientY - initialInteractionPos.mouseY;

      const scaledDx = dxScreen / zoomLevel;
      const scaledDy = dyScreen / zoomLevel;

      let newXPercent = initialInteractionPos.elementXPercent;
      let newYPercent = initialInteractionPos.elementYPercent;
      let newWidthPx = initialInteractionPos.elementWidthPx;
      let newHeightPx = initialInteractionPos.elementHeightPx;

      const aspectRatio =
        element.type === "image" &&
        element.originalWidth &&
        element.originalHeight
          ? element.originalWidth / element.originalHeight
          : null;

      switch (interactionMode) {
        case "drag":
          newXPercent =
            initialInteractionPos.elementXPercent +
            (scaledDx / initialInteractionPos.canvasWidth) * 100;
          newYPercent =
            initialInteractionPos.elementYPercent +
            (scaledDy / initialInteractionPos.canvasHeight) * 100;
          break;

        case "resize-br":
          newWidthPx = initialInteractionPos.elementWidthPx + scaledDx;
          newHeightPx = initialInteractionPos.elementHeightPx + scaledDy;
          if (aspectRatio) {
            if (Math.abs(scaledDx) > Math.abs(scaledDy))
              newHeightPx = newWidthPx / aspectRatio;
            else newWidthPx = newHeightPx * aspectRatio;
          }
          newXPercent =
            initialInteractionPos.elementXPercent +
            ((newWidthPx - initialInteractionPos.elementWidthPx) /
              2 /
              initialInteractionPos.canvasWidth) *
              100;
          newYPercent =
            initialInteractionPos.elementYPercent +
            ((newHeightPx - initialInteractionPos.elementHeightPx) /
              2 /
              initialInteractionPos.canvasHeight) *
              100;
          break;

        case "resize-bl":
          newWidthPx = initialInteractionPos.elementWidthPx - scaledDx;
          newHeightPx = initialInteractionPos.elementHeightPx + scaledDy;
          if (aspectRatio) {
            if (Math.abs(scaledDx) > Math.abs(scaledDy))
              newHeightPx = newWidthPx / aspectRatio;
            else newWidthPx = newHeightPx * aspectRatio;
          }
          newXPercent =
            initialInteractionPos.elementXPercent +
            (scaledDx / 2 / initialInteractionPos.canvasWidth) * 100;
          newYPercent =
            initialInteractionPos.elementYPercent +
            ((newHeightPx - initialInteractionPos.elementHeightPx) /
              2 /
              initialInteractionPos.canvasHeight) *
              100;
          break;

        case "resize-tr":
          newWidthPx = initialInteractionPos.elementWidthPx + scaledDx;
          newHeightPx = initialInteractionPos.elementHeightPx - scaledDy;
          if (aspectRatio) {
            if (Math.abs(scaledDx) > Math.abs(scaledDy))
              newHeightPx = newWidthPx / aspectRatio;
            else newWidthPx = newHeightPx * aspectRatio;
          }
          newXPercent =
            initialInteractionPos.elementXPercent +
            ((newWidthPx - initialInteractionPos.elementWidthPx) /
              2 /
              initialInteractionPos.canvasWidth) *
              100;
          newYPercent =
            initialInteractionPos.elementYPercent +
            (scaledDy / 2 / initialInteractionPos.canvasHeight) * 100;
          break;

        case "resize-tl":
          newWidthPx = initialInteractionPos.elementWidthPx - scaledDx;
          newHeightPx = initialInteractionPos.elementHeightPx - scaledDy;
          if (aspectRatio) {
            if (Math.abs(scaledDx) > Math.abs(scaledDy))
              newHeightPx = newWidthPx / aspectRatio;
            else newWidthPx = newHeightPx * aspectRatio;
          }
          newXPercent =
            initialInteractionPos.elementXPercent +
            (scaledDx / 2 / initialInteractionPos.canvasWidth) * 100;
          newYPercent =
            initialInteractionPos.elementYPercent +
            (scaledDy / 2 / initialInteractionPos.canvasHeight) * 100;
          break;

        case "resize-t":
          newHeightPx = initialInteractionPos.elementHeightPx - scaledDy;
          newYPercent =
            initialInteractionPos.elementYPercent +
            (scaledDy / 2 / initialInteractionPos.canvasHeight) * 100;
          break;

        case "resize-b":
          newHeightPx = initialInteractionPos.elementHeightPx + scaledDy;
          newYPercent =
            initialInteractionPos.elementYPercent +
            (scaledDy / 2 / initialInteractionPos.canvasHeight) * 100;
          break;

        case "resize-l":
          newWidthPx = initialInteractionPos.elementWidthPx - scaledDx;
          newXPercent =
            initialInteractionPos.elementXPercent +
            (scaledDx / 2 / initialInteractionPos.canvasWidth) * 100;
          break;

        case "resize-r":
          newWidthPx = initialInteractionPos.elementWidthPx + scaledDx;
          newXPercent =
            initialInteractionPos.elementXPercent +
            (scaledDx / 2 / initialInteractionPos.canvasWidth) * 100;
          break;

        case "rotate":
          const rect = elementRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
          const initialMouseAngleRad = Math.atan2(
            initialInteractionPos.mouseY - centerY,
            initialInteractionPos.mouseX - centerX
          );

          let newRotation =
            initialInteractionPos.elementRotation +
            angleRad * (180 / Math.PI) -
            initialMouseAngleRad * (180 / Math.PI);
          newRotation = ((newRotation % 360) + 360) % 360;

          updateElement({
            elementId: element.id,
            updates: { rotation: newRotation },
          });
          return;
      }

      const clampedNewWidthPx = Math.max(newWidthPx, MIN_DIMENSION);
      const clampedNewHeightPx = Math.max(newHeightPx, MIN_DIMENSION);

      if (clampedNewWidthPx !== newWidthPx) {
        const widthDiff = clampedNewWidthPx - newWidthPx;
        if (
          interactionMode === "resize-l" ||
          interactionMode === "resize-tl" ||
          interactionMode === "resize-bl"
        ) {
          newXPercent =
            initialInteractionPos.elementXPercent -
            (widthDiff / 2 / initialInteractionPos.canvasWidth) * 100;
        } else if (
          interactionMode === "resize-r" ||
          interactionMode === "resize-tr" ||
          interactionMode === "resize-br"
        ) {
          newXPercent =
            initialInteractionPos.elementXPercent +
            (widthDiff / 2 / initialInteractionPos.canvasWidth) * 100;
        }
      }
      if (clampedNewHeightPx !== newHeightPx) {
        const heightDiff = clampedNewHeightPx - newHeightPx;
        if (
          interactionMode === "resize-t" ||
          interactionMode === "resize-tl" ||
          interactionMode === "resize-tr"
        ) {
          newYPercent =
            initialInteractionPos.elementYPercent -
            (heightDiff / 2 / initialInteractionPos.canvasHeight) * 100;
        } else if (
          interactionMode === "resize-b" ||
          interactionMode === "resize-bl" ||
          interactionMode === "resize-br"
        ) {
          newYPercent =
            initialInteractionPos.elementYPercent +
            (heightDiff / 2 / initialInteractionPos.canvasHeight) * 100;
        }
      }

      updateElement({
        elementId: element.id,
        updates: {
          x: newXPercent,
          y: newYPercent,
          width: clampedNewWidthPx,
          height: clampedNewHeightPx,
        },
      });
    };

    const handleMouseUp = () => {
      if (interactionMode) {
        setInteractionMode(null);
      }
    };

    let cursorStyle = "default";
    if (interactionMode) {
      switch (interactionMode) {
        case "drag":
          cursorStyle = "grabbing";
          break;
        case "rotate":
          cursorStyle = "grabbing";
          break;
        case "resize-tl":
        case "resize-br":
          cursorStyle = "nwse-resize";
          break;
        case "resize-tr":
        case "resize-bl":
          cursorStyle = "nesw-resize";
          break;
        case "resize-t":
        case "resize-b":
          cursorStyle = "ns-resize";
          break;
        case "resize-l":
        case "resize-r":
          cursorStyle = "ew-resize";
          break;
      }
    }

    if (interactionMode) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = cursorStyle;
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
    designs,
    currentDesignId,
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
      ? `2px dashed hsl(var(--primary))`
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
        const shapeSvgStyle = {
          width: "100%",
          height: "100%",
          fill: element.color || DEFAULT_ELEMENT_COLOR,
          strokeWidth: 0,
          pointerEvents: "none",
        };
        switch (element.shapeType) {
          case "circle":
            return (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: element.color || DEFAULT_ELEMENT_COLOR,
                  borderRadius: "50%",
                }}
                className="pointer-events-none"
              />
            );
          case "square":
          case "rectangle":
            return (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: element.color || DEFAULT_ELEMENT_COLOR,
                }}
                className="pointer-events-none"
              />
            );
          case "triangle":
            return (
              <svg
                style={shapeSvgStyle}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="50,0 100,100 0,100" />
              </svg>
            );
          case "hexagon":
            return (
              <svg
                style={shapeSvgStyle}
                viewBox="0 0 100 86.6"
                preserveAspectRatio="none"
              >
                <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
              </svg>
            );
          case "pentagon":
            return (
              <svg
                style={shapeSvgStyle}
                viewBox="0 0 100 95.1"
                preserveAspectRatio="none"
              >
                <polygon points="50,0 100,36.3 80.9,95.1 19.1,95.1 0,36.3" />
              </svg>
            );
          case "star":
            return (
              <svg
                style={shapeSvgStyle}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="50,0 61.8,35.3 98.2,35.3 68.0,57.3 79.6,92.7 50,70.3 20.4,92.7 32.0,57.3 1.8,35.3 38.2,35.3" />
              </svg>
            );
          case "heart":
            return (
              <svg
                style={shapeSvgStyle}
                viewBox="0 0 100 90"
                preserveAspectRatio="none"
              >
                <path d="M50,90 L10,50 C10,20 40,0 50,20 C60,0 90,20 90,50 L50,90 Z" />
              </svg>
            );
          case "arrow":
            return (
              <svg
                style={shapeSvgStyle}
                viewBox="0 0 100 60"
                preserveAspectRatio="none"
              >
                <polygon points="0,20 70,20 70,0 100,30 70,60 70,40 0,40" />
              </svg>
            );
          case "diamond":
            return (
              <svg
                style={shapeSvgStyle}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="50,0 100,50 50,100 0,50" />
              </svg>
            );
          case "plus":
            return (
              <svg
                style={shapeSvgStyle}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="40,0 60,0 60,40 100,40 100,60 60,60 60,100 40,100 40,60 0,60 0,40 40,40" />
              </svg>
            );
          default:
            return (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: element.color || DEFAULT_ELEMENT_COLOR,
                }}
                className="pointer-events-none"
              ></div>
            );
        }
      case "image":
        if (!element.id)
          return <div className="text-xs text-red-500">Missing imageId</div>;
        const imageUrlFromBank = imageBank[element.imageId];
        if (!imageUrlFromBank)
          return (
            <div className="text-xs text-red-500">Image not found in bank</div>
          );

        return (
          <Image
            src={imageUrlFromBank}
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

  const HANDLE_SIZE_PX = 10;
  const handleSize = HANDLE_SIZE_PX / zoomLevel;
  const handleOffset = -handleSize / 2 - 1 / zoomLevel;

  const resizeHandleBaseStyle = {
    position: "absolute",
    width: `${handleSize}px`,
    height: `${handleSize}px`,
    backgroundColor: "hsl(var(--primary))",
    border: `${1 / zoomLevel}px solid hsl(var(--background))`,
    borderRadius: `${2 / zoomLevel}px`,
    zIndex: (element.zIndex || 0) + 1001,
    boxShadow: `0 0 ${2 / zoomLevel}px rgba(0,0,0,0.3)`,
  };

  const resizeHandles = [
    {
      mode: "resize-tl",
      style: { top: `${handleOffset}px`, left: `${handleOffset}px` },
      cursor: "nwse-resize",
    },
    {
      mode: "resize-tr",
      style: { top: `${handleOffset}px`, right: `${handleOffset}px` },
      cursor: "nesw-resize",
    },
    {
      mode: "resize-bl",
      style: { bottom: `${handleOffset}px`, left: `${handleOffset}px` },
      cursor: "nesw-resize",
    },
    {
      mode: "resize-br",
      style: { bottom: `${handleOffset}px`, right: `${handleOffset}px` },
      cursor: "nwse-resize",
    },
    {
      mode: "resize-t",
      style: {
        top: `${handleOffset}px`,
        left: `calc(50% - ${handleSize / 2}px)`,
      },
      cursor: "ns-resize",
    },
    {
      mode: "resize-b",
      style: {
        bottom: `${handleOffset}px`,
        left: `calc(50% - ${handleSize / 2}px)`,
      },
      cursor: "ns-resize",
    },
    {
      mode: "resize-l",
      style: {
        top: `calc(50% - ${handleSize / 2}px)`,
        left: `${handleOffset}px`,
      },
      cursor: "ew-resize",
    },
    {
      mode: "resize-r",
      style: {
        top: `calc(50% - ${handleSize / 2}px)`,
        right: `${handleOffset}px`,
      },
      cursor: "ew-resize",
    },
  ];

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
          {resizeHandles.map((handle) => (
            <div
              key={handle.mode}
              style={{
                ...resizeHandleBaseStyle,
                ...handle.style,
                cursor: handle.cursor,
              }}
              onMouseDown={(e) => onInteractionStart(e, handle.mode)}
              onClick={(e) => e.stopPropagation()}
              title={`Resize ${handle.mode?.split("-")[1].toUpperCase()}`}
            />
          ))}
          <div
            style={{
              position: "absolute",
              top: `${handleOffset - handleSize - 4 / zoomLevel}px`,
              left: `calc(50% - ${(handleSize + 4 / zoomLevel) / 2}px)`,
              width: `${handleSize + 4 / zoomLevel}px`,
              height: `${handleSize + 4 / zoomLevel}px`,
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
            <RotateCcw
              size={handleSize}
              strokeWidth={Math.max(1, Math.min(2.5, 2.25 / zoomLevel))}
            />
          </div>
        </>
      )}
    </div>
  );
}
