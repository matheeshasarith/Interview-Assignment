// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'

import { userLoginReducer,
  userRegisterReducer
} from './users/userReducers'

import {
  eventListReducer,
  eventDeleteReducer,
  eventCreateReducer,
  eventUpdateReducer,
  eventDetailsReducer
} from './events/eventReducers'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  eventList: eventListReducer,
  eventDelete: eventDeleteReducer,
  eventCreate: eventCreateReducer,
  eventUpdate: eventUpdateReducer,
  eventDetails: eventDetailsReducer

})

export default rootReducer
