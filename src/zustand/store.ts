import { create } from "zustand";
import history from "../lib/history"

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
    const view = document.getElementById("view")
    if (!view || !param || param instanceof Array) return;

    const { saveEvent } = history({ storage: sessionStorage, uid: param, changeComp: view })

    const htmlText = view.innerHTML
      .replace('outline: rgba(43, 112, 240, 0.8) solid 3px; ', '')
      .replace('outline: rgba(43, 112, 240, 0.4) solid 3px; ', '')
      .replace('outline: rgba(43, 112, 240, 0.8) solid 3px;', '')
      .replace('outline: rgba(43, 112, 240, 0.4) solid 3px;', '');

    saveEvent(htmlText)
  }
}));
