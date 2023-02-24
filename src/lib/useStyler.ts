import { SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "../zustand/store";

export const useStyler = (name: string, resetText: string) => {
  const { selectComp } = useStore();
  const styleName: any = name.toLowerCase()
  const style = selectComp?.style[styleName]
  const [value, setValue] = useState(style ? style : resetText)

  useEffect(() => {
    if (!selectComp) return;
    const style = selectComp.style[name as any]
    setValue(style ? style : resetText)
  }, [name, resetText, selectComp])

  

  return { value, setValue: setValue }
}