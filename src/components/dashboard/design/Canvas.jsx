"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Text,
  Rect,
  Circle,
  Image as KonvaImage,
  Arc,
  Transformer,
} from "react-konva";
import Header from "./Header";
import { Redo, Trash2, Undo } from "lucide-react";
import { MdOutlineRotateRight } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDesignStore } from "@/store/useDesignStore";
import useImage from "use-image";

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

const Canvas = () => {
  const {
    elements,
    selectedElement,
    selectElement,
    clearCanvas,
    undo,
    redo,
    canUndo,
    canRedo,
    currentView,
    setCurrentView,
    rotateElement,
  } = useDesignStore();
  const stageRef = useRef(null);

  const handleSelect = (id) => {
    selectElement(id);
  };

  const handleDeselect = (e) => {
    if (e.target === e.target.getStage()) {
      selectElement(null);
    }
  };

  const handleRotateSelected = () => {
    if (selectedElement) {
      rotateElement(selectedElement, 90);
    }
  };

  return (
    <main className="flex-1 bg-off-white h-[3000px] overflow-y-auto no-scrollbar">
      <Header />

      <section className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] ">
        <header className="p-2 bg-primary w-[450px] rounded-md mb-4 flex items-center gap-3 px-4">
          <div
            className="grid place-items-center size-[30px] bg-dark-gray rounded-md cursor-pointer"
            onClick={clearCanvas}
          >
            <Trash2 color="white" size={20} />
          </div>

          <div
            className={`cursor-pointer ${canUndo() ? "" : "opacity-50"}`}
            onClick={canUndo() ? undo : undefined}
          >
            <Undo
              color={canUndo() ? "white" : "rgb(255,255,255,0.44)"}
              size={20}
            />
          </div>

          <div
            className={`cursor-pointer ${canRedo() ? "" : "opacity-50"}`}
            onClick={canRedo() ? redo : undefined}
          >
            <Redo
              color={canRedo() ? "white" : "rgb(255,255,255,0.44)"}
              size={20}
            />
          </div>

          <div
            className="grid place-items-center size-[30px] bg-dark-gray rounded-md cursor-pointer"
            onClick={handleRotateSelected}
          >
            <MdOutlineRotateRight color="white" size={20} />
          </div>

          <div className="ml-auto">
            <Select value={currentView} onValueChange={setCurrentView}>
              <SelectTrigger className="bg-dark-gray data-[placeholder]:text-white rounded-md cursor-pointer border-none gap-2">
                <SelectValue
                  placeholder={currentView}
                  className="text-white capitalize"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="front">Front</SelectItem>
                <SelectItem value="back">Back</SelectItem>
                <SelectItem value="arm">Arm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <div className="w-[450px] h-[425px] bg-white border border-primary/40 rounded-md shadow-sm">
          <Stage
            width={450}
            height={425}
            ref={stageRef}
            onClick={handleDeselect}
            onTap={handleDeselect}
          >
            <Layer>
              {elements.map((element) => {
                const isSelected = selectedElement === element.id;

                if (element.type === "text") {
                  return (
                    <TextElement
                      key={element.id}
                      element={{
                        ...element,
                        draggable: true, // Ensure the text is draggable
                        editable: true, // Enable editing
                      }}
                      isSelected={isSelected}
                      onSelect={handleSelect}
                    />
                  );
                } else if (element.type === "shape") {
                  return (
                    <ShapeElement
                      key={element.id}
                      element={element}
                      isSelected={isSelected}
                      onSelect={handleSelect}
                    />
                  );
                } else if (element.type === "image") {
                  return (
                    <ImageElement
                      key={element.id}
                      element={element}
                      isSelected={isSelected}
                      onSelect={handleSelect}
                    />
                  );
                }
                return null;
              })}
            </Layer>
          </Stage>
        </div>
      </section>
    </main>
  );
};

export default Canvas;
