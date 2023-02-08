import { create } from "zustand";

interface ISelectIdState {
  selectId: string | null;
  setSelectId: (select: string) => void;
}

export const useStore = create<ISelectIdState>((set) => ({
  selectId: null,
  setSelectId: (select) => {
    set((state) => ({ ...state, selectId: select }));
  },
}));
