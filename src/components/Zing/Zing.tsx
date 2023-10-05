import React, { useState } from "react";
import styles from "./Zing.module.css";
import { Line as ZingLine } from "./ZingAnimation";
import { Line as SwirlLine } from "./SwirlAnimation";
import { Line as PulseLine } from "./PulseAnimation";
import { Line as VortexLine } from "./VortexAnimation";
import { Line as MagnetLine } from "./MagnetAnimation";
import { useAppStore } from "../../store/store";
import { MousePointer } from "./MousePointer";

export enum AnimationType {
  ZING,
  SWIRL,
  PULSE,
  VORTEX,
  MAGNET,
}

interface ZingProps {
  animation: AnimationType;
}

export const Zing: React.FC<ZingProps> = ({ animation }) => {
  const color = useAppStore((state) => state.color);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const containerBounds = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - containerBounds.left;
    const relativeY = event.clientY - containerBounds.top;

    setMousePosition({ x: relativeX, y: relativeY });
  };

  const spacing = 30;
  const lineSizeWithMargin = 5;
  const rows = Math.floor(1200 / spacing);
  const columns = Math.floor(1500 / spacing);

  let LineComponent: any;
  switch (animation) {
    case AnimationType.ZING:
      LineComponent = ZingLine;
      break;
    case AnimationType.SWIRL:
      LineComponent = SwirlLine;
      break;
    case AnimationType.PULSE:
      LineComponent = PulseLine;
      break;
    case AnimationType.VORTEX:
      LineComponent = VortexLine;
      break;
    case AnimationType.MAGNET:
      LineComponent = MagnetLine;
      break;
    default:
      LineComponent = ZingLine;
  }

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      {Array.from({ length: rows }).flatMap((_, rowIndex) =>
        Array.from({ length: columns }).map((_, colIndex) => (
          <LineComponent
            color={color.color}
            key={`${rowIndex}-${colIndex}`}
            x={-200 + colIndex * spacing - (spacing - lineSizeWithMargin) / 2}
            y={-200 + rowIndex * spacing - (spacing - lineSizeWithMargin) / 2}
            mousePosition={mousePosition}
          />
        ))
      )}
      <MousePointer
        x={mousePosition.x + window.pageXOffset}
        y={mousePosition.y + window.pageYOffset}
      />
    </div>
  );
};
