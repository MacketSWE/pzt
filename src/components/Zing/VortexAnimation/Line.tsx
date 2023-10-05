// Dot.tsx
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

  // Adjust position of dots based on their distance to the pointer, creating a pull effect
  const pullEffect = 50 - distanceToMouse * 0.1;
  const shiftedX = x - pullEffect * Math.cos(theta);
  const shiftedY = y - pullEffect * Math.sin(theta);

  // Determine opacity to create void around pointer
  const opacity = distanceToMouse < 10 ? 0 : 1; // Dots within 25 pixels of the pointer will be invisible

  return (
    <div
      className={styles.container}
      style={{
        left: shiftedX,
        top: shiftedY,
        width: `1px`,
        height: `20px`,
        transform: `rotate(${angleInDegrees}deg)`,
        transformOrigin: "center",
        backgroundColor: color,
        opacity: opacity,
      }}
    ></div>
  );
};
