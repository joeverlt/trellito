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

  /* GET by ID ------------------------------------------------- */
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      const list = await List.findById(id).populate({
        path: 'cards',
        options: { sort: { position: 1 } }
      })
      if (!list) throw new Error('List not found.')
      res.status(200).json(list)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error retrieving the list.' })
    }
  }

  /* DELETE ------------------------------------------------------ */
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query
      const deletedList = await List.findByIdAndDelete(id)
      if (!deletedList) throw new Error('List not found.')
      const board = deletedList.board

      await List.updateMany(
        { board, position: { $gt: deletedList.position } },
        { $inc: { position: -1 } }
      )

      await Board.findByIdAndUpdate(board, { $pull: { lists: id } })
      res.status(200).json({ message: 'List deleted successfully.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error deleting the list.' })
    }
  }

  /* PUT ------------------------------------------------------ */
  if (req.method === 'PUT') {
    try {
      const { id } = req.query
      const { title, description } = req.body
      const list = await List.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      )
      if (!list) throw new Error('List not found.')
      res.status(200).json(list)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error updating the list.' })
    }
  }
}

export default handler
