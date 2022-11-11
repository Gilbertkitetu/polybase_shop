import React, { useState, useEffect, useReducer} from "react";

import axios from 'axios'
import GlobalVariables from "../GlobalVariables";
import { getError } from "../utils";

import logo from "../images/pexels.jpg";

//import style
import './styles/home.css'

//import components
import Categories from './cart';
import CategoryDir from "./homeComponents/categoryDir";
// import Data from "./Data";
import { Carousel, Col, Card, Row, Button, ListGroup } from "react-bootstrap";
import ProductCard from "./homeComponents/ProductCard";


function Home() {

  const [latitude, setlatitude] = useState('')
  const [longitude, setlongitude] = useState('')

  
  function distance(lat1, lon1, lat2, lon2) {
    // console.log(lat1, lon1, lat2, lon2)
     var p = 0.017453292519943295;    // Math.PI / 180
     var c = Math.cos;
     var a = 0.5 - c((lat2 - lat1) * p)/2 + 
             c(lat1 * p) * c(lat2 * p) * 
             (1 - c((lon2 - lon1) * p))/2;
   
     
     const dis = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
     return parseFloat(dis).toFixed(2);
   }


   const [Products, setproducts] = useState([])
  

  const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
});



const search = (category) => {

  console.log(category)
  
  window.location.href = `${category}` ? `/search/?category=${category}` : `/search`
}


function alertClicked() {
  alert('You clicked the third ListGroupItem');
}



  useEffect(() => {
    console.log("Hello home")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        console.log(`latitude: ${position.coords.latitude}`)
        setlatitude(position.coords.latitude)
        console.log(`longotude: ${position.coords.longitude}`)
        setlongitude(position.coords.longitude)
      })
      }

    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
          axios.get(`${GlobalVariables.serverUrl}get_products`).then(res => {
            console.log(res.data)
            setproducts(res.data)
            dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
          });
          
           //result.data
      } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
  };

    fetchProducts()
  }, [])

  function handleDistanceSort(products) {
    console.log(products)
    let productsMapped = products.map((element) => ({
      ...element,
      distance: distance(latitude, longitude, element.latitude, element.longitude)
    }))
    console.log(productsMapped)
    return productsMapped.sort((a, b) => Number(a.distance) -  Number(b.distance))
  
  }

  return (

    <>

      <Row>
        <Col sm md={2}>
          <div className="categories">
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item action href="#link1" style={{ backgroundColor: "#2ea44f", borderRadius: "none" }}>
                Categories
              </ListGroup.Item>
           
              <ListGroup.Item action onClick={
                (event) => {search('Home&Office')}} >
                Home & Office
              </ListGroup.Item>
              <ListGroup.Item action onClick={(event) => {search('Health')}}>
                Health
              </ListGroup.Item>
              <ListGroup.Item action  onClick={(event) => {search('Phones')}}>
                Phones
              </ListGroup.Item>
              <ListGroup.Item action  onClick={(event) => {search('Electronics')}}>
                Electronics
              </ListGroup.Item>
              <ListGroup.Item action  onClick={(event) => {search('Clothes')}}>
                Clothes
              </ListGroup.Item>
              <ListGroup.Item action  onClick={(event) => {search('Shoes')}}>
                Shoes
              </ListGroup.Item>
              <ListGroup.Item action  onClick={(event) => {search('Gaming')}}>
                Gaming
              </ListGroup.Item>
              <ListGroup.Item action  onClick={(event) => {search('Laptops')}}>
                Laptops
              </ListGroup.Item>
              {/* <ListGroup.Item action  onClick={(event) => {search('Desktop')}}>
                Desktop
              </ListGroup.Item> */}
              {/* <ListGroup.Item action  onClick={(event) => {search('Accessories')}}>
                Accessories
              </ListGroup.Item> */}
              <ListGroup.Item action  onClick={(event) => {search('Beauty')}}>
                Beauty
              </ListGroup.Item>
              {/* <ListGroup.Item action  onClick={(event) => {search('Sports')}}>
                Sports
              </ListGroup.Item> */}
            </ListGroup>
          </div>
        </Col>


        <Col sm md={8} className="w-400" class="rounded-1">
          <Carousel >
            <Carousel.Item>
              <img className="d-block w-100" src="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="First slide" />
              <Carousel.Caption>
                <h3>HP Pavilion Gaming 15-dk10000 Laptop PC (8VD49AV) 8GB Ram 256SSD 4GB Nvidia Graphics</h3>
                <p>Get more products here</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
              <img className="d-block w-100" src="https://images.pexels.com/photos/3373731/pexels-photo-3373731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="First slide" />
              <Carousel.Caption>
                <h3>Qwen Magnetic Eyeliner & Eyelashes False Eye Lashes Reusable</h3>
                <p>Get more beauty products here</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
              <img className="d-block w-100" src="https://images.pexels.com/photos/2880732/pexels-photo-2880732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="First slide" />
              <Carousel.Caption>
                <h3>Qwen Mini Wireless Mouse & Keyboard Combo - white</h3>
                <p>Get more accessories here</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col sm md={2}>
          <div className="categories">
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item action href="#link1" style={{ backgroundColor: "#2ea44f", borderRadius: "none" }}>
                Help Center
              </ListGroup.Item>

              <ListGroup.Item action onClick={alertClicked}>
                Guide to customer care
              </ListGroup.Item>

              <ListGroup.Item action onClick={alertClicked}>
                Contacts
              </ListGroup.Item>


              <ListGroup.Item action onClick={alertClicked}>
                FAQ's
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>

      </Row>


      <div className="products">
        <Row className="w-100">

          {
            handleDistanceSort(Products).map((item) => {
              return (
                <Col>
                <ProductCard products = {item}/>
                </Col>
              )
            })

          }

        </Row>

      </div>

      <button className="button-3" type="submit">Load More</button>


    </>


  );
}

export default Home;