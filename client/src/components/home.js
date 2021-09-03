import React from "react";

import logo from "../images/pexels.jpg";

//import style
//import './styles/home.css'

//import components
import Categories from './categories';
import CategoryDir from "./homeComponents/categoryDir";
import { Carousel , Col, Container, Row, Button, ListGroup} from "react-bootstrap";


function Home(){


    // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    // const listItems = numbers.map((number) => 
    // <li className="product-item">{number}</li>
    // );

    function alertClicked() {
        alert('You clicked the third ListGroupItem');
      }


    return(
        
     <>
          
           <Row>
    <Col sm md={2}>
        <div className="categories">
    <ListGroup defaultActiveKey="#link1">
    <ListGroup.Item action href="#link1">
      Categories
    </ListGroup.Item>
    <ListGroup.Item action href="#link2" disabled>
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
 
    
 <Col sm  md={8} className="w-400" >
          <Carousel >
              <Carousel.Item>
                  <img className="d-block w-100" src={logo}
                  alt="First slide"/>
                  <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>What is this photo about</p>
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item >
                  <img className="d-block w-100" src={logo}
                  alt="First slide"/>
                  <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>What is this photo about</p>
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item >
                  <img className="d-block w-100" src={logo}
                  alt="First slide"/>
                  <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>What is this photo about</p>
                  </Carousel.Caption>
              </Carousel.Item>
          </Carousel>
          </Col>

          <Col sm md={2}>Right</Col>

          </Row>
    
        
        <Button className="w-100" type="submit">Load More</Button>
      

        </>
    
        
    );
}

export default Home;