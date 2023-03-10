import { useEffect, useState } from "react";
import { useStore } from "../zustand/store";
import { Dispatch, SetStateAction } from "react";

export interface IStylerReturns {
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

export type TUseStyler = (name: any, resetText?: string) => IStylerReturns

export const useStyler: TUseStyler = (name, resetText = "0px") => {
  const { selectComp } = useStore();
  const style = selectComp?.style[name]
  const [value, setValue] = useState(style ? style : resetText)

  useEffect(() => {
    if (!selectComp) return;
    const style = selectComp.style[name]
    setValue(style ? style : resetText)
  }, [name, resetText, selectComp])

  const getCompStyle = () => {
    if (!selectComp) return resetText;
    const style = selectComp.style[name]
    return style ? style : resetText
  }

  const changeStyle = () => {
    if (!selectComp) return;
    const before = selectComp.style[name]
    selectComp.style[name] = value
    if (before === selectComp.style[name]) setValue(before ? before : resetText);
  }

  const onChange = ({ target }: { target: HTMLInputElement }) => setValue(target.value)

  const onBlur = () => changeStyle()

  const onKeyDown = ({ code }: { code: string }) => code === "Enter" ? changeStyle() : null

  return { value, setValue, getCompStyle, changeStyle, props: { onChange, onKeyDown, onBlur, value } }
}