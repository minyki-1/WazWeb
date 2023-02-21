import { create } from "zustand";
import { saveHistory } from "../lib/history"
import { IDesgin } from "../types/design";

interface IselectCompState {
  selectComp: HTMLElement | undefined;
  setSelectComp: (select: HTMLElement | undefined) => void;
}

export const useStore = create<IselectCompState>((set) => ({
  selectComp: undefined,
  setSelectComp: (select) => {
    set((state) => ({ ...state, selectComp: select }));
  }
}));
