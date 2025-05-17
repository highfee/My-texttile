"use client";
import React from "react";
import Image from "next/image";
// import { ApparelView } from "@/constants/index";

// Define base dimensions for canvas consistency
const CANVAS_WIDTH = 400; // pixels
const CANVAS_HEIGHT = 425; // pixels

export default function ApparelView({
  apparelType,
  apparelColor,
  apparelView,
}) {
  // Placeholder URLs - replace with actual dynamic images or 3D model later
  const getImageUrl = () => {
    let hint = `${apparelType} ${apparelView}`;
    let width = CANVAS_WIDTH;
    let height = CANVAS_HEIGHT;

    if (apparelType === "hoodie") {
      height = Math.round(CANVAS_HEIGHT * 1.1); // Hoodies slightly taller
    }
    if (apparelView === "left" || apparelView === "right") {
      width = Math.round(CANVAS_WIDTH * 0.8); // Side views might be narrower
    }

    return {
      //   url: `https://placehold.co/${width}x${height}.png/E8E8E8/CCCCCC?text=${apparelType}+${apparelView}`,
      url: "/design/images/black-mockup.png",
      hint,
      width,
      height,
    };
  };

  const {
    url: placeholderImageUrl,
    hint: placeholderHint,
    width: imageWidth,
    height: imageHeight,
  } = getImageUrl();

  console.log(placeholderImageUrl);

  return (
    <div
      className="relative overflow-hidden mx-auto "
      style={{
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        backgroundColor: apparelColor, // Apply apparel base color
      }}
      aria-label={`Apparel view: ${apparelType} ${apparelView} in color ${apparelColor}`}
    >
      <Image
        src={placeholderImageUrl}
        // src={"/design/black-mockup.png"}
        alt={`${apparelType} ${apparelView}`}
        width={imageWidth - 20}
        height={imageHeight - 20}
        className="object-contain pointer-events-none" // object-contain to fit within dimensions
        data-ai-hint={placeholderHint}
        priority // Prioritize loading apparel image
      />
    </div>
  );
}
