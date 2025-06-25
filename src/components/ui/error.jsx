import * as React from "react";
import { cn } from "@/lib/utils";

const Error = React.forwardRef(({ 
  className,
  icon,
  title,
  description,
  action,
  image,
  children,
  variant = "default",
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center space-y-4 py-12 px-4 text-center",
        variant === "default" ? "border border-destructive/20 bg-destructive/5 rounded-lg" : "",
        variant === "inline" ? "" : "",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          {icon}
        </div>
      )}
      {image && (
        <div className="flex items-center justify-center">
          {image}
        </div>
      )}
      {title && (
        <h3 className="text-xl font-semibold text-destructive">{title}</h3>
      )}
      {description && (
        <p className="max-w-sm text-muted-foreground">{description}</p>
      )}
      {action && (
        <div className="flex justify-center">{action}</div>
      )}
      {children}
    </div>
  );
});

Error.displayName = "Error";

export { Error };
