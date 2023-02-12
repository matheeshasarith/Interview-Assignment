import { useContext, useEffect } from 'react'
import { AbilityContext } from '@src/utility/context/Can'
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'


const AccessControl = () => {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()

  useEffect(() => {
   
  }, [dispatch])

  return (
   
    <Row>
      <Col md='6' sm='12'>
        <Card>
          <CardBody>
            <CardTitle tag='h4'>Assignment</CardTitle>
            <CardText></CardText>
            <CardText className='text-primary'></CardText>
            <CardText className='text-primary'></CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
   
  )
}

export default AccessControl
