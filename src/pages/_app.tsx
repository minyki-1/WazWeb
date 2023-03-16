import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { GlobalStyle } from '../css/globals';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const font = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const styleForOne: { [key: string]: { [key: string]: string } } = {
    a: { textDecoration: "none", cursor: "pointer" },
    h1: { color: "#363636", fontSize: "19px" },
    h2: { color: "#363636", fontSize: "16px" },
    h3: { color: "#363636", fontSize: "14px" },
    h4: { color: "#363636", fontSize: "12px" },
    h5: { color: "#363636", fontSize: "11px" },
    input: { color: "#363636", fontSize: "14px", border: "none", outline: "none", backgroundColor: "initial", minWidth: "0px", minHeight: "0px" },
    select: { color: "#363636", fontSize: "14px", border: "none", outline: "none", backgroundColor: "initial" },
    button: { backgroundColor: "initial" },
  }

  const styleForMany: { style: { [key: string]: string }, tags: string[] }[] = [
    {
      tags: ["html", "body", "div", "span", "applet", "object", "iframe", "h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "pre", "a", "abbr", "acronym", "address", "big", "cite", "code", "del", "dfn", "em", "img", "ins", "kbd", "q", "s", "samp", "small", "strike", "strong", "sub", "sup", "tt", "var", "b", "u", "i", "center", "dl", "dt", "dd", "ol", "ul", "li", "fieldset", "form", "label", "legend", "table", "caption", "tbody", "tfoot", "thead", "tr", "th", "td", "article", "aside", "canvas", "details", "embed", "figure", "figcaption", "footer", "header", "hgroup", "menu", "nav", "output", "ruby", "section", "summary", "time", "mark", "audio", "video"],
      style: { margin: "0", padding: "0", fontSize: "100%", font: "inherit", verticalAlign: "baseline", },
    },
    {
      tags: ["article", "aside", "details", "figcaption", "figure", "footer", "header", "hgroup", "menu", "nav", "section"],
      style: { display: "block" }
    },
    {
      tags: ["body"],
      style: { lineHeight: "1" },
    },
    {
      tags: ["ol", "ul"],
      style: { listStyle: "none" }
    }
  ]

  const changeStyle = (comp: HTMLElement | null) => {
    const tag = comp?.tagName?.toLowerCase()
    if (!tag || !comp) return;
    if (styleForOne.hasOwnProperty(tag)) {
      Object.keys(styleForOne[tag]).forEach(value => {
        if (comp.textContent === "Compoy Design") console.log(comp, comp.style[value as any])
        // if (!comp.style[value as any]) comp.style[value as any] = styleForOne[tag][value]
      });
    }
    // styleForMany.forEach(({ style, tags }) => {
    //   if (tags.includes(tag)) Object.keys(style).forEach(key => {
    //     console.log(comp.style[key as any])
    //     // if (!comp.style[key as any]) comp.style[key as any] = style[key]
    //   })
    // })
    comp.childNodes.forEach(child => {
      changeStyle(child as HTMLElement | null)
    })
  }

  useEffect(() => {
    // const main = document.getElementById("__next")
    // changeStyle(main)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {
        router.pathname !== "/design/[id]/view"
          ? <>
            <style jsx global>{`
              html { font-family: ${font.style.fontFamily}; }
            `}</style>
            <GlobalStyle />
          </>
          : <style jsx global>{`
            @import url("https://necolas.github.io/normalize.css/8.0.1/normalize.css");
          `}</style>
      }
      <Component {...pageProps} />
    </>
  )
}
