import { create } from "zustand";

interface IselectCompState {
  selectComp: HTMLElement | undefined;
  setSelectComp: (select: HTMLElement | undefined) => void;
}

export const useStore = create<IselectCompState>((set) => ({
  selectComp: undefined,
  setSelectComp: (select) => {
    set((state) => ({ ...state, selectComp: select }));
  },
}));
