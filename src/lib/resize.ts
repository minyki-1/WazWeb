export const smallerHTML = (changedComp: HTMLElement | null | undefined, matchComp: HTMLElement | null | undefined, offset: number) => {
  if (!changedComp || !matchComp) return;
  const changedCompWidth = changedComp.offsetWidth
  const changedCompHeight = changedComp.offsetHeight
  const matchCompWidth = matchComp.offsetWidth + offset
  const matchCompHeight = matchComp.offsetHeight + offset
  let resizeValue = 1;
  if (changedCompWidth > matchCompWidth) resizeValue = matchCompWidth / changedCompWidth
  else if (changedCompHeight > matchCompHeight) resizeValue = matchCompHeight / changedCompHeight
  changedComp.style.transform = `scale(${resizeValue})`
}

export const fitHTML = (changedComp: HTMLElement | null | undefined, matchComp: HTMLElement | null | undefined, offset: number) => {
  if (!changedComp || !matchComp) return;
  const changedCompWidth = changedComp.offsetWidth
  const changedCompHeight = changedComp.offsetHeight
  const matchCompWidth = matchComp.offsetWidth + offset
  const matchCompHeight = matchComp.offsetHeight + offset
  let resizeValue = 1;
  resizeValue = matchCompWidth / changedCompWidth
  if (matchCompHeight / changedCompHeight < resizeValue) {
    resizeValue = matchCompHeight / changedCompHeight
  }
  changedComp.style.transform = `scale(${resizeValue})`
}