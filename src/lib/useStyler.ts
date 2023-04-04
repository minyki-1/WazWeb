import { useEffect, useState } from "react";
import { useStore } from "../zustand/store";
import { Dispatch, SetStateAction } from "react";
import { classStyler } from "./classStyler";
import { useRouter } from "next/router";
import { saveHTML } from "./saveHTML";

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
  const router = useRouter()

  useEffect(() => {
    setValue(getStyle())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, resetText, selectComp])

  const createClassStyler = () => {
    if (!selectComp) return;
    const { classList, ownerDocument } = selectComp
    ownerDocument
    return classStyler('.' + classList[classList.length - 1], name, ownerDocument.styleSheets[0])
  }

  const getStyle = () => {
    let style: string | undefined | null;
    if (!selectComp && className) {
      const elem = document.querySelector('.' + className) as HTMLElement | null
      style = elem?.style[name]
    } else {
      const selectorStyle = createClassStyler()
      style = selectorStyle?.get()
    }
    return withoutCalc(style ? style : resetText)
  }

  const styleToCalc = (style: string) => {
    if (/\d/.test(style) && /[+\-*/]/.test(style)) return "calc(" + style + ")"
    return style
  }

  const withoutCalc = (style: string) => {
    return style.replace(/calc\(([^)]*)\)/g, (group1) => group1).replace(/calc/g, "");
  }

  const changeStyle = (style?: string) => {
    let before: string | undefined | null;
    let after: string | undefined | null;
    let styleText: string;
    if (!selectComp && className) {
      const comp = document.querySelector('.' + className) as HTMLElement | null
      if (!comp) return;
      before = comp.style[name as any]
      styleText = styleToCalc(style ? style : value)
      comp.style[name as any] = styleText
      after = comp.style[name as any]
    } else {
      const selectorStyle = createClassStyler()
      if (!selectorStyle) return;
      styleText = styleToCalc(style ? style : value)
      before = selectorStyle.get()
      after = selectorStyle.set(styleText)
    }
    if (before === after) setValue(withoutCalc(before ? before : resetText))
    else setValue(withoutCalc(after ? after : resetText))

    if (typeof router.query.id === "string") saveHTML(router.query.id)
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