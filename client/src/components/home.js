import React from "react";

import logo from "../images/pexels.jpg";

//import style
//import './styles/home.css'

//import components
import Categories from './categories';
import CategoryDir from "./homeComponents/categoryDir";
import { Carousel , Col, Card, Row, Button, ListGroup} from "react-bootstrap";


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


    <div className="products">
        <Row>
            <Col sm md="auto">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>

            </Col>
            <Col sm md="auto">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>

            </Col>
            <Col sm md="auto">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>

            </Col>
            <Col sm md="auto">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>

            </Col>
            <Col sm md="auto">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>

            </Col>
        </Row>
   
    </div>
        
        <Button className="w-100" type="submit">Load More</Button>
      

        </>
    
        
    );
}

export default Home;