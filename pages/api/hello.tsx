import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const res1 = await fetch('http://localhost:9200/library/_search')
  // console.log('これはAPIRouteから', await res1.json())
  const data = await res1.json()
  res.status(200).json(data)
}
