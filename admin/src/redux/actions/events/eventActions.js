import axios from 'axios'
import {

  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,

  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,

  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_FAIL,

  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,

  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAIL


} from '../../constants/events/eventConstants'
import { logout } from '../../actions/users/userActions'

export const listEvents = (keyword = '', pageNumber = '') => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST })


    const {
      userLogin: { userInfo }
    } = getState()


    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
      
    if (userInfo.isAdmin) {
      const { data } = await axios.get(`/api/events/getEventsAdmin?keyword=${keyword}&pageNumber=${pageNumber}`, config)

      dispatch({
        type: EVENT_LIST_SUCCESS,
        payload: data
      })

    } else {
      const { data } = await axios.get(`/api/events?keyword=${keyword}&pageNumber=${pageNumber}`, config)

      dispatch({
        type: EVENT_LIST_SUCCESS,
        payload: data
      })
    }

  } catch (error) {

    const message = error.response && error.response.data.message ? error.response.data.message : error.message

    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }

    dispatch({
      type: EVENT_LIST_FAIL,
      payload: message
    })
  }
}

export const listEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/events/${id}`)

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/events/${id}`, config)

    dispatch({
      type: EVENT_DELETE_SUCCESS
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload: message
    })
  }
}

export const createEvent = (name, address, mail) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/events/new`, { name, address, mail}, config)

    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload: message
    })
  }
}

export const updateEvent = (event) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_UPDATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `/api/events/${event._id}`,
      event,
      config
    )

    dispatch({
      type: EVENT_UPDATE_SUCCESS,
      payload: data
    })
    dispatch({ type: EVENT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload: message
    })
  }
}