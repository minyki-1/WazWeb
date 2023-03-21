type TCssRule = CSSRule & { selectorText: string, style: CSSStyleDeclaration }

export const selectorStyler = (className: string, styleSheets: CSSStyleSheet) => {
  const selector = Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === className) as TCssRule | undefined
  const newStyle = selector ? selector : createSelectorStyle(className, styleSheets) as TCssRule | undefined

  function set(styleName: string, style: string) {
    if (!newStyle) return;
    newStyle.style[styleName as any] = style
    return newStyle.style[styleName as any]
  }

  function get(styleName: string) {
    if (!newStyle) return;
    return newStyle.style[styleName as any]
  }

  return { set, get }
}

export const createSelectorStyle = (className: string, styleSheets: CSSStyleSheet, style = "") => {
  const rule = Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === className)
  if (rule) return rule;
  const styleElem = styleSheets.ownerNode
  if (styleElem) styleElem.textContent += className + `{${style}}`
  return Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === className);
}
