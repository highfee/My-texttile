import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import {
  Bold,
  CaseSensitive,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  Italic,
  Loader,
  Plus,
  Underline,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Slider } from "@/components/ui/slider";

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

const PreviewOverlay = () => {
  const { garmentImages, activeView, objects } = useDesignStore();
  const [previewView, setPreviewView] = useState(activeView);
  const [stageSize, setStageSize] = useState({ width: 450, height: 422 });

  const containerRef = useRef(null);
  const [previewSize, setPreviewSize] = useState({ width: 500, height: 500 });
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
      <DialogHeader className="flex items-center justify-between flex-row">
        <DialogTitle>
          <div>Preview </div>
        </DialogTitle>

        <Select
          defaultValue="front"
          value={previewView}
          onValueChange={setPreviewView}
        >
          <SelectTrigger className=" rounded-md cursor-pointer gap-2 border-primary/40 w-20">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="front">Front</SelectItem>
            <SelectItem value="back">Back</SelectItem>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1">
          <Button
            variant="default"
            className=" border-gray-300 text-sm  [&_svg]:size-5 h-9 "
          >
            Publish
          </Button>

          <DialogClose className="bg-gray-100 rounded-md h-9 w-9 grid place-items-center  cursor-pointer ">
            <X size={18} />
          </DialogClose>
        </div>
      </DialogHeader>

      <section className="flex flex-col items-center justify-center h-[calc(100vh-4rem) mt-20">
        {/* <div className=" border-primary/40  rounded-md p-5">{preview}</div> */}

        <div
          ref={containerRef}
          className=" w-[450px] aspect-square bg-muted rounded-lg overflow-hidden"
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

      <section className="flex items-center justify-center gap-2 mt-40">
        <ZoomOut className="text-primary/40" />
        <Slider defaultValue={[33]} max={100} step={1} className="w-40" />

        <ZoomIn className="text-primary/40" />
      </section>
    </div>
  );
};

export default PreviewOverlay;
