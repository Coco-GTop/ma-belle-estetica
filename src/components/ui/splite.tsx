"use client";

import { Suspense, lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

type Props = {
  scene: string;
  className?: string;
};

export function SplineScene({ scene, className }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-white/80" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
