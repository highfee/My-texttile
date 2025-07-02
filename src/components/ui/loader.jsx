import * as React from "react";
import { cn } from "@/lib/utils";

const loaderVariants = {
  sizes: {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-8 w-8",
    xl: "h-12 w-12"
  },
  types: {
    spinner: "animate-spin",
    pulse: "animate-pulse",
    pulsing: "animate-ping"
  }
};

const Loader = React.forwardRef(({ 
  className,
  size = "default",
  type = "spinner",
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        className
      )}
      {...props}
    >
      <svg
        className={cn(
          "text-primary",
          loaderVariants.sizes[size] || loaderVariants.sizes.default,
          loaderVariants.types[type] || loaderVariants.types.spinner
        )}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
});

Loader.displayName = "Loader";

export { Loader };