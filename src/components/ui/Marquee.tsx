"use client";

import { Sparkle } from "lucide-react";

type Props = { items: string[]; className?: string };

export function Marquee({ items, className = "" }: Props) {
  const row = [...items, ...items];
  return (
    <div
      className={`group relative flex overflow-hidden border-y border-line py-4 ${className}`}
      aria-hidden
    >
      <div className="flex shrink-0 [animation:marquee_28s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
        {row.map((it, i) => (
          <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap font-display text-lg tracking-wide text-ink/80">
            {it}
            <Sparkle className="size-4 text-gold" />
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-deep to-transparent" />
    </div>
  );
}
