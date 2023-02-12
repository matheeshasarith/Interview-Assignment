import mongoose from 'mongoose'

const eventSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model('Event', eventSchema)

export default Event
