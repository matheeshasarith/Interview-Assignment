import express from 'express'

const router = express.Router()
import {
  getEvents,
  getEventById,
  deleteEvent,
  createEvent2,
  updateEvent,
  indetail,
 
} from '../controllers/eventController.js'
import { protect, business } from '../middleware/authMiddleware.js'

router.route('/new').get(getEvents).post(protect, business, createEvent2)
router.route('/register').get(getEvents)
router.route('/indetail').post(indetail)
router.route('/').get(protect, getEvents).post(protect, business)
router
  .route('/:id')
  .get(getEventById)
  .delete(protect, deleteEvent)
  .put(protect,updateEvent)

export default router
