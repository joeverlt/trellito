// api/route.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { connection } from '@/lib/mongoose'
import { Board } from '@/lib/mongoose/models/Board'

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
      const board = await Board.findById(id).populate({
        path: 'lists',
        options: { sort: { position: 1 } },
        populate: {
          path: 'cards',
          options: { sort: { position: 1 } }
        }
      })
      if (!board) throw new Error('Board not found.')
      res.status(200).json(board)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error retrieving the board.' })
    }
  }

  /* DELETE ------------------------------------------------------ */
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query
      const deletedBoard = await Board.findByIdAndDelete(id)
      if (!deletedBoard) throw new Error('Board not found.')
      res.status(200).json({ message: 'Board deleted successfully.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error deleting the board.' })
    }
  }

  /* PUT ------------------------------------------------------ */
  if (req.method === 'PUT') {
    try {
      const { id } = req.query
      const { title, description } = req.body
      const board = await Board.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      )
      if (!board) throw new Error('Board not found.')
      res.status(200).json(board)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error updating the board.' })
    }
  }
}

export default handler
