// Line.tsx
import React from "react";
import styles from "./Line.module.css";

export interface LineProps {
  x: number;
  y: number;
  mousePosition: { x: number; y: number };
  color: string;
}

export const Line: React.FC<LineProps> = ({ x, y, mousePosition, color }) => {
  const distance = Math.sqrt(
    Math.pow(mousePosition.x - x, 2) + Math.pow(mousePosition.y - y, 2)
  );
  const calculatedHeight = 30 - 28 / (1 + 0.01 * distance);
  const theta = Math.atan2(mousePosition.y - y, mousePosition.x - x);
  const angleInDegrees = theta * (180 / Math.PI) - 90;

  return (
    <div
      className={styles.container}
      style={{
        left: x,
        top: y,
        width: `1px`,
        height: `${calculatedHeight}px`,
        transform: `rotate(${angleInDegrees}deg)`,
        transformOrigin: "top",
        backgroundColor: color,
      }}
    ></div>
  );
};
