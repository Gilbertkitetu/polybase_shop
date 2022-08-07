import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import Ratings from './Ratings';

import { Link } from 'react-router-dom';

function ProductCard(props) {
  const { products } = props;
  return (
    <Card style={{ width: '15rem' }} key={products.slug}>
      <Card.Body>

        <Link to={`/product/${products.slug}`}>
          <Card.Img variant="top" src={products.imagesrc} alt={products.productname} />
        </Link>
        <Card.Text>
          {products.productname}
        </Card.Text>

        <ListGroup className="list-group-flush">
          <ListGroup.Item>KSh {products.price}</ListGroup.Item>
          {/* <ListGroup.Item><s>KSh 30000</s></ListGroup.Item> */}
          <ListGroup.Item> <Ratings rating={products.ratings} numReviews={products.numberReviews} /></ListGroup.Item>
        </ListGroup>
        <button className="button-3">ADD TO CART</button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard