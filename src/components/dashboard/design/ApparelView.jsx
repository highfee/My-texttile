"use client";
import React from "react";
import Image from "next/image";
import useDesignStore from "@/store/DesignStore";

// Define base dimensions for canvas consistency
const CANVAS_WIDTH = 400; // pixels
const CANVAS_HEIGHT = 422; // pixels

export default function ApparelView({
  apparelType,
  apparelColor,
  apparelView,
}) {
  const currentDesign = useDesignStore((state) =>
    state.designs.find((d) => d.id === state.currentDesignId)
  );
  const apparelBaseImageForView =
    currentDesign?.apparelBaseImages?.[apparelView];

  const getPlaceholderImageUrl = () => {
    let hint = `${apparelType} ${apparelView}`;
    let width = CANVAS_WIDTH;
    let height = CANVAS_HEIGHT;

    if (apparelType === "hoodie") {
      height = Math.round(CANVAS_HEIGHT * 1.1);
    }
    if (apparelView === "left" || apparelView === "right") {
      width = Math.round(CANVAS_WIDTH * 1);
    }
    return {
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
  } = getPlaceholderImageUrl();

  const displayImageUrl = apparelBaseImageForView || placeholderImageUrl;
  const displayHint = apparelBaseImageForView
    ? `${apparelType} ${apparelView} custom`
    : placeholderHint;
  const isCloudinaryUrl =
    typeof displayImageUrl === "string" &&
    displayImageUrl.startsWith("https://res.cloudinary.com");
  const isPlaceholderUrl =
    typeof displayImageUrl === "string" &&
    displayImageUrl.startsWith("https://placehold.co");
  // Blob URLs should be unoptimized. Cloudinary & Placeholders can be optimized by Next/Image if domains configured.
  const shouldUnoptimize =
    typeof displayImageUrl === "string" && displayImageUrl.startsWith("blob:");
  return (
    <section style={{ width: "100%", backgroundColor: apparelColor }}>
      <div
        className="relative overflow-hidden mx-auto select-none" // Added select-none to prevent selection
        style={{
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
        }}
        aria-label={`Apparel view: ${apparelType} ${apparelView} in color ${apparelColor}`}
      >
        <Image
          src={displayImageUrl}
          alt={`${apparelType} ${apparelView}`}
          width={imageWidth}
          height={imageHeight}
          className="object-contain pointer-events-none inline-block mx-auto"
          data-ai-hint={!apparelBaseImageForView ? displayHint : undefined} // Only add hint for placeholders
          priority
          unoptimized={shouldUnoptimize}
        />
      </div>
    </section>
  );
}
