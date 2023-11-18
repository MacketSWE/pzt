import { useState } from "react";
import styles from "./MarketingPage.module.css";
import { Menu } from "../Menu";
import { AnimationType, Zing } from "../Zing/Zing";

const getAnimation = (selected: string) => {
  switch (selected) {
    case "Center":
      return AnimationType.ZING;
    case "Swirl":
      return AnimationType.SWIRL;
    case "Pulse":
      return AnimationType.PULSE;
    case "Vortex":
      return AnimationType.VORTEX;
    case "Magnet":
      return AnimationType.MAGNET;
    default:
      return AnimationType.ZING;
  }
};

export function MarketingPage() {
  const [selected, setSelected] = useState("Center");

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <Logo />
        <Menu selected={selected} setSelected={setSelected} />
        <Zing animation={getAnimation(selected)} />
      </div>
    </div>
  );
}

export const Logo = () => (
  <svg
    width="183"
    height="72"
    viewBox="0 0 183 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="183" height="71" transform="translate(0 0.5)" fill="black" />
    <path
      d="M25.6 47.5V25.9H34.525C34.735 25.9 35.005 25.91 35.335 25.93C35.665 25.94 35.97 25.97 36.25 26.02C37.5 26.21 38.53 26.625 39.34 27.265C40.16 27.905 40.765 28.715 41.155 29.695C41.555 30.665 41.755 31.745 41.755 32.935C41.755 34.115 41.555 35.195 41.155 36.175C40.755 37.145 40.145 37.95 39.325 38.59C38.515 39.23 37.49 39.645 36.25 39.835C35.97 39.875 35.66 39.905 35.32 39.925C34.99 39.945 34.725 39.955 34.525 39.955H29.215V47.5H25.6ZM29.215 36.58H34.375C34.575 36.58 34.8 36.57 35.05 36.55C35.3 36.53 35.53 36.49 35.74 36.43C36.34 36.28 36.81 36.015 37.15 35.635C37.5 35.255 37.745 34.825 37.885 34.345C38.035 33.865 38.11 33.395 38.11 32.935C38.11 32.475 38.035 32.005 37.885 31.525C37.745 31.035 37.5 30.6 37.15 30.22C36.81 29.84 36.34 29.575 35.74 29.425C35.53 29.365 35.3 29.33 35.05 29.32C34.8 29.3 34.575 29.29 34.375 29.29H29.215V36.58ZM44.7602 47.5V31.3H47.9552V35.245L47.5652 34.735C47.7652 34.195 48.0302 33.705 48.3602 33.265C48.7002 32.815 49.1052 32.445 49.5752 32.155C49.9752 31.885 50.4152 31.675 50.8952 31.525C51.3852 31.365 51.8852 31.27 52.3952 31.24C52.9052 31.2 53.4002 31.22 53.8802 31.3V34.675C53.4002 34.535 52.8452 34.49 52.2152 34.54C51.5952 34.59 51.0352 34.765 50.5352 35.065C50.0352 35.335 49.6252 35.68 49.3052 36.1C48.9952 36.52 48.7652 37 48.6152 37.54C48.4652 38.07 48.3902 38.645 48.3902 39.265V47.5H44.7602ZM57.0426 28.84V25.525H60.6576V28.84H57.0426ZM57.0426 47.5V31.3H60.6576V47.5H57.0426ZM76.3558 47.5V39.7C76.3558 39.19 76.3208 38.625 76.2508 38.005C76.1808 37.385 76.0158 36.79 75.7558 36.22C75.5058 35.64 75.1258 35.165 74.6158 34.795C74.1158 34.425 73.4358 34.24 72.5758 34.24C72.1158 34.24 71.6608 34.315 71.2108 34.465C70.7608 34.615 70.3508 34.875 69.9808 35.245C69.6208 35.605 69.3308 36.105 69.1108 36.745C68.8908 37.375 68.7808 38.185 68.7808 39.175L66.6358 38.26C66.6358 36.88 66.9008 35.63 67.4308 34.51C67.9708 33.39 68.7608 32.5 69.8008 31.84C70.8408 31.17 72.1208 30.835 73.6408 30.835C74.8408 30.835 75.8308 31.035 76.6108 31.435C77.3908 31.835 78.0108 32.345 78.4708 32.965C78.9308 33.585 79.2708 34.245 79.4908 34.945C79.7108 35.645 79.8508 36.31 79.9108 36.94C79.9808 37.56 80.0158 38.065 80.0158 38.455V47.5H76.3558ZM65.1208 47.5V31.3H68.3458V36.325H68.7808V47.5H65.1208ZM82.4301 47.5V47.005L91.0101 34.465H83.3001V31.3H96.6351V31.81L88.0851 44.335H96.2751V47.5H82.4301ZM107.081 47.95C105.881 47.95 104.746 47.775 103.676 47.425C102.616 47.065 101.731 46.5 101.021 45.73C100.451 45.1 100.031 44.415 99.7612 43.675C99.5012 42.925 99.3562 42.125 99.3262 41.275C99.3262 40.445 99.4462 39.64 99.6862 38.86C99.9362 38.08 100.316 37.39 100.826 36.79C101.026 36.55 101.241 36.34 101.471 36.16C101.711 35.97 101.951 35.8 102.191 35.65C101.601 34.99 101.151 34.35 100.841 33.73C100.541 33.11 100.391 32.38 100.391 31.54C100.391 30.28 100.731 29.15 101.411 28.15C102.091 27.15 103.016 26.43 104.186 25.99C104.696 25.8 105.211 25.67 105.731 25.6C106.261 25.53 106.776 25.495 107.276 25.495C108.216 25.495 109.121 25.64 109.991 25.93C110.861 26.21 111.601 26.67 112.211 27.31C112.601 27.68 112.926 28.1 113.186 28.57C113.446 29.03 113.641 29.505 113.771 29.995L110.201 30.76C110.061 30.31 109.816 29.925 109.466 29.605C109.166 29.315 108.811 29.125 108.401 29.035C107.991 28.935 107.586 28.885 107.186 28.885C106.546 28.885 105.981 29 105.491 29.23C105.001 29.46 104.636 29.77 104.396 30.16C104.166 30.55 104.051 31.025 104.051 31.585C104.051 32.085 104.141 32.485 104.321 32.785C104.511 33.085 104.741 33.39 105.011 33.7C105.191 33.9 105.411 34.12 105.671 34.36C105.931 34.6 106.201 34.85 106.481 35.11L111.911 40.135C111.921 39.935 111.926 39.72 111.926 39.49C111.926 39.25 111.926 39.025 111.926 38.815V36.175H115.106V40.09C115.106 40.63 115.091 41.155 115.061 41.665C115.031 42.165 114.971 42.58 114.881 42.91L117.566 45.37L115.241 47.845L113.156 45.865C112.646 46.345 112.086 46.735 111.476 47.035C110.866 47.335 110.251 47.55 109.631 47.68C109.181 47.79 108.751 47.86 108.341 47.89C107.931 47.93 107.511 47.95 107.081 47.95ZM107.231 44.515C107.541 44.515 107.831 44.5 108.101 44.47C108.381 44.44 108.651 44.38 108.911 44.29C109.281 44.18 109.596 44.05 109.856 43.9C110.126 43.75 110.361 43.595 110.561 43.435L104.846 38.185C104.576 38.285 104.331 38.415 104.111 38.575C103.901 38.725 103.721 38.895 103.571 39.085C103.381 39.335 103.231 39.63 103.121 39.97C103.021 40.3 102.971 40.665 102.971 41.065C102.981 41.525 103.056 41.935 103.196 42.295C103.336 42.645 103.521 42.96 103.751 43.24C104.111 43.7 104.626 44.03 105.296 44.23C105.966 44.42 106.611 44.515 107.231 44.515ZM129.13 47.95C126.97 47.95 125.12 47.48 123.58 46.54C122.04 45.59 120.855 44.27 120.025 42.58C119.205 40.89 118.795 38.93 118.795 36.7C118.795 34.47 119.205 32.51 120.025 30.82C120.855 29.13 122.04 27.815 123.58 26.875C125.12 25.925 126.97 25.45 129.13 25.45C131.62 25.45 133.695 26.075 135.355 27.325C137.015 28.565 138.18 30.24 138.85 32.35L135.205 33.355C134.785 31.945 134.07 30.845 133.06 30.055C132.05 29.255 130.74 28.855 129.13 28.855C127.68 28.855 126.47 29.18 125.5 29.83C124.54 30.48 123.815 31.395 123.325 32.575C122.845 33.745 122.6 35.12 122.59 36.7C122.59 38.28 122.83 39.66 123.31 40.84C123.8 42.01 124.53 42.92 125.5 43.57C126.47 44.22 127.68 44.545 129.13 44.545C130.74 44.545 132.05 44.145 133.06 43.345C134.07 42.545 134.785 41.445 135.205 40.045L138.85 41.05C138.18 43.16 137.015 44.84 135.355 46.09C133.695 47.33 131.62 47.95 129.13 47.95ZM149.298 47.95C147.678 47.95 146.263 47.585 145.053 46.855C143.843 46.125 142.903 45.12 142.233 43.84C141.573 42.55 141.243 41.07 141.243 39.4C141.243 37.7 141.583 36.21 142.263 34.93C142.943 33.65 143.888 32.65 145.098 31.93C146.308 31.21 147.708 30.85 149.298 30.85C150.928 30.85 152.348 31.215 153.558 31.945C154.768 32.675 155.708 33.685 156.378 34.975C157.048 36.255 157.383 37.73 157.383 39.4C157.383 41.08 157.043 42.565 156.363 43.855C155.693 45.135 154.753 46.14 153.543 46.87C152.333 47.59 150.918 47.95 149.298 47.95ZM149.298 44.56C150.738 44.56 151.808 44.08 152.508 43.12C153.208 42.16 153.558 40.92 153.558 39.4C153.558 37.83 153.203 36.58 152.493 35.65C151.783 34.71 150.718 34.24 149.298 34.24C148.328 34.24 147.528 34.46 146.898 34.9C146.278 35.33 145.818 35.935 145.518 36.715C145.218 37.485 145.068 38.38 145.068 39.4C145.068 40.97 145.423 42.225 146.133 43.165C146.853 44.095 147.908 44.56 149.298 44.56Z"
      fill="white"
    />
  </svg>
);

export type Color = "#F2BF42" | "#D65342" | "#58A65C" | "#4285F4" | "#FFFFFF";