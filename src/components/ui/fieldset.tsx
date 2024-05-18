import { cn } from "@/lib/utils";
import React from "react";

import type { PropsWithChildren, ReactNode } from "react";

type FieldsetProps = {
  children: ReactNode[];
};

export const Fieldset = ({ children }: FieldsetProps) => {
  return (
    <fieldset className="rounded-lg  border bg-card px-3 text-card-foreground shadow-sm">
      {children}
    </fieldset>
  );
};

export const FieldsetLegend = ({ children }: PropsWithChildren) => {
  return (
    <legend className="float-none flex w-auto gap-2 px-3 text-muted-foreground">
      {children}
    </legend>
  );
};

const FieldsetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
FieldsetHeader.displayName = "FieldsetHeader";

const FieldsetTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
FieldsetTitle.displayName = "FieldsetTitle";

const FieldsetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
FieldsetDescription.displayName = "FieldsetDescription";

const FieldsetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
FieldsetContent.displayName = "FieldsetContent";

const FieldsetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
FieldsetFooter.displayName = "FieldsetFooter";

export {
  FieldsetHeader,
  FieldsetContent,
  FieldsetDescription,
  FieldsetFooter,
  FieldsetTitle,
};
