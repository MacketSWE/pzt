// Line.tsx
import React from "react";
import styles from "./Line.module.css";
import { LineProps } from "../ZingAnimation/Line";

export const Line: React.FC<LineProps> = ({ x, y, mousePosition, color }) => {
  const distanceToMouse = Math.sqrt(
    (mousePosition.x - x) ** 2 + (mousePosition.y - y) ** 2
  );

  // Calculate angle between dot and mouse pointer
  const theta = Math.atan2(mousePosition.y - y, mousePosition.x - x);
  const angleInDegrees = theta * (180 / Math.PI);

  // Adjust length based on distance
  const adjustedLength = 20 - distanceToMouse * 0.01;
  const length = Math.max(5, adjustedLength);

  // Circle effect for dots close to the pointer
  const circleRadius = 60;

  // Adjust position based on circle effect, angle, and gravitational pull
  let radialShift;
  if (distanceToMouse < circleRadius) {
    radialShift = (circleRadius - distanceToMouse) * 2;
  } else {
    radialShift = 0.1 * distanceToMouse;
  }

  const shiftedX = x + radialShift * Math.cos(theta);
  const shiftedY = y + radialShift * Math.sin(theta);

  // Additional attraction towards center point (x, y)
  const attractionFactor = 0.1 * (1 - distanceToMouse / circleRadius);
  const centerX = x + (shiftedX - x) * attractionFactor;
  const centerY = y + (shiftedY - y) * attractionFactor;

  // Adjust rotation based on distance
  const adjustedRotation = angleInDegrees + distanceToMouse * 0.2;

  // Adjust opacity for dots very close to the pointer
  const opacity = distanceToMouse < 5 ? 0 : 1;

  return (
    <div
      className={styles.container}
      style={{
        left: centerX,
        top: centerY,
        width: `1px`,
        height: `${length}px`,
        transform: `rotate(${adjustedRotation}deg)`,
        transformOrigin: "center",
        opacity: opacity,
        backgroundColor: color,
      }}
    ></div>
  );
};
