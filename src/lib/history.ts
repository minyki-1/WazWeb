interface IHistValue {
  storage?: Storage;
  histName?: string;
  undoName?: string;
  uid: string;
}

type TStorage = [string[] | null, (value: string[]) => void]

const storageManager = (name: string, uid: string, storage: Storage): TStorage => {
  const storageValue: string[] | null = JSON.parse(storage.getItem(name + uid) || JSON.stringify(null))
  const setStorage = (value: string[]) => storage.setItem(name + uid, JSON.stringify(value))
  return [storageValue, setStorage]
}

export const undoHistory = (
  { storage = sessionStorage,
    histName = "hist_",
    undoName = "undo_",
    uid,
    changeComp
  }: IHistValue & { changeComp: HTMLElement | null }) => {
  const [hist, setHist] = storageManager(histName, uid, storage)
  const [undo, setUndo] = storageManager(undoName, uid, storage)
  if (!changeComp || !hist || hist.length < 2) return;
  changeComp.firstChild?.remove()
  changeComp.innerHTML = hist[1]
  if (!undo) setUndo([hist[0]])
  else setUndo([hist[0], ...undo])
  hist.shift()
  setHist(hist)
}

export const redoHistory = (
  { storage = sessionStorage,
    histName = "hist_",
    undoName = "undo_",
    uid,
    changeComp
  }: IHistValue & { changeComp: HTMLElement | null }) => {

  const [hist, setHist] = storageManager(histName, uid, storage)
  const [undo, setUndo] = storageManager(undoName, uid, storage)
  if (!changeComp || !hist || !undo || undo.length < 1) return;
  changeComp.firstChild?.remove()
  changeComp.innerHTML = undo[0]
  setHist([undo[0], ...hist])
  undo.shift()
  setUndo(undo)
}

export const saveHistory = (
  { value,
    storage = sessionStorage,
    histName = "hist_",
    uid
  }: IHistValue & { value: string }) => {

  const [hist, setHist] = storageManager(histName, uid, storage)
  if (hist && value !== hist[0]) setHist([value, ...hist]);
  else if (!hist) setHist([value]);
}
