export const styleName = "WazWeb"
export const viewName = "mainIframeView"
export function getMainView() {
  const mainView = document.getElementById(viewName) as HTMLIFrameElement | null
  return mainView
}

export function getStyleElem() {
  const mainView = getMainView()
  const doc = mainView?.contentDocument
  return doc?.getElementById(styleName)
}

export function getMainStyleSheet() {
  const mainView = getMainView()
  const styleSheets = mainView?.contentDocument?.styleSheets
  if (!styleSheets) return;
  const styleSheet = Object.values(styleSheets).find((value) => (value.ownerNode as HTMLStyleElement | null)?.id === styleName)
  return styleSheet
}

export function getStyleName() {
  return styleName
}
export function getViewName() {
  return viewName
}