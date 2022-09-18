import React from 'react'
import { Row, Col } from 'react-bootstrap';


function CheckoutSteps(props) {
  return (
    <Row className='checkout-steps'>
        <Col className={props.steps1 ? 'active' : ''}>Sign In</Col>
        <Col className={props.steps2 ? 'active' : ''}>Delivery</Col>
        <Col className={props.steps3 ? 'active' : ''}>Payment</Col>
        <Col className={props.steps4 ? 'active' : ''}>Place Order</Col>
    </Row>
  )
}

export default CheckoutSteps