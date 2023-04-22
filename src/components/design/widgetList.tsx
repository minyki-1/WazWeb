import { useEffect, useState } from 'react'
import { IDesign } from '../../types/design'
import { setupValue } from '../../lib/setup'
import Widget from './widget'

export default function WidgetList({ show }: { show: boolean }) {
  const [widgetList, setWidgetList] = useState<IDesign[]>()
  useEffect(() => {
    setWidgetList(setupValue("widget"))
  }, [show])
  return (
    <>
      {
        show &&
        widgetList?.map((data, key) => (
          <Widget key={key} {...data} />
        ))
      }
    </>
  )
}
