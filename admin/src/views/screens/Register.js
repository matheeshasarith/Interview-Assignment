import { Fragment, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleLogin } from '@store/actions/auth'
import { Link, useHistory } from 'react-router-dom'
import { AbilityContext } from '@src/utility/context/Can'
import InputPasswordToggle from '@components/input-password-toggle'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, CustomInput } from 'reactstrap'
import { registerUser } from '../../redux/actions/users/userActions'
import Message from '../../components/Message'

//* My codes
import '@styles/base/pages/page-auth.scss'

const Register = ({history}) => {

   const { register, errors, handleSubmit, trigger } = useForm()

   const [username, setUsername] = useState('')
   const [valErrors, setValErrors] = useState({})
   const [terms, setTerms] = useState(false)
   const [name, setName] = useState('')
   const [address, setAddress] = useState('')
   const [contactNo, setContactNo] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)

   const dispatch = useDispatch()
 
   const userRegister = useSelector((state) => state.userRegister)
   const { loading, error, userInfo } = userRegister
 
   const redirect = location.search ? location.search.split('=')[1] : '/login'
 
   useEffect(() => {
     if (userInfo) {
       history.push(redirect)
     }
   }, [history, userInfo, redirect])

   const submitHandler = (e) => {
  
     if (password !== confirmPassword) {
       setMessage('Passwords do not match')
     } else {
    dispatch(registerUser(name, email, password, address, contactNo))
     }
   }
 
  const ability = useContext(AbilityContext)

  const [skin, setSkin] = useSkin()

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }

  const handleUsernameChange = e => {
    const errs = valErrors
    if (errs.username) delete errs.username
    setUsername(e.target.value)
    setValErrors(errs)
  }

  const handleEmailChange = e => {
    const errs = valErrors
    if (errs.email) delete errs.email
    setEmail(e.target.value)
    setValErrors(errs)
  }


  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <h2 className='brand-text text-primary ml-1'>Assignment</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>
            <CardText className='mb-2'>Make your app management easy and fun!</CardText>
            {message && <Message variant='danger'><div className='alert-body font-small-2'>
                <p>
                  <small className='mr-50'>
                    <span className='font-weight-bold'>{message}</span>
                  </small>
                </p>
              </div></Message>}
            {error && <Message variant='danger'><div className='alert-body font-small-2'>
                <p>
                  <small className='mr-50'>
                    <span className='font-weight-bold'>{error}</span>
                  </small>
                </p>
              </div></Message>}
            <Form className='auth-register-form mt-2'  onSubmit={handleSubmit(submitHandler)}>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={name}
                  placeholder='johndoe'
                  id='register-username'
                  name='register-username'
                  onChange={(e) => setName(e.target.value)}
                  className={classnames({ 'is-invalid': errors['register-username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='description'>
                  Home Address
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={address}
                  placeholder='Address'
                  id='description'
                  name='description'
                  onChange={(e) => setAddress(e.target.value)}
                  className={classnames({ 'is-invalid': errors['address'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='contact'>
                  Contact No
                </Label>
                <Input
                  autoFocus
                  type='number'
                  value={contactNo}
                  placeholder='0319856452'
                  id='contact'
                  name='contact'
                  onChange={(e) => setContactNo(e.target.value)}
                  className={classnames({ 'is-invalid': errors['contact'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {/* {Object.keys(valErrors).length && valErrors.username ? (
                  <small className='text-danger'>{valErrors.username}</small>
                ) : null} */}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input
                  type='email'
                  value={email}
                  id='register-email'
                  name='register-email'
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='john@example.com'
                  className={classnames({ 'is-invalid': errors['register-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {/* {Object.keys(valErrors).length && valErrors.email ? (
                  <small className='text-danger'>{valErrors.email}</small>
                ) : null} */}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='register-password'
                  name='register-password'
                  className='input-group-merge'
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['register-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirm-password'>
                  Confirm Password
                </Label>
                <InputPasswordToggle
                  value={confirmPassword}
                  id='confirm-password'
                  name='confirm-password'
                  className='input-group-merge'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['confirm-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  id='terms'
                  name='terms'
                  value='terms'
                  label={<Terms />}
                  className='custom-control-Primary'
                  innerRef={register({ required: true })}
                  onChange={e => setTerms(e.target.checked)}
                  invalid={errors.terms && true}
                />
              </FormGroup>
              <Button.Ripple type='submit' block color='primary'>
                Sign up
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
