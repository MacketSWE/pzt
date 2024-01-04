// BlocksPage.tsx

import React, { useEffect, useState } from "react";
import styles from "./BlocksPage.module.css";
import { ColorSelect } from "../../../components/ColorSelect";
import { pztColors } from "../../../store/store";

export const BlocksPage = () => {
  const [dissolveStyle, setDissolveStyle] = useState("Random");
  const [brv, setBorderRadiusValue] = useState(20);
  const [timeoutDuration, setTimeoutDuration] = useState(700);
  const [activeBlocks, setActiveBlocks] = useState<Record<number, boolean>>({});
  const [blockColor, setBlockColor] = useState("#4285F4");
  const [isSettingsMinimized, setIsSettingsMinimized] = useState(false);
  const [blocksPerRow, setBlocksPerRow] = useState(20);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [isMouseVisible, setIsMouseVisible] = useState(true);
  const [isPaintMode, setIsPaintMode] = useState(false);
  const [randomSpeed, setRandomSpeed] = useState(1000);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const toggleSettingsMinimize = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === "s") {
      setIsSettingsMinimized((prev) => !prev);
    }
  };

  const handleMouseDown = () => {
    if (isPaintMode) {
      setIsMouseDown(true);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = (index: number) => {
    if (isPaintMode && isMouseDown) {
      setActiveBlocks((prev) => ({ ...prev, [index]: true }));
    }
    if (!isPaintMode) {
      setActiveBlocks((prev) => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setActiveBlocks((prev) => ({ ...prev, [index]: false }));
      }, timeoutDuration);
    }
  };

  const randomiseBlocks = () => {
    const newActiveBlocks: Record<number, boolean> = {};
    blocksArray.forEach((_, index) => {
      newActiveBlocks[index] = true;
    });
    setActiveBlocks(newActiveBlocks);
    setIsSettingsMinimized(true);
    setIsPaintMode(true);

    Object.keys(newActiveBlocks).forEach((key) => {
      const index = parseInt(key);
      let delay;

      if (dissolveStyle === "Random") {
        delay = 200 + Math.random() * randomSpeed;
      } else if (dissolveStyle === "Top-Down") {
        const rowIndex = Math.floor(index / blocksPerRow) + 1;
        delay = rowIndex * (100 + Math.random() * 50) + 200;
        console.log(rowIndex, delay);
      } else if (dissolveStyle === "Down-Top") {
        const totalRows = Math.ceil(blocksArray.length / blocksPerRow);
        const rowIndex = totalRows - Math.floor(index / blocksPerRow);
        delay = rowIndex * (100 + Math.random() * 50);
      }

      setTimeout(() => {
        setActiveBlocks((prev) => ({ ...prev, [index]: false }));
      }, delay);
    });

    // Reset blocks after the longest possible delay
    const maxDelay = 3000 + randomSpeed; // Adjust this based on your dissolve style timing
    setTimeout(() => {
      setIsPaintMode(false);
      setIsSettingsMinimized(false);
    }, maxDelay);
  };

  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isPaintMode) {
      const activeBlockIndices = Object.keys(activeBlocks)
        .filter((key: any) => activeBlocks[key])
        .map((key) => parseInt(key));

      let longestTimeoutDuration = 0;

      // Shuffle the indices array
      activeBlockIndices.sort(() => Math.random() - 0.5);

      // Disappear blocks with random timing and track the longest duration
      activeBlockIndices.forEach((index) => {
        const timeoutDuration = 200 + Math.random() * 500;
        longestTimeoutDuration = Math.max(
          longestTimeoutDuration,
          timeoutDuration
        );

        setTimeout(() => {
          setActiveBlocks((prev) => ({ ...prev, [index.toString()]: false }));
        }, timeoutDuration);
      });

      // Restore blocks after the last one has disappeared plus 3 seconds
      setTimeout(() => {
        activeBlockIndices.forEach((index) => {
          setActiveBlocks((prev) => ({ ...prev, [index.toString()]: true }));
        });
      }, longestTimeoutDuration + 1500);
    } else if (isPaintMode && (event.key === "C" || event.key === "c")) {
      // Clear all blocks immediately without animation
      const clearedBlocks = Object.keys(activeBlocks).reduce(
        (acc, key: any) => {
          acc[key] = false;
          return acc;
        },
        {} as Record<number, boolean>
      );

      setActiveBlocks(clearedBlocks);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscPress);
    return () => {
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [activeBlocks, isPaintMode, randomSpeed]);

  useEffect(() => {
    window.addEventListener("keydown", toggleSettingsMinimize);
    return () => {
      window.removeEventListener("keydown", toggleSettingsMinimize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPaintMode]);

  let amount;
  switch (blocksPerRow) {
    case 20:
      amount = 300;
      break;
    case 15:
      amount = 200;
      break;
    case 10:
      amount = 100;
      break;
    case 5:
      amount = 50;
      break;
    default:
      amount = 1000;
  }
  const blocksArray = Array(amount).fill(null);

  const handleBlockClick = (index: number) => {
    if (isPaintMode) {
      setActiveBlocks((prev) => ({
        ...prev,
        [index]: !prev[index], // Toggle the block's active state
      }));
    }
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
        backgroundColor={backgroundColor}
        isMouseVisible={isMouseVisible}
        setIsMouseVisible={setIsMouseVisible}
        isPaintMode={isPaintMode}
        setIsPaintMode={setIsPaintMode}
        onRandomiseClick={randomiseBlocks}
        dissolveStyle={dissolveStyle}
        setDissolveStyle={setDissolveStyle}
      />
      <div
        className={styles.container}
        style={{
          gridTemplateColumns: `repeat(${blocksPerRow}, 1fr)`,
          gridTemplateRows: `repeat(auto-fill, ${100 / blocksPerRow}vw)`,
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
            onMouseClick={handleBlockClick}
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
  onMouseClick: (index: number) => void;
  backgroundColor: string;
};

const Block = ({
  index,
  blocksPerRow,
  brv,
  blockColor,
  activeBlocks,
  onMouseEnter,
  onMouseClick,
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
      isTopBlockActive ||
      isLeftBlockActive ||
      isTopLeftCornerActive ||
      index === 0
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
      isLeftBlockActive ||
      isBottomBlockActive ||
      isBottomLeftCornerActive ||
      index === 0
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
      onClick={() => onMouseClick(index)}
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
  isPaintMode,
  setIsPaintMode,
  onRandomiseClick,
  backgroundColor,
  dissolveStyle,
  setDissolveStyle,
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
            <button onClick={onRandomiseClick}>Dissolve screen</button>
          </div>
          <div className={styles.settingItem}>
            <label>Dissolve Animation Style:</label>
            <div>
              <div>
                <input
                  type="radio"
                  value="Random"
                  name="dissolveStyle"
                  checked={dissolveStyle === "Random"}
                  onChange={() => setDissolveStyle("Random")}
                />{" "}
                Random
              </div>
              <div>
                <input
                  type="radio"
                  value="Top-Down"
                  name="dissolveStyle"
                  checked={dissolveStyle === "Top-Down"}
                  onChange={() => setDissolveStyle("Top-Down")}
                />{" "}
                Top-Down
              </div>
              <div>
                <input
                  type="radio"
                  value="Down-Top"
                  name="dissolveStyle"
                  checked={dissolveStyle === "Down-Top"}
                  onChange={() => setDissolveStyle("Down-Top")}
                />{" "}
                Down-Top
              </div>
            </div>
          </div>

          <div className={styles.settingItem}>
            <label>Draw: </label>
            <input
              type="checkbox"
              checked={isPaintMode}
              onChange={() => setIsPaintMode((prev: any) => !prev)}
            />
          </div>
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
            <div className={styles.buttons}>
              {pztColors.map((c) => {
                return (
                  <ColorSelect
                    color={c.color}
                    active={backgroundColor === c.color}
                    onClick={() => setBackgroundColor(c.color)}
                    text={c.name}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.settingItem}>
            <label>Block Color: </label>
            <div className={styles.buttons}>
              {pztColors.map((c) => {
                return (
                  <ColorSelect
                    color={c.color}
                    active={blockColor === c.color}
                    onClick={() => setBlockColor(c.color)}
                    text={c.name}
                  />
                );
              })}
            </div>
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
            <label>Block size: </label>
            <input
              type="range"
              min="5"
              max="30"
              step="5"
              value={blocksPerRow}
              onChange={(e) => setBlocksPerRow(Number(e.target.value))}
            />{" "}
            {35 - blocksPerRow}
          </div>
        </div>
      )}
      <div className={styles.miniText}>
        <div className={styles.minimizedText}>Toggle menu with "S" button</div>
        {isPaintMode && (
          <>
            <div className={styles.minimizedText}>
              Press "C" to clear screen
            </div>
            <div className={styles.minimizedText}>
              Press "Esc" to clear with animation + reset
            </div>
          </>
        )}
      </div>
    </div>
  );
};
