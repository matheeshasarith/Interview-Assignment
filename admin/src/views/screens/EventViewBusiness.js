import React, { useEffect, useContext } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Row, Col } from 'react-bootstrap'
import { Button, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, CardBody, Card, CardHeader, CardTitle, CardText  } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/PaginateBisinessEvent'
import {Link, NavLink } from "react-router-dom"
import { MoreVertical, Edit, Trash } from 'react-feather'
import { AbilityContext } from '@src/utility/context/Can'
import Select from 'react-select'

import '@styles/react/libs/flatpickr/flatpickr.scss'

import {
  listEvents,
  deleteEvent,
  createEvent

} from '../../redux/actions/events/eventActions'

import { EVENT_CREATE_RESET } from '../../redux/constants/events/eventConstants'

const EventListScreen = ({ history, match }) => {

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const eventList = useSelector((state) => state.eventList)
  const { loading, error, events, page, pages } = eventList

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

    if (successCreate) {
      history.push(`/event/${createdEvent._id}/edit`)
    } else {
      dispatch(listEvents('', pageNumber))
    }
  }, [
    dispatch,
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
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='12'>
              <Select
                className='react-select'
                classNamePrefix='select'
                onChange={data => {
                  dispatch(
                    
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Row className='align-items-center'>
        <Col>
          <h1>Crud Application</h1>
        </Col>
        <Col className='d-flex align-items-center justify-content-end mt-1' md='3' sm='12'>
          <Button.Ripple tag={Link} to='/event/create' color='primary'>
            Add Record
          </Button.Ripple>
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
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>      
                <th>Create</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{event.address}</td>
                  <td>{event.mail}</td>
                  <td>
                  <LinkContainer  to={`/event/create`}>
                    <Button variant='light' className='btn-sm'>
                     Create
                    </Button>
                  </LinkContainer>
                  </td>
                  <td>
                    <LinkContainer to={`/event/${event._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'>Update</i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(event._id)}
                    >
                      <i className='fas fa-trash'>Delete</i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default EventListScreen
