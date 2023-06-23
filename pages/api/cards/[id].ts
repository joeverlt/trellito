// api/route.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { connection } from '@/lib/mongoose'
import { Card } from '@/lib/mongoose/models/Card'
import { List } from '@/lib/mongoose/models/List'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connection()
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    const error = 'Unauthorized: Please log in to access this resource.'
    res.status(401).send({ error })
  }

  /* GET by ID ------------------------------------------------- */
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      const card = await Card.findById(id).populate({
        path: 'cards',
        options: { sort: { position: 1 } }
      })
      if (!card) throw new Error('Card not found.')
      res.status(200).json(card)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error retrieving the card.' })
    }
  }

  /* DELETE ------------------------------------------------------ */
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query
      const deletedCard = await Card.findByIdAndDelete(id)
      if (!deletedCard) throw new Error('Card not found.')
      const list = deletedCard.list

      await Card.updateMany(
        { list, position: { $gt: deletedCard.position } },
        { $inc: { position: -1 } }
      )

      await List.findByIdAndUpdate(list, { $pull: { cards: id } })
      res.status(200).json({ message: 'Card deleted successfully.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error deleting the card.' })
    }
  }

  /* PUT ------------------------------------------------------ */
  if (req.method === 'PUT') {
    try {
      const { id } = req.query
      const { title, description } = req.body
      const card = await Card.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      )
      if (!card) throw new Error('Card not found.')
      res.status(200).json(card)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error updating the card.' })
    }
  }
}

export default handler
