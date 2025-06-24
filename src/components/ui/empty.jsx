import * as React from "react";
import { cn } from "@/lib/utils";

const Empty = React.forwardRef(({ 
  className,
  icon,
  title,
  description,
  action,
  image,
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center space-y-4 py-12 px-4 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
      )}
      {image && (
        <div className="flex items-center justify-center">
          {image}
        </div>
      )}
      {title && (
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
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

Empty.displayName = "Empty";

export { Empty };