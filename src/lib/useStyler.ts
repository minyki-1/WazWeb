import { useEffect, useState } from "react";
import { useStore } from "../zustand/store";
import { Dispatch, SetStateAction } from "react";
import { selectorStyler } from "./selectorStyle";

export interface IStylerColor {
  value: string;
  changeStyle: (style?: string) => void;
  getStyle: () => string;
}

export interface IStylerReturn {
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
  color: IStylerColor;
}

export type TUseStyler = (name: any, resetText?: string, className?: string) => IStylerReturn

export const useStyler: TUseStyler = (name, resetText = "None", className) => {
  const { selectComp } = useStore()
  const [value, setValue] = useState(resetText)

  useEffect(() => {
    const style = getStyle()
    setValue(style ? style : resetText)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, resetText, selectComp])

  const createSelectorStyler = () => {
    if (!selectComp) return;
    const { classList, ownerDocument } = selectComp
    const styleSheets = ownerDocument.styleSheets
    const styleSheet = Object.values(styleSheets).find((e) => (e.ownerNode as HTMLElement).id === "compyDesign")
    if (styleSheet) {
      return selectorStyler('.' + classList[classList.length - 1], styleSheet)
    }
  }

  const getStyle = () => {
    if (!selectComp && className) {
      const elem = document.querySelector('.' + className) as HTMLElement | null
      const style = elem?.style[name]
      return style ? style : resetText
    } else {
      const selectorStyle = createSelectorStyler()
      if (!selectorStyle) return resetText;
      const style = selectorStyle.get(name)
      return style ? style : resetText
    }
  }

  const changeStyle = (style?: string) => {
    if (!selectComp && className) {
      const comp = document.querySelector('.' + className) as HTMLElement | null
      if (!comp) return;
      const before = comp.style[name as any]
      comp.style[name as any] = style ? style : value
      setValue(style ? style : value)
      if (before === comp.style[name as any]) setValue(before ? before : resetText);
    } else {
      const selectorStyle = createSelectorStyler()
      if (!selectorStyle) return;
      const before = selectorStyle.get(name)
      selectorStyle.set(name, style ? style : value)
      setValue(style ? style : value)
      if (before === selectorStyle.get(name)) setValue(before ? before : resetText);
    }
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
    },
    color: {
      value,
      changeStyle,
      getStyle
    }
  }
}