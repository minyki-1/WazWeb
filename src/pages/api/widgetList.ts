import type { NextApiRequest, NextApiResponse } from 'next'
import { IDesign } from '../../types/design'

const temp2: IDesign[] = [
  {
    id: "3",
    title: "widget1",
    makerId: "0",
    html: `<header class="Header lsasw_"><h1 class="title scsaqe">Header</h1></header>`,
    style: `.lsasw_{background-color:green;width:100vw;border-bottom:2px solid gray;align-items:center;justify-content:center;}.scsaqe{font-size:18px;}`,
    descript: "test widget",
    updatedAt: "1",
    createdAt: "1"
  }
]

type Data = {
  data: IDesign[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ data: temp2 })
}
