import { Spinner } from "@/components/minimal-tiptap/components/spinner";
import { cn } from "@/lib/utils";
import * as React from "react";

export const ImageOverlay = React.memo(() => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center",
        "absolute inset-0 rounded bg-[var(--mt-overlay)] opacity-100 transition-opacity"
      )}
    >
      <Spinner className="size-7" />
    </div>
  );
});

ImageOverlay.displayName = "ImageOverlay";
