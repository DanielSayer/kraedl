import { cn } from "@/lib/utils";
import * as React from "react";

import type { LucideIcon } from "lucide-react";

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  start?: string;
  end?: string;
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ className, type, start, end, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {start && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
            {start}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            start ? "pl-12" : "",
            end ? "pr-8" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {end && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            {end}
          </div>
        )}
      </div>
    );
  },
);
InputGroup.displayName = "InputGroup";

export interface IconInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className="relative w-full">
        {StartIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
            <StartIcon size={18} className="text-muted-foreground" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-12" : "",
            endIcon ? "pr-8" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            <EndIcon className="text-muted-foreground" size={18} />
          </div>
        )}
      </div>
    );
  },
);
IconInput.displayName = "IconInput";

export { IconInput };
