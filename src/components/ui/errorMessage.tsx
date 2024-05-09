import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function ErrorMessage({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}
