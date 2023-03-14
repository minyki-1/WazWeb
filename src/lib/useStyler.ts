import { useEffect, useState } from "react";
import { useStore } from "../zustand/store";
import { Dispatch, SetStateAction } from "react";

export interface IStylerReturns {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  getStyle: () => string;
  changeStyle: (style?: string) => void;
  input: {
    onChange: ({ target }: {
      target: HTMLInputElement;
    }) => void;
    onKeyDown: ({ code }: {
      code: string;
    }) => void | null;
    onBlur: () => void;
    value: string;
  };
  select: {
    onChange: ({ target }: {
      target: HTMLSelectElement;
    }) => void;
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

  const getStyle = () => {
    if (!selectComp) return resetText;
    const style = selectComp.style[name]
    return style ? style : resetText
  }

  const changeStyle = (style?: string) => {
    if (!selectComp) return;
    const before = selectComp.style[name]
    selectComp.style[name] = style ? style : value
    if (before === selectComp.style[name]) setValue(before ? before : resetText);
  }

  const onChange = ({ target }: { target: HTMLInputElement }) => setValue(target.value)

  const onBlur = () => changeStyle()

  const onKeyDown = ({ code }: { code: string }) => code === "Enter" ? changeStyle() : null

  return {
    value, setValue, getStyle, changeStyle,
    input: { onChange, onKeyDown, onBlur, value },
    select: {
      onChange: ({ target }: { target: HTMLSelectElement }) => {
        setValue(target.value)
        changeStyle(target.value)
      }, value
    }
  }
}