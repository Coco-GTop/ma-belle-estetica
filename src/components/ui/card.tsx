import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line/40 bg-white text-ink shadow-[var(--shadow-card)]",
        className
      )}
      {...props}
    />
  );
}

export { Card };
