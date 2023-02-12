import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@components/avatar'
import { toast, Slide } from 'react-toastify'
import { Facebook, Twitter, Mail, GitHub, Coffee } from 'react-feather'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'

const ToastContent = ({ message, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Hello, {message}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an user to Event Management. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const Home = ({ history, match }) => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    // if (!userInfo) {
    //   history.push('/login')
    // } else {
    //   // history.push('/login')
    //   toast.success(
    //     <ToastContent message={userInfo.name} role={'admin'} />,
    //     { transition: Slide, hideProgressBar: true, autoClose: 2000 }
    //   )
    // }
  }, [dispatch, history, userInfo])

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Kick start your project 🚀</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>All the best for your new project.</CardText>
          <CardText>
            Please make sure to read our{' '}
            <CardLink
              href='https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/'
              target='_blank'
            >
              Template Documentation
            </CardLink>{' '}
            to understand where to go from here and how to use our template.
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Want to integrate JWT? 🔒</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.
          </CardText>
          <CardText>
            Please read our{' '}
            <CardLink
              href='https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/development/auth'
              target='_blank'
            >
              JWT Documentation
            </CardLink>{' '}
            to get more out of JWT authentication.
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
