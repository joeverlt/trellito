import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { connection } from '@/lib/mongoose'
import { List, ListDocument } from '@/lib/mongoose/models/List'
import { Card, CardDocument } from '@/lib/mongoose/models/Card'

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
      const { from, to, listId: list } = req.body
      const card = await Card.findOne({ position: from, list }).exec()

      if (!card) throw new Error('Source card not found.')

      const currentPosition = card.position
      const newPosition = parseInt(to, 10)

      if (newPosition === currentPosition) {
        res.status(200).json({ message: 'No changes made.' })
        return
      }

      if (newPosition > currentPosition) {
        await Card.updateMany(
          { list, position: { $gt: currentPosition, $lte: newPosition } },
          { $inc: { position: -1 } }
        )
      } else {
        await Card.updateMany(
          { list, position: { $gte: newPosition, $lt: currentPosition } },
          { $inc: { position: 1 } }
        )
      }

      card.position = newPosition
      await card.save()

      res.status(201).json({ message: 'Reorder successful.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error reordering the cards.' })
    }
  }
}

export default handler
