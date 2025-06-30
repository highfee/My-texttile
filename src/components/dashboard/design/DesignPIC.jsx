import React, { useEffect, useRef, useState } from "react";

import { useDesignStore } from "@/store/design-store";
import useImage from "use-image";

import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Rect,
  Path as KonvaPath,
} from "react-konva";

const CanvasObject = ({ shapeProps }) => {
  const [img] = useImage(
    shapeProps.type === "image" ? shapeProps.src || "" : "",
    "anonymous"
  );

  if (shapeProps.type === "text") {
    return <Text {...shapeProps} listening={false} />;
  }
  if (shapeProps.type === "image") {
    return <KonvaImage {...shapeProps} image={img} listening={false} />;
  }
  if (shapeProps.type === "rect") {
    return <Rect {...shapeProps} listening={false} />;
  }
  if (shapeProps.type === "path") {
    return (
      <KonvaPath {...shapeProps} data={shapeProps.path} listening={false} />
    );
  }
  return null;
};

const DesignPIC = () => {
  const { garmentImages, activeView, objects } = useDesignStore();
  const [previewView, setPreviewView] = useState("front");
  const [stageSize, setStageSize] = useState({ width: 450, height: 422 });

  const containerRef = useRef(null);
  const [previewSize, setPreviewSize] = useState({ width: 300, height: 300 });
  const [garmentImage] = useImage(
    garmentImages[previewView] || "",
    "anonymous"
  );

  useEffect(() => {
    setPreviewView(activeView);
  }, [activeView]);

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setPreviewSize({ width, height: width });
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const scale = previewSize.width / stageSize.width;

  let garmentProps = { x: 0, y: 0, width: 0, height: 0, visible: false };

  if (garmentImage) {
    const stageW = previewSize.width;
    const stageH = previewSize.height;
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
  }

  console.log(activeView, "activeView", previewView);

  return (
    <div>
      <section className="flex flex-col items-center justify-center">
        {/* <div className=" border-primary/40  rounded-md p-5">{preview}</div> */}

        <div
          ref={containerRef}
          className=" w-[280px] aspect-square bg-muted rounded-lg overflow-hidden"
        >
          <Stage width={previewSize.width} height={previewSize.height}>
            <Layer>
              {garmentImage && (
                <KonvaImage
                  image={garmentImage}
                  {...garmentProps}
                  listening={false}
                />
              )}
            </Layer>
            <Layer scaleX={scale} scaleY={scale}>
              {objects[previewView].map((obj) => (
                <CanvasObject key={obj.id} shapeProps={obj} />
              ))}
            </Layer>
          </Stage>
        </div>
      </section>
    </div>
  );
};

export default DesignPIC;
