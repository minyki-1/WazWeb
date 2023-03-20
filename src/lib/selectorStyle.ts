type TCssRule = CSSRule & { selectorText: string, style: CSSStyleDeclaration }

export const selectorStyler = (selectorName: string, styleSheets: CSSStyleSheet) => {
  let selector: TCssRule | undefined = undefined;
  Object.keys(styleSheets.cssRules)
    .forEach((e) => {
      const rules = styleSheets.cssRules[e as any] as TCssRule
      if (rules.selectorText === selectorName) selector = rules
    })

  function set(styleName: string, style: string) {
    if (!selector) return;
    selector.style[styleName as any] = style
    return selector.style[styleName as any]
  }

  function get(styleName: string) {
    if (!selector) return;
    return selector.style[styleName as any]
  }

  if (selector) return { set, get }
  else return null
}

export const createSelectorStyle = (selectorName: string, styleSheets: CSSStyleSheet) => {
  const styleElem = styleSheets.ownerNode
  let isOverlap = false
  Object.keys(styleSheets.cssRules)
    .forEach((e) => {
      const rules = styleSheets.cssRules[e as any] as TCssRule
      if (rules.selectorText === selectorName) isOverlap = true
    })
  if (styleElem && !isOverlap) styleElem.textContent += selectorName + "{}"
}
