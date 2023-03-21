type TCssRule = CSSRule & { selectorText: string, style: CSSStyleDeclaration }

export const selectorStyler = (selectorName: string, styleSheets: CSSStyleSheet) => {
  const selector = Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === selectorName) as TCssRule | undefined
  const newStyle = selector ? selector : createSelectorStyle(selectorName, styleSheets) as TCssRule | undefined

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

const createSelectorStyle = (selectorName: string, styleSheets: CSSStyleSheet) => {
  const rule = Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === selectorName)
  if (rule) return rule;
  const styleElem = styleSheets.ownerNode
  if (styleElem) styleElem.textContent += selectorName + "{}"
  return Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === selectorName);
}
