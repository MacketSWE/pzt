// BlocksPage.tsx
import React, { useState, useEffect } from "react";
import styles from "./BlocksPage.module.css";

export const BlocksPage = () => {
  const [blockSize, setBlockSize] = useState(100);
  const [numOfBlocks, setNumOfBlocks] = useState(200);
  const [timeoutDuration, setTimeoutDuration] = useState(2000);
  const [activeBlocks, setActiveBlocks] = useState<Record<number, boolean>>({});

  const blocksArray = Array(numOfBlocks).fill(null);

  const handleMouseEnter = (index: number) => {
    setActiveBlocks((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setActiveBlocks((prev) => ({ ...prev, [index]: false }));
    }, timeoutDuration);
  };

  return (
    <div>
      <div>
        <label>Block Size: </label>
        <input
          type="number"
          value={blockSize}
          onChange={(e) => setBlockSize(Number(e.target.value))}
        />{" "}
        px
      </div>
      <div>
        <label>Number of Blocks: </label>
        <input
          type="number"
          value={numOfBlocks}
          onChange={(e) => setNumOfBlocks(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Timeout Duration: </label>
        <input
          type="number"
          value={timeoutDuration}
          onChange={(e) => setTimeoutDuration(Number(e.target.value))}
        />{" "}
        ms
      </div>

      <div className={styles.container}>
        {blocksArray.map((_, index) => (
          <Block
            key={index}
            index={index}
            size={blockSize}
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
  activeBlocks: Record<number, boolean>;
  onMouseEnter: (index: number) => void;
};

const Block = ({
  index,
  size,
  numOfBlocks,
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

  const borderRadius =
    `${isTopActive || isLeftActive ? "0" : "10px"} ${
      isRightActive || isTopActive ? "0" : "10px"
    } ` +
    `${isBottomActive || isRightActive ? "0" : "10px"} ${
      isLeftActive || isBottomActive ? "0" : "10px"
    }`;

  return (
    <div
      className={isActive ? styles.activeBlock : styles.block}
      onMouseEnter={() => onMouseEnter(index)}
      style={{ width: `${size}px`, height: `${size}px`, borderRadius }}
    ></div>
  );
};
