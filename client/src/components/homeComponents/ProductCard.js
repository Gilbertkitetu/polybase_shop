import React, {useState, useEffect} from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import Ratings from './Ratings';

import { Link } from 'react-router-dom';

function ProductCard(props) {
  const { products } = props;

  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');


  useEffect(() => {
        //User Location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
  
  console.log(`latitude: ${position.coords.latitude}`)
  setlatitude(position.coords.latitude)
  console.log(`longitude: ${position.coords.longitude}`)
  setlongitude(position.coords.longitude)
  
  })

  }
  }, [])
  

  // let lat1 =  -0.437099;
  // let lon1 = 36.958010;

  // let lat2 =  -0.3974645;
  // let lon2 = 36.9648429;
//my location
// lat -0.3974645
//lon 36.9648429




  function distance(lat1, lon1, lat2, lon2) {
    console.log(lat1, lon1, lat2, lon2)
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    
    const dis = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    return parseFloat(dis).toFixed(2);
  }

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
          
          <ListGroup.Item><strong>KSh {products.price}</strong></ListGroup.Item>
          <ListGroup.Item><strong>Brand: </strong> {products.brand}</ListGroup.Item>
          <ListGroup.Item><strong>Location: </strong>{products.product_location}</ListGroup.Item>
          <ListGroup.Item><strong>Distance: </strong>≈ <strong>{distance(products.latitude, products.longitude, latitude, longitude)}</strong> km away</ListGroup.Item>
          <ListGroup.Item><strong>Units in stock: </strong>{products.countInStock}</ListGroup.Item>
          <ListGroup.Item> <Ratings rating={products.ratings} numReviews={products.numberReviews} /></ListGroup.Item>
        </ListGroup>
        <Link to={`/product/${products.slug}`}>
        <button className="button-3">ADD TO CART</button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default ProductCard