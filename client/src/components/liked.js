import React from 'react';
import "./styles/liked.css";

import { Carousel , Col, Card, Row, Button, ListGroup} from "react-bootstrap";

import logo from "../images/logo.png"
import empty from "../images/empty.svg";


function Liked(){
    return (
        <>
        
            <Row>
                <Col sm md={4}>
                    <Card>
                        <Card.Header>Gilbert</Card.Header>
                    </Card>
                </Col>
                <Col sm md={8}>
                    <Card>
                    <Card.Header>
                    <Row>
                        <Col sm={6} md={6}><h3>My Favoite</h3> </Col>
                    <Col sm ={6} md={6}>
                    <Button>Search</Button>
                    </Col>
                    </Row></Card.Header>
                    <Card.Body>
                        
                        <div className = "empty">
                        <h4>It's empty here</h4>
                        </div>
                        {/* <img src={empty}/> */}
                    </Card.Body>
                    </Card>
                </Col>
            </Row>

        </>
    );
}


export default Liked;