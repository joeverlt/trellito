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

  const owner = session?.user.id

  /* POST ------------------------------------------------------ */
  if (req.method === 'POST') {
    try {
      const { title, description } = req.body
      const board = new Board({ title, description, owner })
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
      const boards = await Board.find({ owner })
      res.status(200).json(boards)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error retrieving the boards.' })
    }
  }
}

export default handler
