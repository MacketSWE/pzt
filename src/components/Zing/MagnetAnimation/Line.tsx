import React from "react";
import styles from "./Line.module.css";
import { LineProps } from "../ZingAnimation/Line";

export const Line: React.FC<LineProps> = ({ x, y, mousePosition, color }) => {
  const distanceToMouse = Math.sqrt(
    (mousePosition.x - x) ** 2 + (mousePosition.y - y) ** 2
  );

  // Calculate magnet effect on size based on distance
  const baseHeight = 20;
  const maxIncrease = 15;
  const distanceThreshold = 200; // The threshold at which the maximum effect is applied
  const heightIncrease =
    distanceToMouse < distanceThreshold
      ? (1 - distanceToMouse / distanceThreshold) * maxIncrease
      : 0;
  const height = baseHeight + heightIncrease;

  // Calculate magnet pull effect on position
  const maxPullDistance = 100;
  // Calculate magnet pull effect on position
  const pullIntensity =
    distanceToMouse < distanceThreshold
      ? 1 - distanceToMouse / distanceThreshold
      : 0;
  const pullX =
    ((mousePosition.x - x) * pullIntensity * maxPullDistance) /
    distanceThreshold;
  const pullY =
    ((mousePosition.y - y) * pullIntensity * maxPullDistance) /
    distanceThreshold;

  // Adjust rotation based on pull intensity
  const maxRotation = 45; // in degrees
  const rotation = pullIntensity * maxRotation;

  return (
    <div
      className={styles.container}
      style={{
        left: x + pullX,
        top: y + pullY - height / 2, // adjust to center the magnet effect
        width: `1px`,
        height: `${height}px`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center",
        backgroundColor: color,
      }}
    ></div>
  );
};
