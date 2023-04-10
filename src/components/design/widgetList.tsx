import Widget from './widget'
import { defaultComp } from './widgetStyle'

export default function WidgetList({ show }: { show: boolean }) {
  return (
    <div style={{ display: show ? "block" : "none" }}>
      {
        defaultComp.map((data, key) => (
          <Widget key={key} {...data} id={key} />
        ))
      }
    </div>
  )
}
