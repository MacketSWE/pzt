// BlocksPage.tsx
import React, { useEffect, useState } from "react";
import styles from "./BlocksPage.module.css";

export const BlocksPage = () => {
  const [blockSize, setBlockSize] = useState(100); // Default size set to 100
  const [numOfBlocks, setNumOfBlocks] = useState(200); // Default number of blocks set to 200
  const blocksArray = Array(numOfBlocks).fill(null);

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
      <div className={styles.container}>
        {blocksArray.map((_, index) => (
          <Block key={index} size={blockSize} />
        ))}
      </div>
    </div>
  );
};

const Block = ({ size }: { size: number }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isActive) {
      timeout = setTimeout(() => {
        setIsActive(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isActive]);

  return (
    <div
      className={isActive ? styles.activeBlock : styles.block}
      onMouseEnter={() => setIsActive(true)}
      style={{ width: `${size}px`, height: `${size}px` }}
    ></div>
  );
};
