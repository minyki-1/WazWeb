import { useEffect, useState } from 'react'
import { IDesgin } from '../../types/design'
import { setupValue } from '../../lib/setup'
import Widget from './widget'

export default function WidgetList({ show }: { show: boolean }) {
  const [widgetList, setWidgetList] = useState<IDesgin[]>()
  useEffect(() => {
    setWidgetList(setupValue("widget"))
  }, [])
  return (
    <div style={{ display: show ? "block" : "none" }}>
      {
        widgetList?.map((data, key) => (
          <Widget key={key} {...data} />
        ))
      }
    </div>
  )
}
