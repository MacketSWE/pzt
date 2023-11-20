import React, { useEffect, useState } from "react";
import styles from "./BlocksPage.module.css";

export const BlocksPage = () => {
  const [borderRadiusValue, setBorderRadiusValue] = useState(20);
  const [timeoutDuration, setTimeoutDuration] = useState(300);
  const [activeBlocks, setActiveBlocks] = useState<Record<number, boolean>>({});
  const [blockColor, setBlockColor] = useState("#d7f3f5");
  const [isSettingsMinimized, setIsSettingsMinimized] = useState(false);
  const [blocksPerRow, setBlocksPerRow] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState("#111314");

  const toggleBackgroundColor = () => {
    setBackgroundColor((prevColor) => {
      if (prevColor === "#111314") {
        return "#ffffff";
      } else {
        return "#111314";
      }
    });
  };
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

  const blocksArray = Array(1000).fill(null);

  const handleMouseEnter = (index: number) => {
    setActiveBlocks((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setActiveBlocks((prev) => ({ ...prev, [index]: false }));
    }, timeoutDuration);
  };

  return (
    <div>
      <SettingsPanel
        toggleBackgroundColor={toggleBackgroundColor}
        borderRadiusValue={borderRadiusValue}
        setBorderRadiusValue={setBorderRadiusValue}
        timeoutDuration={timeoutDuration}
        setTimeoutDuration={setTimeoutDuration}
        blockColor={blockColor}
        setBlockColor={setBlockColor}
        isMinimized={isSettingsMinimized}
        blocksPerRow={blocksPerRow}
        setBlocksPerRow={setBlocksPerRow}
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
            borderRadiusValue={borderRadiusValue}
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
  borderRadiusValue: number;
  blockColor: string;
  activeBlocks: Record<number, boolean>;
  onMouseEnter: (index: number) => void;
  backgroundColor: string;
};

const Block = ({
  index,
  blocksPerRow,
  borderRadiusValue,
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

  let borderRadius;
  if (isActive) {
    borderRadius = `${
      isTopBlockActive || isLeftBlockActive ? "0" : `${borderRadiusValue}px`
    } ${
      isRightBlockActive || isTopBlockActive ? "0" : `${borderRadiusValue}px`
    } ${
      isBottomBlockActive || isRightBlockActive ? "0" : `${borderRadiusValue}px`
    } ${
      isLeftBlockActive || isBottomBlockActive ? "0" : `${borderRadiusValue}px`
    }`;
  } else {
    borderRadius = "0"; // If inactive, border-radius is 0
  }

  return (
    <div
      className={styles.block}
      onMouseEnter={() => onMouseEnter(index)}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div
        style={{
          backgroundColor: isActive ? blockColor : backgroundColor,
          width: "100%",
          height: "100%",
          borderRadius: borderRadius,
        }}
      ></div>
    </div>
  );
};

const SettingsPanel = ({
  borderRadiusValue,
  setBorderRadiusValue,
  timeoutDuration,
  setTimeoutDuration,
  blockColor,
  setBlockColor,
  isMinimized,
  toggleBackgroundColor,
  blocksPerRow,
  setBlocksPerRow,
}: any) => {
  return (
    <div
      className={`${styles.settingsPanel} ${
        isMinimized ? styles.minimized : ""
      }`}
    >
      {!isMinimized && (
        <div className={styles.settingsContent}>
          <button onClick={toggleBackgroundColor}>Toggle Background</button>
          <div className={styles.settingItem}>
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
            <label>Block Color: </label>
            <input
              type="color"
              value={blockColor}
              onChange={(e) => setBlockColor(e.target.value)}
            />
          </div>
          <div className={styles.settingItem}>
            <label>Blocks per Row: </label>
            <input
              type="number"
              value={blocksPerRow}
              onChange={(e) => setBlocksPerRow(Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
};
