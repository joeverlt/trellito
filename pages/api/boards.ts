// api/route.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { connection } from '@/lib/mongoose'
import { Board } from '@/lib/mongoose/models/Board'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connection()
  const session = await getServerSession(req, res, authOptions)
  console.log(session)
  if (!session) {
    const error = 'Unauthorized: Please log in to access this resource.'
    res.status(401).send({ error })
  }

  /* POST ------------------------------------------------------ */
  if (req.method === 'POST') {
    try {
      const { title, description } = req.body
      const board = new Board({ title, description })
      await board.save()
      res.status(201).json(board)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error creating the board.' })
    }
  }

  /* GET ------------------------------------------------------ */
  if (req.method === 'GET') {
    try {
      const boards = await Board.find()
      res.status(200).json(boards)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error retrieving the boards.' })
    }
  }

  /* GET by ID ------------------------------------------------- */
  if (req.method === 'GET' && req.query.id) {
    try {
      const { id } = req.body
      const board = await Board.findById(id)
      if (!board) throw new Error('Board not found.')
      res.status(200).json(board)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error retrieving the board.' })
    }
  }

  /* PUT ------------------------------------------------------ */
  if (req.method === 'PUT') {
    try {
      const { id, title, description } = req.body
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

  /* DELETE ------------------------------------------------------ */
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body
      const deletedBoard = await Board.findByIdAndDelete(id)
      if (!deletedBoard) {
        throw new Error('Board not found.')
      }
      res.status(200).json({ message: 'Board deleted successfully.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error deleting the board.' })
    }
  }

  res.status(405).json({ error: 'Method not allowed.' })
}

export default handler
