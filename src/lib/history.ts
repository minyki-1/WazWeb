interface IHistValue {
  storage?: Storage;
  histName?: string;
  undoName?: string;
  uid: string;
  changeComp: HTMLElement | null;
}

type TStorage = [string[] | null, (value: string[]) => void]

const storageManager = (name: string, uid: string, storage: Storage): TStorage => {
  const storageValue: string[] | null = JSON.parse(storage.getItem(name + uid) || JSON.stringify(null))
  const setStorage = (value: string[]) => storage.setItem(name + uid, JSON.stringify(value))
  return [storageValue, setStorage]
}

const history = ({ storage = sessionStorage, histName = "hist_", undoName = "undo_", uid, changeComp }: IHistValue) => {
  const [hist, setHist] = storageManager(histName, uid, storage)
  const [undo, setUndo] = storageManager(undoName, uid, storage)

  const undoEvent = () => {
    if (!changeComp || !hist || !undo || hist.length < 2) return;
    changeComp.firstChild?.remove()
    changeComp.innerHTML = hist[1]
    setUndo([hist[0], ...undo])
    hist.shift()
    setHist(hist)
  }

  const redoEvent = () => {
    if (!changeComp || !hist || !undo || undo.length < 1) return;
    changeComp.firstChild?.remove()
    changeComp.innerHTML = undo[0]
    setHist([undo[0], ...hist])
    undo.shift()
    setUndo(undo)
  }

  const saveEvent = (value: string) => {
    if (hist && value !== hist[0]) setHist([value, ...hist]);
    else if (!hist) setHist([value]);
    setUndo([]);
  }

  return { undoEvent, redoEvent, saveEvent }
}

export default history