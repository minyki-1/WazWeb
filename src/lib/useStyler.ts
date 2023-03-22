import { useEffect, useState } from "react";
import { useStore } from "../zustand/store";
import { Dispatch, SetStateAction } from "react";
import { selectorStyler } from "./selectorStyle";
import { IColor } from "../types/design";

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
  // colorPick: {
  //   color: string;
  //   setColor: (color: IColor) => void;
  // }
}

export type TUseStyler = (name: any, resetText?: string) => IStylerReturns

export const useStyler: TUseStyler = (name, resetText = "None") => {
  const { selectComp } = useStore();
  const [value, setValue] = useState(resetText)

  useEffect(() => {
    setValue(getStyle())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, resetText, selectComp])

  const getStyle = () => {
    if (!selectComp) return resetText;
    const { classList, ownerDocument } = selectComp
    const styleSheets = ownerDocument.styleSheets[0]
    const style = selectorStyler('.' + classList[1], styleSheets).get(name)
    return style ? style : resetText
  }
  // <img refer/>
  const changeStyle = (style?: string) => {
    if (!selectComp) return;
    const { classList, ownerDocument } = selectComp
    const styleSheets = ownerDocument.styleSheets[0]
    const selectorStyle = selectorStyler('.' + classList[1], styleSheets)
    const before = selectorStyle.get(name)
    selectorStyle.set(name, style ? style : value)
    if (before === selectorStyle.get(name)) setValue(before ? before : resetText);
  }

  const onChange = ({ target }: { target: HTMLInputElement }) => setValue(target.value)

  const onBlur = () => changeStyle()

  const onKeyDown = ({ code }: { code: string }) => code === "Enter" ? changeStyle() : null

  return {
    value, getStyle, setValue, changeStyle,
    input: { onChange, onKeyDown, onBlur, value },
    select: {
      onChange: ({ target }: { target: HTMLSelectElement }) => {
        setValue(target.value)
        changeStyle(target.value)
      }, value
    }
  }
}

const useStylerColor = (name: any, resetText: IColor = { r: 0, g: 0, b: 0, a: 0 }) => {
  const { selectComp } = useStore();
  const [value, setValue] = useState<IColor>(resetText)

  const getStyle = () => {
    if (!selectComp) return resetText;
    const { classList, ownerDocument } = selectComp
    const styleSheets = ownerDocument.styleSheets[0]
    const style = selectorStyler('.' + classList[1], styleSheets).get(name)
    return style ? style : resetText
  }

  useEffect(() => {
    console.log()

    getStyle()

  }, [])

  return {
    color: value,
    setColor: (color: IColor) => {
      if (!selectComp) return;
      const { r, g, b, a } = color
      selectComp.style[name] = `rgba(${r},${g},${b},${a})`
      setValue(color)
    }
  }
}