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

  /* POST ------------------------------------------------------ */
  if (req.method === 'POST') {
    try {
      const { title, description, list, position } = req.body
      const card = new Card({ title, description, list, position })
      await card.save()
      const updatedList = await List.findByIdAndUpdate(
        list,
        { $push: { cards: card._id } },
        { new: true }
      )
      if (!updatedList) throw new Error('List not found.')
      res.status(201).json(card)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error creating the card.' })
    }
  }

  /* GET ------------------------------------------------------ */
  if (req.method === 'GET') {
    try {
      const cards = await Card.find()
      res.status(200).json(cards)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error retrieving the cards.' })
    }
  }
}

export default handler
