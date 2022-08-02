import React from 'react'
import {Card, ListGroup } from 'react-bootstrap';



function ProductCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={props.products.imagesrc} />
    <Card.Body>
     
      <Card.Text>
        {props.products.productname}
      </Card.Text>
    </Card.Body>
  
    <Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>KSh {props.products.price}</ListGroup.Item>
      <ListGroup.Item><s>KSh 30000</s></ListGroup.Item>
    
    </ListGroup>
    <button >
    </Card.Body>
  </Card>
  )
}

export default ProductCard