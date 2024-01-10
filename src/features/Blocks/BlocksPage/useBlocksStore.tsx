import { create } from "zustand";

type State = {
  backgroundColor: string;
  dissolveStyle: string;
  isSettingsMinimized: boolean;
  drawOrErase: "draw" | "erase" | "both";
  setDrawOrErase: (mode: "draw" | "erase" | "both") => void;
  setIsSettingsMinimized: (isMinimized: any) => void;
  setDissolveStyle: (style: string) => void;
  setBackgroundColor: (color: string) => void;
};

export const useBlocksStore = create<State>((set) => ({
  dissolveStyle: "Random",
  drawOrErase: "draw",
  backgroundColor: "#FFFFFF",
  isSettingsMinimized: false,
  setDrawOrErase: (mode) => set(() => ({ drawOrErase: mode })),
  setIsSettingsMinimized: (isMinimized) =>
    set(() => ({ isSettingsMinimized: isMinimized })),
  setDissolveStyle: (style) => set(() => ({ dissolveStyle: style })),
  setBackgroundColor: (color) => set(() => ({ backgroundColor: color })),
}));
