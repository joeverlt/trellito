// api/route.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { connection } from '@/lib/mongoose'
import { List } from '@/lib/mongoose/models/List'
import { Board } from '@/lib/mongoose/models/Board'

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
      const { title, description, board, position } = req.body
      const list = new List({ title, description, board, position })
      await list.save()
      const updatedBoard = await Board.findByIdAndUpdate(
        board,
        { $push: { lists: list._id } },
        { new: true }
      )
      if (!updatedBoard) throw new Error('Board not found.')
      res.status(201).json(list)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error creating the list.' })
    }
  }

  /* GET ------------------------------------------------------ */
  if (req.method === 'GET') {
    try {
      const lists = await List.find()
      res.status(200).json(lists)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error retrieving the lists.' })
    }
  }
}

export default handler
