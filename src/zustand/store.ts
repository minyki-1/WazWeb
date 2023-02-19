import { create } from "zustand";

interface IselectCompState {
  selectComp: HTMLElement | undefined;
  setSelectComp: (select: HTMLElement | undefined) => void;
  saveHTML: (params: string | string[] | undefined) => void;
}

export const useStore = create<IselectCompState>((set) => ({
  selectComp: undefined,
  setSelectComp: (select) => {
    set((state) => ({ ...state, selectComp: select }));
  },
  saveHTML: (param) => {
    const histStorage: string[] | null = JSON.parse(localStorage.getItem("hist_" + param) || JSON.stringify(null))
    const view = document.getElementById("view")
    if (!view || !param || param instanceof Array) return;

    const htmlText = view.innerHTML
      .replace('outline: rgba(43, 112, 240, 0.8) solid 3px; ', '')
      .replace('outline: rgba(43, 112, 240, 0.4) solid 3px; ', '')
      .replace('outline: rgba(43, 112, 240, 0.8) solid 3px;', '')
      .replace('outline: rgba(43, 112, 240, 0.4) solid 3px;', '');
    if (histStorage && htmlText !== histStorage[0]) localStorage.setItem("hist_" + param, JSON.stringify([htmlText, ...histStorage]));
    else if (!histStorage) localStorage.setItem("hist_" + param, JSON.stringify([htmlText]));
    localStorage.setItem("undo_" + param, JSON.stringify([]));
  }
}));
