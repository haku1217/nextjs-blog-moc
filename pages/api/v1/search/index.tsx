import { NextApiRequest, NextApiResponse } from 'next'
import { fetchData } from '../../../server/api/es'
export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await fetchData({})
  res.status(200).json(response)
}
