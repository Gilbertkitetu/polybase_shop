import React, { useState, useEffect } from "react";



import logo from "../images/pexels.jpg";

//import style
import './styles/home.css'

//import components
import Categories from './cart';
import CategoryDir from "./homeComponents/categoryDir";
import Data from "./Data";
import { Carousel, Col, Card, Row, Button, ListGroup } from "react-bootstrap";
import ProductCard from "./homeComponents/ProductCard";


function Home() {


  // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  // const listItems = numbers.map((number) => 
  // <li className="product-item">{number}</li>
  // );

  useEffect(() => {
    console.log(`Products: ${Data.products[0].productname}`)
  }, [])


  function alertClicked() {
    alert('You clicked the third ListGroupItem');
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
              <ListGroup.Item action onClick={alertClicked} >
                Home & Office
              </ListGroup.Item>
              <ListGroup.Item action onClick={alertClicked}>
                Health & Beauty
              </ListGroup.Item>
              <ListGroup.Item action onClick={alertClicked}>
                Phones
              </ListGroup.Item>
              <ListGroup.Item action onClick={alertClicked}>
                Electronics
              </ListGroup.Item>
              <ListGroup.Item action onClick={alertClicked}>
                Fashion
              </ListGroup.Item>
              <ListGroup.Item action onClick={alertClicked}>
                Sporting Goods
              </ListGroup.Item>
              <ListGroup.Item action onClick={alertClicked}>
                Gaming
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>


        <Col sm md={8} className="w-400" class="rounded-1">
          <Carousel >
            <Carousel.Item>
              <img className="d-block w-100" src="https://images.pexels.com/photos/2893540/pexels-photo-2893540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="First slide" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>What is this photo about</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
              <img className="d-block w-100" src="https://images.pexels.com/photos/3373731/pexels-photo-3373731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="First slide" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>What is this photo about</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
              <img className="d-block w-100" src="https://images.pexels.com/photos/2880732/pexels-photo-2880732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="First slide" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>What is this photo about</p>
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
            Data.products.map((item) => {
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