import React from "react";
import styles from "./Line.module.css";

interface LineProps {
  x: number;
  y: number;
  mousePosition: { x: number; y: number };
}

export const Line: React.FC<LineProps> = ({ x, y, mousePosition }) => {
  const distanceToMouse = Math.sqrt(
    (mousePosition.x - x) ** 2 + (mousePosition.y - y) ** 2
  );

  // Calculate pulsing effect based on distance
  const baseLength = 20;
  const pulseEffect = 10 * Math.sin(distanceToMouse * 0.1);
  const length = baseLength + pulseEffect;

  // Change color based on distance
  const maxDistanceForColorChange = 100;
  const colorIntensity = Math.min(
    1,
    (maxDistanceForColorChange - distanceToMouse) / maxDistanceForColorChange
  );

  // Interpolating between silver and red
  // const r = Math.floor(192 + (255 - 192) * colorIntensity);
  // const g = Math.floor(192 * (1 - colorIntensity));
  // const b = Math.floor(192 * (1 - colorIntensity));

  // Interpolating between white and gold
  const r = 255; // Red stays constant as both white and gold have 255 for red component
  const g = Math.floor(255 + (223 - 255) * colorIntensity);
  const b = Math.floor(255 * (1 - colorIntensity));

  // Interpolating between silver and gold
  // const r = Math.floor(192 + (255 - 192) * colorIntensity);
  // const g = Math.floor(192 + (223 - 192) * colorIntensity);
  // const b = Math.floor(192 * (1 - colorIntensity));

  const color = `rgb(${r}, ${g}, ${b})`;

  return (
    <div
      className={styles.container}
      style={{
        left: x,
        top: y,
        width: `1px`,
        height: `${length}px`,
        backgroundColor: color,
      }}
    ></div>
  );
};
