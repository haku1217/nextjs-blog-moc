import { NextApiRequest, NextApiResponse } from 'next'
import { fetchData } from '../../../server/api/es'
import officegen from 'officegen'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.writeHead(200, {
    'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'Content-disposition': 'attachment; filename=surprise.pptx'
  })
  const pptx = officegen('pptx')
  pptx.on('finalize', function () {
    // We don't really need it in this case.
  })

  pptx.on('error', function () {
    // Error handing...
  })

  pptx.generate(res)
}
