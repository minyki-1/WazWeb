import DefaultComp from './defaultComp'
import { defaultComp } from './defaultStyle'

export default function DefaultCompList({ show }: { show: boolean }) {
  return (
    <div style={{ display: show ? "block" : "none" }}>
      {
        defaultComp.map((data, key) => (
          <DefaultComp key={key} {...data} id={String(key)} />
        ))
      }
    </div>
  )
}
