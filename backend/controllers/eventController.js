import { json } from 'express'
import asyncHandler from 'express-async-handler'
import Event from '../models/eventModel.js'
import mongoose from 'mongoose'


const getEvents = asyncHandler(async (req, res) => {
  const pageSize = 1
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Event.countDocuments({ ...keyword } && { user: req.user._id })
  const events = await Event.find({ ...keyword } && { user: req.user._id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ events, page, pages: Math.ceil(count / pageSize) })
})

const getEventById = asyncHandler(async (req, res) => {
 const event = await Event.findById(req.params.id)

 
  if (event) {
    res.json(event)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    await event.remove()
    res.json({ message: 'Event removed' })
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

const createEvent2 = asyncHandler(async (req, res) => {

  const user = req.user._id;

  const { name, address, mail} = req.body.name

  const newStudent = new Event({
    user,
    name, 
    address,
    mail
  })

if (newStudent){
  const createdEvent = await newStudent.save()
  res.status(201).json(createdEvent)
}else{
  res.status(400)
  throw new Error('Not submit')
}
 

})

const updateEvent = asyncHandler(async (req, res) => {

  const {
    name,
    address,
    mail
                
  } = req.body



  const event = await Event.findById(req.params.id)

  if (event) {

    event.name = name
    event.address = address
    event.mail = mail

    const updatedEvent = await event.save()
    res.json(updatedEvent)
    
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

const indetail = asyncHandler(async (req, res) => {

  const {id} = req.body.user
  const event = await Event.findById(id)

  if (event) {
    res.json(event)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }

}) 

export {
  getEvents,
  getEventById,
  deleteEvent,
  createEvent2,
  updateEvent,
  indetail
}
