"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Stage,
  Layer,
  Text,
  Image as KonvaImage,
  Rect,
  Transformer,
  Path as KonvaPath,
} from "react-konva";
import useImage from "use-image";
import {
  useDesignStore,
  useUpdateObjectAndHistory,
} from "@/store/design-store";

const CanvasElement = ({
  shapeProps,
  isSelected,
  onSelect,
  onDoubleClick,
  onContextMenu,
}) => {
  const shapeRef = useRef(null);
  const [img] = useImage(
    shapeProps.type === "image" ? shapeProps.src || "" : "",
    "anonymous"
  );
  const updateObjectWithHistory = useUpdateObjectAndHistory();

  const handleDragEnd = (e) => {
    updateObjectWithHistory(shapeProps.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const commonProps = {
    ...shapeProps,
    id: shapeProps.id,
    ref: shapeRef,
    draggable: isSelected,
    dragDistance: 5,
    onClick: onSelect,
    onTap: onSelect,
    onContextMenu: (e) => {
      e.evt.preventDefault();
      onSelect(e);
      onContextMenu(e);
    },
    onDragEnd: handleDragEnd,
    onTransformEnd: () => {
      const node = shapeRef.current;
      if (node) {
        const newAttrs = {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          scaleX: node.scaleX(),
          scaleY: node.scaleY(),
        };
        updateObjectWithHistory(shapeProps.id, newAttrs);
      }
    },
  };

  if (shapeProps.type === "text") {
    return (
      <Text
        {...commonProps}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
      />
    );
  }
  if (shapeProps.type === "image") {
    return <KonvaImage {...commonProps} image={img} />;
  }
  if (shapeProps.type === "rect") {
    return <Rect {...commonProps} />;
  }
  if (shapeProps.type === "path") {
    return <KonvaPath {...commonProps} data={shapeProps.path} />;
  }

  return null;
};

const TransformerComponent = ({ selectedNodeId }) => {
  const trRef = useRef(null);
  const { objects, activeView } = useDesignStore();

  useEffect(() => {
    if (trRef.current) {
      const stage = trRef.current.getStage();
      const selectedNode = selectedNodeId
        ? stage?.findOne("#" + selectedNodeId)
        : null;

      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
      } else {
        trRef.current.nodes([]);
      }
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedNodeId, objects, activeView]);

  return (
    <Transformer
      ref={trRef}
      boundBoxFunc={(oldBox, newBox) => {
        if (newBox.width < 5 || newBox.height < 5) {
          return oldBox;
        }
        return newBox;
      }}
    />
  );
};

export default function CanvasArea({ stageSize }) {
  const {
    activeView,
    objects,
    selectedId,
    zoom,
    garmentImages,
    setSelectedId,
    showContextMenu,
    hideContextMenu,
    setStageRef,
  } = useDesignStore();

  const updateObjectWithHistory = useUpdateObjectAndHistory();
  const localStageRef = useRef(null);
  const [editingNode, setEditingNode] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setStageRef(localStageRef);
  }, [setStageRef]);

  useEffect(() => {
    if (editingNode && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editingNode]);

  const [garmentImage] = useImage(garmentImages[activeView] || "", "anonymous");

  const handleTextareaBlur = () => {
    if (!editingNode) return;

    updateObjectWithHistory(editingNode.id(), {
      text: textareaRef.current.value,
    });

    editingNode.show();
    const layer = editingNode.getLayer();
    layer?.getStage()?.batchDraw();
    setEditingNode(null);
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextareaBlur();
    }
    if (e.key === "Escape") {
      if (editingNode) {
        editingNode.show();
        const layer = editingNode.getLayer();
        layer?.getStage()?.batchDraw();
        setEditingNode(null);
      }
    }
  };

  const handleSelect = (e) => {
    e.evt.stopPropagation();
    setSelectedId(e.target.id());
  };

  const handleDoubleClick = (e) => {
    const node = e.target;
    if (node.getClassName() === "Text") {
      setEditingNode(node);
      node.hide();
      const layer = node.getLayer();
      layer?.getStage()?.batchDraw();
    }
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      if (editingNode) {
        handleTextareaBlur();
      }
      setSelectedId(null);
      hideContextMenu();
    }
  };

  let garmentProps = { x: 0, y: 0, width: 0, height: 0, visible: false };
  let marginProps = {
    x: 30,
    y: 30,
    width: stageSize.width - 60,
    height: stageSize.height - 60,
  };

  if (garmentImage) {
    const stageW = stageSize.width;
    const stageH = stageSize.height;
    const imgW = garmentImage.width;
    const imgH = garmentImage.height;

    let newHeight = stageH * 0.95;
    let newWidth = newHeight * (imgW / imgH);

    if (newWidth > stageW * 0.95) {
      newWidth = stageW * 0.95;
      newHeight = newWidth * (imgH / imgW);
    }

    const x = (stageW - newWidth) / 2;
    const y = (stageH - newHeight) / 2;
    garmentProps = { x, y, width: newWidth, height: newHeight, visible: true };

    const marginPaddingX = newWidth * 0.15;
    const marginPaddingY = newHeight * 0.15;
    marginProps = {
      x: x + marginPaddingX,
      y: y + marginPaddingY,
      width: newWidth - marginPaddingX * 2,
      height: newHeight - marginPaddingY * 2,
    };
  }

  const clipFunc = (ctx) => {
    ctx.rect(
      marginProps.x,
      marginProps.y,
      marginProps.width,
      marginProps.height
    );
  };

  let editorStyle = {};
  if (editingNode) {
    const stage = editingNode.getStage();
    if (stage) {
      const stageContainer = stage.container();
      const box = editingNode.getClientRect({ skipTransform: false });
      const rotation = editingNode.rotation();
      const scaleX = stage.scaleX() * editingNode.scaleX();
      // const scaleY = stage.scaleY() * editingNode.scaleY();

      editorStyle = {
        position: "absolute",
        top: `${stageContainer.offsetTop + box.y}px`,
        left: `${stageContainer.offsetLeft + box.x}px`,
        width: `${box.width}px`,
        height: `${box.height}px`,
        fontSize: `${editingNode.fontSize() * scaleX}px`,
        border: "none",
        padding: `${editingNode.padding() * scaleX}px`,
        margin: "0px",
        overflow: "hidden",
        background: "none",
        outline: "none",
        resize: "none",
        lineHeight: editingNode.lineHeight(),
        fontFamily: `"${editingNode.fontFamily()}"`,
        transformOrigin: "left top",
        transform: `rotateZ(${rotation}deg)`,
        color: editingNode.fill(),
        textAlign: editingNode.align(),
        // fontWeight: editingNode.fontWeight(),
        fontStyle: editingNode.fontStyle(),
      };
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        scaleX={zoom}
        scaleY={zoom}
        ref={localStageRef}
      >
        <Layer>
          {garmentImage && (
            <KonvaImage
              image={garmentImage}
              {...garmentProps}
              listening={false}
            />
          )}
        </Layer>
        <Layer clipFunc={clipFunc}>
          {objects[activeView].map((obj) => (
            <CanvasElement
              key={obj.id}
              shapeProps={obj}
              isSelected={obj.id === selectedId}
              onSelect={handleSelect}
              onDoubleClick={handleDoubleClick}
              onContextMenu={(e) => showContextMenu(e.evt.pageX, e.evt.pageY)}
            />
          ))}
          <TransformerComponent selectedNodeId={selectedId} />
        </Layer>
        <Layer name="margin-layer">
          <Rect
            {...marginProps}
            stroke="rgba(0,0,0,0.3)"
            strokeWidth={2}
            dash={[4, 2]}
            listening={false}
          />
        </Layer>
      </Stage>
      {editingNode && (
        <textarea
          ref={textareaRef}
          style={editorStyle}
          defaultValue={editingNode.text()}
          onBlur={handleTextareaBlur}
          onKeyDown={handleTextareaKeyDown}
        />
      )}
    </div>
  );
}
