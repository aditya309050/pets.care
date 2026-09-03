'use client';

import React, { useRef } from 'react';

interface InteractivePetImageProps {
  src: string;
  alt: string;
  className?: string;
  headFollowStrength?: number;
  mousePos: { x: number; y: number; normX: number; normY: number };
}

export const InteractivePetImage: React.FC<InteractivePetImageProps> = ({
  src,
  alt,
  className = '',
  headFollowStrength = 1,
  mousePos,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth 3D gaze tracking & head tilt towards cursor
  // When cursor moves left (normX < 0) -> pets lean & look left
  // When cursor moves right (normX > 0) -> pets lean & look right
  const headShiftX = mousePos.normX * 16 * headFollowStrength;
  const headShiftY = mousePos.normY * 8 * headFollowStrength;
  const headRotate = mousePos.normX * 3.2 * headFollowStrength;

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate3d(${headShiftX}px, ${headShiftY}px, 0) rotate(${headRotate}deg)`,
        transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'bottom center',
      }}
      className={`relative w-full h-auto select-none ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block object-cover object-bottom pointer-events-none filter drop-shadow-sm"
        draggable={false}
      />
    </div>
  );
};
