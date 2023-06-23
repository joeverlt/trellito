// api/route.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { connection } from '@/lib/mongoose'
import { List } from '@/lib/mongoose/models/List'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connection()
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    const error = 'Unauthorized: Please log in to access this resource.'
    res.status(401).send({ error })
  }

  /* POST ------------------------------------------------------ */
  if (req.method === 'POST') {
    try {
      const { from, to, boardId: board } = req.body

      const list = await List.findOne({
        position: from,
        board
      }).exec()

      if (!list) {
        throw new Error('Source list not found.')
      }

      const currentPosition = list.position
      const newPosition = parseInt(to, 10)

      if (newPosition === currentPosition) {
        res.status(200).json({ message: 'No changes made.' })
        return
      }

      if (newPosition > currentPosition) {
        await List.updateMany(
          { board, position: { $gt: currentPosition, $lte: newPosition } },
          { $inc: { position: -1 } }
        )
      } else {
        await List.updateMany(
          { board, position: { $gte: newPosition, $lt: currentPosition } },
          { $inc: { position: 1 } }
        )
      }

      list.position = newPosition
      await list.save()

      res.status(201).json({ message: 'Reorder successfully.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error reordering the lists.' })
    }
  }
}

export default handler
