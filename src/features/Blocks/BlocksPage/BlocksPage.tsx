// BlocksPage.tsx

import React, { useEffect, useState } from "react";
import styles from "./BlocksPage.module.css";
import { ColorSelect } from "../../../components/ColorSelect";
import { pztColors } from "../../../store/store";
import { useBlocksStore } from "./useBlocksStore";

export const BlocksPage = () => {
  const {
    dissolveStyle,
    isSettingsMinimized,
    setIsSettingsMinimized,
    drawOrErase,
    setDrawOrErase,
  } = useBlocksStore();

  const [brv, setBorderRadiusValue] = useState(20);
  const [timeoutDuration, setTimeoutDuration] = useState(700);
  const [activeBlocks, setActiveBlocks] = useState<Record<number, boolean>>({});
  const [blockColor, setBlockColor] = useState("#4285F4");
  const [blocksPerRow, setBlocksPerRow] = useState(20);
  const [isMouseVisible, setIsMouseVisible] = useState(true);
  const [isPaintMode, setIsPaintMode] = useState(false);
  const [randomSpeed, setRandomSpeed] = useState(1000);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

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
      setActiveBlocks((prev) => {
        const newBlocks = { ...prev };
        if (drawOrErase === "draw" && !prev[index]) {
          newBlocks[index] = true;
        } else if (drawOrErase === "erase" && prev[index]) {
          newBlocks[index] = false;
        }
        return newBlocks;
      });
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
      } else if (dissolveStyle === "Left-Right") {
        const columnIndex = (index % blocksPerRow) + 1;
        delay = columnIndex * (100 + Math.random() * 50) + 200;
      } else if (dissolveStyle === "Right-Left") {
        const totalColumns = blocksPerRow;
        const columnIndex = totalColumns - (index % blocksPerRow);
        delay = columnIndex * (100 + Math.random() * 50) + 200;
      }

      setTimeout(() => {
        setActiveBlocks((prev) => ({ ...prev, [index]: false }));
      }, delay);
    });
  };

  const handleButtonCommand = (event: KeyboardEvent) => {
    switch (event.key.toLowerCase()) {
      case "d":
        // Logic for "D" key command
        console.log("'D' button pressed");
        randomiseBlocks();
        break;
      case "1":
        // Logic for "D" key command
        console.log("'1' button pressed");
        setDrawOrErase("draw");
        break;
      case "2":
        // Logic for "D" key command
        console.log("'2' button pressed");
        setDrawOrErase("erase");
        break;

      case "f":
        // Activate all blocks and toggle paint mode
        const allActiveBlocks = blocksArray.reduce((acc, _, index) => {
          acc[index] = true;
          return acc;
        }, {});
        setActiveBlocks(allActiveBlocks);
        setIsPaintMode(true);
        console.log(
          "'F' button pressed, all blocks activated, paint mode toggled"
        );
        break;

      case "s":
        // Toggle settings panel
        setIsSettingsMinimized(!isSettingsMinimized);
        break;

      case "g":
        // Toggle settings panel
        setShowGrid((prev) => !prev);
        break;
      case "c":
        // Toggle settings panel
        if (isPaintMode) {
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

        break;

      case "escape":
        if (isPaintMode) {
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
              setActiveBlocks((prev) => ({
                ...prev,
                [index.toString()]: false,
              }));
            }, timeoutDuration);
          });

          // Restore blocks after the last one has disappeared plus 3 seconds
          setTimeout(() => {
            activeBlockIndices.forEach((index) => {
              setActiveBlocks((prev) => ({
                ...prev,
                [index.toString()]: true,
              }));
            });
          }, longestTimeoutDuration + 1500);
        }
        break;

      // Add additional key cases if needed

      default:
        // Handle any other keys or default case
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleButtonCommand);
    return () => {
      window.removeEventListener("keydown", handleButtonCommand);
    };
  }, [activeBlocks, isPaintMode, randomSpeed]);

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
        brv={brv}
        setBorderRadiusValue={setBorderRadiusValue}
        timeoutDuration={timeoutDuration}
        setTimeoutDuration={setTimeoutDuration}
        blockColor={blockColor}
        setBlockColor={setBlockColor}
        blocksPerRow={blocksPerRow}
        setBlocksPerRow={setBlocksPerRow}
        isMouseVisible={isMouseVisible}
        setIsMouseVisible={setIsMouseVisible}
        isPaintMode={isPaintMode}
        setIsPaintMode={setIsPaintMode}
        onRandomiseClick={randomiseBlocks}
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
            showGrid={showGrid}
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
  showGrid: boolean;
};

const Block = ({
  index,
  blocksPerRow,
  brv,
  blockColor,
  activeBlocks,
  onMouseEnter,
  onMouseClick,
  showGrid,
}: BlockProps) => {
  const { backgroundColor } = useBlocksStore();

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
      {showGrid && (
        <div
          style={{
            backgroundColor: "transparent",
            border:
              outerBackgroundColor === "#000000"
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid rgba(0, 0, 0, 0.2)",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        ></div>
      )}
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
  blocksPerRow,
  setBlocksPerRow,
  isMouseVisible,
  setIsMouseVisible,
  isPaintMode,
  setIsPaintMode,
  onRandomiseClick,
}: any) => {
  const {
    isSettingsMinimized: isMinimized,
    backgroundColor,
    setBackgroundColor,
    dissolveStyle,
    setDissolveStyle,
    setDrawOrErase,
    drawOrErase,
  } = useBlocksStore();

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
              <div>
                <input
                  type="radio"
                  value="Left-Right"
                  name="dissolveStyle"
                  checked={dissolveStyle === "Left-Right"}
                  onChange={() => setDissolveStyle("Left-Right")}
                />{" "}
                Left-Right
              </div>
              <div>
                <input
                  type="radio"
                  value="Right-Left"
                  name="dissolveStyle"
                  checked={dissolveStyle === "Right-Left"}
                  onChange={() => setDissolveStyle("Right-Left")}
                />{" "}
                Right-Left
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
          <div>
            <div className={styles.settingItem}>
              <label>Draw or Erase: </label>
              <div>
                <div>
                  <input
                    type="radio"
                    value="draw"
                    name="drawOrErase"
                    checked={drawOrErase === "draw"}
                    onChange={() => setDrawOrErase("draw")}
                  />{" "}
                  Draw
                </div>
                <div>
                  <input
                    type="radio"
                    value="erase"
                    name="drawOrErase"
                    checked={drawOrErase === "erase"}
                    onChange={() => setDrawOrErase("erase")}
                  />{" "}
                  Erase
                </div>
              </div>
            </div>
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
        <div className={styles.minimizedText}>Toggle grid with "G" button</div>
        <div className={styles.minimizedText}>Fill screen with "F" button</div>
        <div className={styles.minimizedText}>
          Dissolve screen with "D" button
        </div>
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
