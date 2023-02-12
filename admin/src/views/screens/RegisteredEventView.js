import React, { useEffect, useContext } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Row, Col } from 'react-bootstrap'
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/PaginateRegisteredEvents'
import {Link, NavLink } from "react-router-dom"
import { AbilityContext } from '@src/utility/context/Can'

import {
  listRegisteredEvents,
  deleteEvent,
  createEvent
} from '../../redux/actions/events/eventActions'

import { EVENT_CREATE_RESET } from '../../redux/constants/events/eventConstants'

const EventListScreen = ({ match, history }) => {

  const pageNumber = match.params.pageNumber || 1
  console.log("match meee")
  console.log(match)
  console.log(match.params)
  console.log("....")
  console.log(pageNumber)
  console.log("....")

  // const eventId = match.params.id || '633151c47ae8220ab98caaab'
  const eventId = match.params.id 

  const dispatch = useDispatch()

  const eventRegisteredList = useSelector((state) => state.eventRegisteredList)
  const { loading, error, events, page, pages } = eventRegisteredList
  //eventss[] : events 

  const eventDelete = useSelector((state) => state.eventDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = eventDelete

  const eventCreate = useSelector((state) => state.eventCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    event: createdEvent
  } = eventCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: EVENT_CREATE_RESET })

    // if (!userInfo || userInfo.isAdmin) {
    //   history.push('/login')
    // }

    // if (successCreate) {
    //   history.push(`/event/${createdEvent._id}/edit`)
    // } else {
    //   dispatch(listRegisteredEvents('', pageNumber))
    // }


    // dispatch(listRegisteredEvents('', pageNumber))
    console.log("eventId")
    console.log(eventId)
    console.log("list events begin")
    console.log(events)
    console.log("list events end")
    

    dispatch(listRegisteredEvents(eventId, '', pageNumber))
  }, [
    dispatch,
    eventId,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdEvent,
    pageNumber
   
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteEvent(id))
    }
  }

  const createEventHandler = () => {
    dispatch(createEvent())
  }

  const ability = useContext(AbilityContext)

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Events Users</h1>
        </Col>
        <Col className='text-right'>
          {/* <Button className='my-3' onClick={createEventHandler}>
            <i className='fas fa-plus'></i> Create Event
          </Button> */}
          {/* <Button className='my-3' onClick={createEventHandler}>
            <i className='fas fa-plus'></i> Create Event 2
          </Button> */}
          {/* <Button className='my-3' onClick="navigateToEventCreate">
          <i className='fas fa-plus'></i> New try
          </Button> */}
          {/* <Link  to="/event/create"><button className='my-3'>
          <i className='fas fa-plus'></i> Create Event 2 
            </button>
          </Link> */}
          {/* <NavLink
            to="/event/create"
            className="my-3"
          >
            Create Event
          </NavLink> */}
          
          {ability.can('read', 'all') ? (
            <Button.Ripple tag={Link} to='/event-view' color='danger'>
              Back
            </Button.Ripple>
          ) : null}

          {ability.can('manage', 'ACL') ? (
            <Button.Ripple tag={Link} to='/event-view-Business' color='danger'>
              Back
            </Button.Ripple>
          ) : null}
          
        </Col>
      </Row>
      <br></br>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>NAME</th>
                {/* <th>NO</th>
                <th>CATEGORY</th>
                <th>BRAND</th> */}
                {/* <th>Event ID</th> */}
                <th>CONTACT</th>
                <th>EMAIL</th>
                <th>Quantity</th>
                <th>Attendence</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  {/* <td>{event._id}</td> */}
                  <td>{event.name}</td>
                  {/* <td>{event.eventId}</td> */}
                  <td>{event.contact}</td>
                  <td>{event.email}</td>
                  <td>{event.quantity}</td>
                  <td>
                  {event.isAttendenceConfirmed ? (
                    <i className='fas fa-check' style={{ color: 'green' }}>Confirmed</i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}>Not Confirmend</i>
                  )}
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} eventId={eventId} />
        </>
      )}
    </>
  )
}

export default EventListScreen
