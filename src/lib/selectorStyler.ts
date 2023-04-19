type TCssRule = CSSRule & { selectorText: string, style: CSSStyleDeclaration }
export type TSelectorStylerReturn = {
  set: (style: string) => string | undefined;
  get: () => string | undefined;
  selector: TCssRule | undefined;
}
export const selectorStyler = (selectorName: string, styleName: string, styleSheets: CSSStyleSheet): TSelectorStylerReturn => {
  const findSelector = Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === selectorName) as TCssRule | undefined
  const selector = findSelector ?? createSelectorStyle(selectorName, styleSheets) as TCssRule | undefined

  let styleProp = styleName;
  if (!styleName.includes('-')) {
    styleProp = styleName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  }

  function set(style: string) {
    if (!selector) return;
    selector.style[styleProp as any] = style
    const regex = new RegExp(`\\${selectorName}\\s*\\{[^}]*\\}`, 'gi');
    const styleText = styleSheets.ownerNode?.textContent;
    if (styleText && findSelector) styleSheets.ownerNode.textContent = styleText.replace(regex, findSelector.cssText);
    return selector.style[styleProp as any]
  }

  function get() {
    if (selector) return selector.style[styleProp as any]
  }

  return { set, get, selector }
}

const createSelectorStyle = (selectorName: string, styleSheets: CSSStyleSheet, style = "") => {
  const styleElem = styleSheets.ownerNode
  if (styleElem) styleElem.textContent += selectorName + `{${style}}`
  return Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === selectorName);
}