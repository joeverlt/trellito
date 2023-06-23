// api/route.ts

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
      const { cardId, fromListId, toListId, toPosition } = req.body

      const card = await Card.findById(cardId).exec()
      if (!card) throw new Error('Card not found.')

      const fromList = await List.findById(fromListId).exec()
      const toList = await List.findById(toListId).exec()

      if (!fromList || !toList)
        throw new Error('Source or destination list not found.')

      const fromPosition = card.position

      card.list = toListId
      card.position = toPosition
      await card.save()

      fromList.cards.pull(cardId)
      await fromList.save()

      await Card.updateMany(
        { list: fromListId, position: { $gt: fromPosition } },
        { $inc: { position: -1 } }
      )

      await Card.updateMany(
        { list: toListId, position: { $gte: toPosition } },
        { $inc: { position: 1 } }
      )

      toList.cards.push(cardId)
      await toList.save()

      res.status(201).json({ message: 'Card moved successfully.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error moving the card.' })
    }
  }
}

export default handler
