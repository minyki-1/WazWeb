import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useStore } from "../zustand/store";

interface IStyler {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  getCompStyle: () => string;
  changeStyle: () => void;
  props: {
    onChange: ({ target }: {
      target: HTMLInputElement;
    }) => void;
    onKeyDown: ({ code }: { code: string }) => void | null;
    onBlur: () => void;
    value: string;
  };
}

export const useStyler = (name: string, resetText = "0px") => {
  const { selectComp } = useStore();
  const style = selectComp?.style[name as any]
  const [value, setValue] = useState(style ? style : resetText)

  useEffect(() => {
    if (!selectComp) return;
    const style = selectComp.style[name as any]
    setValue(style ? style : resetText)
  }, [name, resetText, selectComp])

  const getCompStyle = () => {
    if (!selectComp) return resetText;
    const style = selectComp.style[name as any]
    return style ? style : resetText
  }

  const changeStyle = () => {
    if (!selectComp) return;
    const before = selectComp.style[name as any]
    selectComp.style[name as any] = value
    if (before === selectComp.style[name as any]) setValue(before ? before : resetText);
  }

  const onChange = ({ target }: { target: HTMLInputElement }) => setValue(target.value)

  const onBlur = () => changeStyle()

  const onKeyDown = ({ code }: { code: string }) => code === "Enter" ? changeStyle() : null

  return { value, setValue, getCompStyle, changeStyle, props: { onChange, onKeyDown, onBlur, value } }
}