import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  authUserNext,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router
  .route('/:id')
  .delete(protect, admin )
  .get(protect, admin )
  .put(protect, admin )
router.route('/login').post(authUser)
router.post('/loginNext', authUserNext)
router.route('/').post(registerUser).get(protect)



export default router
