import { create } from "zustand";

interface ISelectIdState {
  selectId: string | undefined;
  setSelectId: (select: string | undefined) => void;
}

export const useStore = create<ISelectIdState>((set) => ({
  selectId: undefined,
  setSelectId: (select) => {
    set((state) => ({ ...state, selectId: select }));
  },
}));
