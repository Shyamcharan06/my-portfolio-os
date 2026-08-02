"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { Size } from "@/types/window";

interface ResizeHandlesProps {
  size: Size;
  minSize: Size;
  onResize: (size: Size) => void;
  onResizeEnd: (size: Size) => void;
}

type Direction = "right" | "bottom" | "corner";
interface DragStart {
  width: number;
  height: number;
  x: number;
  y: number;
}

// Hand-rolled (not a library): resize is a ~50-line pointer-event handler used in exactly
// one component, unlike drag (see WindowFrame), which needed to bypass React's render cycle.
export function ResizeHandles({ size, minSize, onResize, onResizeEnd }: ResizeHandlesProps) {
  function computeSize(direction: Direction, start: DragStart, dx: number, dy: number): Size {
    return {
      width: direction === "bottom" ? start.width : Math.max(minSize.width, start.width + dx),
      height: direction === "right" ? start.height : Math.max(minSize.height, start.height + dy),
    };
  }

  function startResize(direction: Direction) {
    return (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const handle = event.currentTarget;
      const pointerId = event.pointerId;
      handle.setPointerCapture(pointerId);
      const start: DragStart = { width: size.width, height: size.height, x: event.clientX, y: event.clientY };

      function handleMove(moveEvent: PointerEvent) {
        onResize(computeSize(direction, start, moveEvent.clientX - start.x, moveEvent.clientY - start.y));
      }

      function handleUp(upEvent: PointerEvent) {
        handle.releasePointerCapture(pointerId);
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        onResizeEnd(computeSize(direction, start, upEvent.clientX - start.x, upEvent.clientY - start.y));
      }

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    };
  }

  return (
    <>
      <div
        onPointerDown={startResize("right")}
        className="absolute inset-y-0 right-0 w-1.5 cursor-ew-resize touch-none"
      />
      <div
        onPointerDown={startResize("bottom")}
        className="absolute inset-x-0 bottom-0 h-1.5 cursor-ns-resize touch-none"
      />
      <div
        onPointerDown={startResize("corner")}
        className="absolute right-0 bottom-0 size-3 cursor-nwse-resize touch-none"
      />
    </>
  );
}
