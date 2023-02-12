import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import Flatpickr from 'react-flatpickr'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { createEvent } from '../../redux/actions/events/eventActions'

import { EVENT_UPDATE_RESET, EVENT_CREATE_RESET } from '../../redux/constants/events/eventConstants'

import { Card, CardHeader, CardTitle, CardBody, FormGroup, Row, Col, Input, Form, Button, Label, CustomInput, CardText } from 'reactstrap'


import '@styles/react/libs/flatpickr/flatpickr.scss'

const defaultValues = {
  selectType: null,
  selectCategory: null,
  customFile: null,
  defaultpicker: null
}

const MultipleColumnForm = ({ match, history }) => {
  
  const eventId = match.params.id

  const [data, setData] = useState(null)

  const { register, errors, handleSubmit } = useForm()
  
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [mail, setMail] = useState('')

  const [uploading, setUploading] = useState(false)

  const [date, setPicker] = useState(new Date())
  

  const dispatch = useDispatch()


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const eventUpdate = useSelector((state) => state.eventUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = eventUpdate

  const eventCreate = useSelector((state) => state.eventCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    event: createdEvent
  } = eventCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: EVENT_CREATE_RESET })
      history.push('/event-view-Business')
    } 
  }, [dispatch, history, eventId, event, successCreate])

  const submitHandler = (data) => {
    setData(data)
    dispatch(
      createEvent({
        name,
        address,
        mail
      })
    )
  }

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Create an Event</CardTitle>
      </CardHeader>
      <CardBody>
     
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
       
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='nameMulti'>Name</Label>
                <Input type='text' name='name' id='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} innerRef={register({ required: true })} invalid={errors.name && true}/>
              </FormGroup>
            </Col>

            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='nameMulti'>Email</Label>
                <Input type='email' name='name' id='name' placeholder='example@gmail.com' value={mail} onChange={(e) => setMail(e.target.value)} innerRef={register({ required: true })} invalid={errors.mail && true}/>
              </FormGroup>
            </Col>
            
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='lastNameMulti'>Address</Label>
                <Input type='text' name='description' id='description' placeholder='Description' value={address} onChange={(e) => setAddress(e.target.value)} innerRef={register({ required: true })} invalid={errors.address && true}/>
              </FormGroup>
            </Col>

            <Col sm='12'>
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Create
                </Button.Ripple>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
    </div>
    
  )
}
export default MultipleColumnForm
