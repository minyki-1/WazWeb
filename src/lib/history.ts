interface IHistValue {
  histName: string;
  undoName: string;
  uid: string;
  changeComp: HTMLElement | null;
}

type TStorage = [string[] | null, (value: string[]) => void]

const storageManager = (name: string, uid: string): TStorage => {
  const storageValue: string[] | null = JSON.parse(localStorage.getItem(name + uid) || JSON.stringify(null))
  const setStorage = (value: string[]) => localStorage.setItem(name + uid, JSON.stringify(value))
  return [storageValue, setStorage]
}

export const history = ({ histName, undoName, uid, changeComp }: IHistValue) => {
  const [hist, setHist] = storageManager(histName, uid)
  const [undo, setUndo] = storageManager(undoName, uid)

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
    if (!changeComp || !uid) return;
    if (hist && value !== hist[0]) setHist([value, ...hist]);
    else if (!hist) setHist([value]);
    setUndo([]);
  }

  return { undoEvent, redoEvent, saveEvent }
}