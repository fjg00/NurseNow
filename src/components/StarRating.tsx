"use client";

import { Star } from "lucide-react";

export function StarRating({
  rating,
  onRate,
  size = "md",
}: {
  rating: number;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5";

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star)}
          className={onRate ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
          disabled={!onRate}
        >
          <Star
            className={`${sizeClass} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
