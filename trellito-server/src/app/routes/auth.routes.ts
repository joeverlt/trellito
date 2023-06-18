import express from 'express'
import { signup, signin, getUser } from '../controllers/auth.controller'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/user', getUser)

export default router
