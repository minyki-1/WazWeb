type TCssRule = CSSRule & { selectorText: string, style: CSSStyleDeclaration }
export type TSelectorStylerReturn = {
  set: (styleName: string, style: string) => string | undefined;
  get: (styleName: string) => string | undefined;
}
export const selectorStyler = (className: string, styleSheets: CSSStyleSheet): TSelectorStylerReturn => {
  const findSelector = Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === className) as TCssRule | undefined
  const newStyle = createSelectorStyle(className, styleSheets) as TCssRule | undefined
  const selector = findSelector ?? newStyle

  function set(styleName: string, style: string) {
    if (!selector) return;
    selector.style[styleName as any] = style
    return selector.style[styleName as any]
  }

  function get(styleName: string) {
    if (selector) return selector.style[styleName as any]
  }

  return { set, get }
}

const createSelectorStyle = (className: string, styleSheets: CSSStyleSheet, style = "") => {
  const rule = Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === className)
  if (rule) return rule;
  const styleElem = styleSheets.ownerNode
  if (styleElem) styleElem.textContent += className + `{${style}}`
  return Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === className);
}
