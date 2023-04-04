type TCssRule = CSSRule & { selectorText: string, style: CSSStyleDeclaration }
export type TSelectorStylerReturn = {
  set: (style: string) => string | undefined;
  get: () => string | undefined;
}
export const classStyler = (className: string, styleName: string, styleSheets: CSSStyleSheet): TSelectorStylerReturn => {
  const findSelector = Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === className) as TCssRule | undefined
  const selector = findSelector ?? createSelectorStyle(className, styleSheets) as TCssRule | undefined

  let styleProp = styleName;
  if (!styleName.includes('-')) {
    styleProp = styleName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  }

  function set(style: string) {

    if (!selector) return;
    selector.style[styleProp as any] = style
    const regex = new RegExp(`\\${className}\\s*\\{[^}]*\\}`, 'gi');
    const styleText = styleSheets.ownerNode?.textContent;
    if (styleText && findSelector) styleSheets.ownerNode.textContent = styleText.replace(regex, findSelector.cssText);
    return selector.style[styleProp as any]
  }

  function get() {
    if (selector) return selector.style[styleProp as any]
  }

  return { set, get }
}

const createSelectorStyle = (className: string, styleSheets: CSSStyleSheet, style = "") => {
  const styleElem = styleSheets.ownerNode
  if (styleElem) styleElem.textContent += className + `{${style}}`
  return Object.values(styleSheets.cssRules).find(key => (key as TCssRule).selectorText === className);
}