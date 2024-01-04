import create from "zustand";

type pColor = "Yellow" | "Red" | "Green" | "Blue" | "White" | "Black";

interface pztColor {
  name: pColor;
  color: string;
}

export const pztColors: pztColor[] = [
  { name: "Black", color: "#000000" },
  { name: "Yellow", color: "#F2BF42" },
  { name: "Red", color: "#D65342" },
  { name: "Green", color: "#58A65C" },
  { name: "Blue", color: "#4285F4" },
  { name: "White", color: "#FFFFFF" },
];

interface StoreState {
  color: pztColor;
  setColor: (color: pztColor) => void;
}

export const useAppStore = create<StoreState>((set, get) => ({
  color: pztColors[0],
  setColor: (color: pztColor) => set({ color }),
}));
