import { create } from "zustand";

type State = {
  backgroundColor: string;
  dissolveStyle: string;
  isSettingsMinimized: boolean;
  setIsSettingsMinimized: (isMinimized: any) => void;
  setDissolveStyle: (style: string) => void;
  setBackgroundColor: (color: string) => void;
};

export const useBlocksStore = create<State>((set) => ({
  dissolveStyle: "Random",
  backgroundColor: "#FFFFFF",
  isSettingsMinimized: false,
  setIsSettingsMinimized: (isMinimized) =>
    set(() => ({ isSettingsMinimized: isMinimized })),
  setDissolveStyle: (style) => set(() => ({ dissolveStyle: style })),
  setBackgroundColor: (color) => set(() => ({ backgroundColor: color })),
}));
