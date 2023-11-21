import React, { useEffect, useState } from "react";
import styles from "./BlocksPage.module.css";

export const BlocksPage = () => {
  const [brv, setBorderRadiusValue] = useState(20);
  const [timeoutDuration, setTimeoutDuration] = useState(700);
  const [activeBlocks, setActiveBlocks] = useState<Record<number, boolean>>({});
  const [blockColor, setBlockColor] = useState("#d7f3f5");
  const [isSettingsMinimized, setIsSettingsMinimized] = useState(false);
  const [blocksPerRow, setBlocksPerRow] = useState(20);
  const [backgroundColor, setBackgroundColor] = useState("#111314");
  const [isMouseVisible, setIsMouseVisible] = useState(true);

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

  const blocksArray = Array(2000).fill(null);

  const handleMouseEnter = (index: number) => {
    setActiveBlocks((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setActiveBlocks((prev) => ({ ...prev, [index]: false }));
    }, timeoutDuration);
  };

  return (
    <div
      style={{
        cursor: isMouseVisible ? "auto" : "none", // Set cursor style based on isMouseVisible state
      }}
    >
      <SettingsPanel
        setBackgroundColor={setBackgroundColor}
        brv={brv}
        setBorderRadiusValue={setBorderRadiusValue}
        timeoutDuration={timeoutDuration}
        setTimeoutDuration={setTimeoutDuration}
        blockColor={blockColor}
        setBlockColor={setBlockColor}
        isMinimized={isSettingsMinimized}
        blocksPerRow={blocksPerRow}
        setBlocksPerRow={setBlocksPerRow}
        isMouseVisible={isMouseVisible}
        setIsMouseVisible={setIsMouseVisible}
      />
      <div
        className={styles.container}
        style={{
          gridTemplateColumns: `repeat(${blocksPerRow}, 1fr)`,
        }}
      >
        {blocksArray.map((_, index) => (
          <Block
            key={index}
            index={index}
            brv={brv}
            blockColor={blockColor}
            blocksPerRow={blocksPerRow}
            activeBlocks={activeBlocks}
            onMouseEnter={handleMouseEnter}
            backgroundColor={backgroundColor}
          />
        ))}
      </div>
    </div>
  );
};

type BlockProps = {
  index: number;
  blocksPerRow: number;
  brv: number;
  blockColor: string;
  activeBlocks: Record<number, boolean>;
  onMouseEnter: (index: number) => void;
  backgroundColor: string;
};

const Block = ({
  index,
  blocksPerRow,
  brv,
  blockColor,
  activeBlocks,
  onMouseEnter,
  backgroundColor,
}: BlockProps) => {
  const isActive = activeBlocks[index];
  const isRightBlockActive = activeBlocks[index + 1];
  const isLeftBlockActive = activeBlocks[index - 1];
  const isTopBlockActive = activeBlocks[index - blocksPerRow];
  const isBottomBlockActive = activeBlocks[index + blocksPerRow];

  const isTopLeftCornerActive = activeBlocks[index - blocksPerRow - 1];
  const isTopRightCornerActive = activeBlocks[index - blocksPerRow + 1];
  const isBottomLeftCornerActive = activeBlocks[index + blocksPerRow - 1];
  const isBottomRightCornerActive = activeBlocks[index + blocksPerRow + 1];

  const isFullHero =
    !isActive &&
    isTopBlockActive &&
    isBottomBlockActive &&
    isLeftBlockActive &&
    isRightBlockActive;

  const isTopLeftHero = !isActive && isTopBlockActive && isLeftBlockActive;

  const isTopRightHero = !isActive && isTopBlockActive && isRightBlockActive;

  const isBottomLeftHero =
    !isActive && isBottomBlockActive && isLeftBlockActive;

  const isBottomRightHero =
    !isActive && isBottomBlockActive && isRightBlockActive;

  let innerBackgroundColor;
  let outerBackgroundColor;
  let borderRadius;

  if (isFullHero) {
    innerBackgroundColor = backgroundColor;
    outerBackgroundColor = blockColor;
    borderRadius = `${brv}px`;
  } else if (
    isTopLeftHero ||
    isTopRightHero ||
    isBottomLeftHero ||
    isBottomRightHero
  ) {
    innerBackgroundColor = backgroundColor;
    outerBackgroundColor = blockColor;
    borderRadius = `${isTopLeftHero ? brv : 0}px ${
      isTopRightHero ? brv : 0
    }px ${isBottomRightHero ? brv : 0}px ${isBottomLeftHero ? brv : 0}px`;
  } else if (isActive) {
    innerBackgroundColor = blockColor;
    outerBackgroundColor = backgroundColor;
    borderRadius = `${
      isTopBlockActive || isLeftBlockActive || isTopLeftCornerActive
        ? "0"
        : `${brv}px`
    } ${
      isRightBlockActive || isTopBlockActive || isTopRightCornerActive
        ? "0"
        : `${brv}px`
    } ${
      isBottomBlockActive || isRightBlockActive || isBottomRightCornerActive
        ? "0"
        : `${brv}px`
    } ${
      isLeftBlockActive || isBottomBlockActive || isBottomLeftCornerActive
        ? "0"
        : `${brv}px`
    }`;
  } else {
    innerBackgroundColor = backgroundColor;
    outerBackgroundColor = backgroundColor;
    borderRadius = "0";
  }

  return (
    <div
      className={styles.block}
      onMouseEnter={() => onMouseEnter(index)}
      style={{
        backgroundColor: outerBackgroundColor,
      }}
    >
      <div
        style={{
          backgroundColor: innerBackgroundColor,
          width: "100%",
          height: "100%",
          borderRadius: borderRadius,
        }}
      ></div>
    </div>
  );
};

const SettingsPanel = ({
  brv,
  setBorderRadiusValue,
  timeoutDuration,
  setTimeoutDuration,
  blockColor,
  setBlockColor,
  isMinimized,
  setBackgroundColor,
  blocksPerRow,
  setBlocksPerRow,
  isMouseVisible,
  setIsMouseVisible,
}: any) => {
  return (
    <div
      className={`${styles.settingsPanel} ${
        isMinimized ? styles.minimized : ""
      }`}
    >
      {!isMinimized && (
        <div className={styles.settingsContent}>
          <div className={styles.settingItem}>
            <label>Show Mouse Pointer: </label>
            <input
              type="checkbox"
              checked={isMouseVisible}
              onChange={() => setIsMouseVisible((prev: any) => !prev)}
            />
          </div>
          <div className={styles.settingItem}>
            <label>Background Color: </label>
            <input
              type="color"
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
          <div className={styles.settingItem}>
            <label>Block Color: </label>
            <input
              type="color"
              value={blockColor}
              onChange={(e) => setBlockColor(e.target.value)}
            />
          </div>
          <div className={styles.settingItem}>
            <label>Border Radius: </label>
            <input
              type="range"
              min="10"
              max="50"
              value={brv}
              onChange={(e) => setBorderRadiusValue(Number(e.target.value))}
            />{" "}
            {brv} px
          </div>
          <div className={styles.settingItem}>
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

          <div className={styles.settingItem}>
            <label>Blocks per Row: </label>
            <input
              type="range"
              min="5"
              max="30"
              step="5"
              value={blocksPerRow}
              onChange={(e) => setBlocksPerRow(Number(e.target.value))}
            />{" "}
            {blocksPerRow}
          </div>
        </div>
      )}
    </div>
  );
};
