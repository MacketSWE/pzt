// BlocksPage.tsx
import React, { useEffect, useState } from "react";
import styles from "./BlocksPage.module.css";

export const BlocksPage = () => {
  const [blockSize, setBlockSize] = useState(100);
  const [borderRadiusValue, setBorderRadiusValue] = useState(20);
  const [timeoutDuration, setTimeoutDuration] = useState(300);
  const [activeBlocks, setActiveBlocks] = useState<Record<number, boolean>>({});
  const [blockColor, setBlockColor] = useState("#d7f3f5"); // Default color set to blue
  const [isSettingsMinimized, setIsSettingsMinimized] = useState(false);
  const numOfBlocks = 1000;

  const toggleSettingsMinimize = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === "s") {
      setIsSettingsMinimized((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", toggleSettingsMinimize);
    return () => {
      window.removeEventListener("keydown", toggleSettingsMinimize);
    };
  }, []);

  const blocksArray = Array(numOfBlocks).fill(null);

  const handleMouseEnter = (index: number) => {
    setActiveBlocks((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setActiveBlocks((prev) => ({ ...prev, [index]: false }));
    }, timeoutDuration);
  };

  return (
    <div>
      <SettingsPanel
        blockSize={blockSize}
        setBlockSize={setBlockSize}
        borderRadiusValue={borderRadiusValue}
        setBorderRadiusValue={setBorderRadiusValue}
        numOfBlocks={numOfBlocks}
        timeoutDuration={timeoutDuration}
        setTimeoutDuration={setTimeoutDuration}
        blockColor={blockColor}
        setBlockColor={setBlockColor}
        isMinimized={isSettingsMinimized}
      />
      <div className={styles.container}>
        {blocksArray.map((_, index) => (
          <Block
            key={index}
            index={index}
            size={blockSize}
            borderRadiusValue={borderRadiusValue}
            blockColor={blockColor} // Pass down the block color
            numOfBlocks={numOfBlocks}
            activeBlocks={activeBlocks}
            onMouseEnter={handleMouseEnter}
          />
        ))}
      </div>
    </div>
  );
};

type BlockProps = {
  index: number;
  size: number;
  numOfBlocks: number;
  borderRadiusValue: number;
  blockColor: string; // New prop for block color
  activeBlocks: Record<number, boolean>;
  onMouseEnter: (index: number) => void;
};

const Block = ({
  index,
  size,
  numOfBlocks,
  borderRadiusValue,
  blockColor, // Receive the block color prop
  activeBlocks,
  onMouseEnter,
}: BlockProps) => {
  const columns = Math.floor(window.innerWidth / size); // Assuming a full-width container

  const isActive = activeBlocks[index];

  const isLeftActive = index % columns !== 0 && activeBlocks[index - 1];
  const isRightActive =
    index % columns !== columns - 1 && activeBlocks[index + 1];
  const isTopActive = index >= columns && activeBlocks[index - columns];
  const isBottomActive =
    index < numOfBlocks - columns && activeBlocks[index + columns];

  const isGreenCornerBottomRight = !isActive && isRightActive && isBottomActive;
  const isGreenCornerTopLeft = !isActive && isLeftActive && isTopActive;

  // Determine the index of the block to the right of the block on top
  const topBlockIndex = index - columns;
  const rightOfTopBlockIndex = topBlockIndex + 1;

  // Determine the index of the block below
  const belowBlockIndex = index + columns;
  // Determine the index of the block to the left of the block below
  const leftOfBelowBlockIndex = belowBlockIndex - 1;

  // Check if the block to the right of the block on top is active
  const isRightOfTopBlockActive =
    topBlockIndex % columns !== columns - 1 && // Ensure the top block is not in the last column
    activeBlocks[rightOfTopBlockIndex];

  // Check if the block to the left of the block below is active
  const isLeftOfBelowBlockActive =
    belowBlockIndex % columns !== 0 && // Ensure the below block is not in the first column
    activeBlocks[leftOfBelowBlockIndex];

  const borderRadius =
    `${isTopActive || isLeftActive ? "0" : `${borderRadiusValue}px`} ${
      isRightActive || isTopActive || isRightOfTopBlockActive
        ? "0"
        : `${borderRadiusValue}px`
    } ` +
    `${isBottomActive || isRightActive ? "0" : `${borderRadiusValue}px`} ${
      isLeftActive || isBottomActive || isLeftOfBelowBlockActive
        ? "0"
        : `${borderRadiusValue}px`
    }`;

  let cornerClass = "";
  if (isGreenCornerBottomRight) {
    cornerClass = styles.greenCornerBottomRight;
  } else if (isGreenCornerTopLeft) {
    cornerClass = styles.greenCornerTopLeft;
  }

  let backgroundColor = "transparent";
  if (isActive) {
    backgroundColor = blockColor;
  }

  return (
    <div
      className={`${cornerClass} ${
        isActive ? styles.activeBlock : styles.block
      }`}
      onMouseEnter={() => onMouseEnter(index)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius,
        backgroundColor,
      }} // Apply backgroundColor here
    ></div>
  );
};

const SettingsPanel = ({
  blockSize,
  setBlockSize,
  borderRadiusValue,
  setBorderRadiusValue,
  timeoutDuration,
  setTimeoutDuration,
  blockColor,
  setBlockColor,
  isMinimized,
}: any) => {
  return (
    <div
      className={`${styles.settingsPanel} ${
        isMinimized ? styles.minimized : ""
      }`}
    >
      {!isMinimized && (
        <div>
          <div>
            <label>Block Size: </label>
            <input
              type="range"
              min="50"
              max="300"
              value={blockSize}
              onChange={(e) => setBlockSize(Number(e.target.value))}
            />{" "}
            {blockSize} px
          </div>
          <div>
            <label>Border Radius: </label>
            <input
              type="range"
              min="10"
              max="50"
              value={borderRadiusValue}
              onChange={(e) => setBorderRadiusValue(Number(e.target.value))}
            />{" "}
            {borderRadiusValue} px
          </div>

          <div>
            <label>Timeout Duration: </label>
            <input
              type="range"
              min="100"
              max="4000"
              step="100"
              value={timeoutDuration}
              onChange={(e) => setTimeoutDuration(Number(e.target.value))}
            />{" "}
            {timeoutDuration} ms
          </div>
          <div>
            <label>Block Color: </label>
            <input
              type="color"
              value={blockColor}
              onChange={(e) => setBlockColor(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
