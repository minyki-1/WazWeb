export const resizeHTML = (changedComp: HTMLElement, matchComp: HTMLElement, offset: number) => {
  const changedCompWidth = changedComp.offsetWidth
  const changedCompHeight = changedComp.offsetHeight
  const matchCompWidth = matchComp.offsetWidth + offset
  const matchCompHeight = matchComp.offsetHeight + offset
  let resizeValue = 1;
  if (changedCompWidth / 4 >= changedCompHeight / 3 && changedCompWidth > matchCompWidth) {
    resizeValue = matchCompWidth / changedCompWidth
  } else if (changedCompWidth / 4 <= changedCompHeight / 3 && changedCompHeight > matchCompHeight) {
    resizeValue = matchCompHeight / changedCompHeight
  }
  changedComp.style.transform = `scale(${resizeValue})`
}