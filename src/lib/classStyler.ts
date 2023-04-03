export type TSelectorStylerReturn = {
  set: (style: string) => string | null;
  get: () => string | null;
}
export const classStyler = (className: string, styleName: string, styleComp: HTMLElement): TSelectorStylerReturn => {
  const regex = new RegExp(`\\.${className}(\\W|$)`, 'g');

  let styleProp = styleName;
  if (!styleName.includes('-')) {
    styleProp = styleName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  }

  if (!regex.test(styleComp.innerHTML)) styleComp.innerHTML += styleComp.className + "{}"

  function set(style: string) {
    const regex = new RegExp(`(\\.${className}\\s*\\{[^}]*${styleProp}\\s*:\\s*)([^;}]*)`);
    styleComp.innerHTML = styleComp.innerHTML.replace(regex, `$1${style}`);
    return get()
  }

  function get() {
    const regex = new RegExp(`(\\.${className}\\s*\\{[^}]*${styleProp}\\s*:\\s*)([^;}]*)`);
    const match = styleComp.innerHTML.match(regex);
    return match ? match[2].trim() : null;
  }

  return { set, get }
}

