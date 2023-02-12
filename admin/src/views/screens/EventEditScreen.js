import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { listEventDetails, updateEvent} from '../../redux/actions/events/eventActions'
import { EVENT_UPDATE_RESET } from '../../redux/constants/events/eventConstants'
import { Card, CardHeader, CardTitle, CardBody, FormGroup, Row, Col, Input, Form, Button, Label, CustomInput } from 'reactstrap'

const EventEditScreen = ({ match, history }) => {

  const eventId = match.params.id

  const { register, errors, handleSubmit } = useForm()

  const [name, setName] = useState('')

  const [address, setAddress] = useState('')
  const [mail, setMail] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const eventDetails = useSelector((state) => state.eventDetails)
  const { loading, error, event } = eventDetails

  const eventUpdate = useSelector((state) => state.eventUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = eventUpdate

  useEffect(() => {

    if (successUpdate) {
      dispatch({ type: EVENT_UPDATE_RESET })
      history.push('/event-view-Business')
    } else {
      if (!event.name || event._id !== eventId) {
        dispatch(listEventDetails(eventId))
        
       
      } else {
    
        setName(event.name)
        setAddress(event.address)
        setMail(event.mail)
       
      }
    }
  }, [dispatch, history, eventId, event, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateEvent({
        _id: eventId,
        name,
        address,
        mail
      })
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Multiple Column</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={submitHandler}>
          <Row>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='nameMulti'>Name</Label>
                <Input type='text' name='name' id='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} innerRef={register({ required: true })} invalid={errors.name && true}/>
              </FormGroup>
            </Col>
            
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='lastNameMulti'>Address</Label>
                <Input type='text' name='description' id='description' placeholder='Description' value={address} onChange={(e) => setAddress(e.target.value)} innerRef={register({ required: true })} invalid={errors.address && true}/>
              </FormGroup>
            </Col>

            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='lastNameMulti'>Email</Label>
                <Input type='text' name='description' id='description' placeholder='Description' value={mail} onChange={(e) => setMail(e.target.value)} innerRef={register({ required: true })} invalid={errors.mail && true}/>
              </FormGroup>
            </Col>

            <Col sm='12'>
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Update
                </Button.Ripple>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default EventEditScreen
