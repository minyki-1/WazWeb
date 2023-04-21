import { NextApiRequest, NextApiResponse } from 'next';
import { IDesign } from '../../../types/design';

type Data = IDesign | undefined;

const temp1: IDesign[] = [
  {
    id: "0",
    title: "test1",
    makerId: "0",
    html: `<main class="App app"><h1 class="test Qsgold">Project 1</h1></main>`,
    style: `.app{width:100vw;height:100vh;background-color:black;display:flex;align-items:center;justify-content:center;}.Qsgold{color:white}`,
    updatedAt: "1",
    createdAt: "1"
  },
  {
    id: "1",
    title: "test2",
    makerId: "0",
    html: `<main class="App app"><h1 class="test Qsgold">Project 2</h1></main>`,
    style: `.app{width:100vw;height:100vh;background-color:tomato;display:flex;align-items:center;justify-content:center;}.Qsgold{color:white}`,
    updatedAt: "2",
    createdAt: "2"
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { id },
  } = req;

  const data = temp1.find(data => data.id === id)

  res.status(200).json(data);
}
