import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
        <Row>
            <Col md={4}>
                <Card>
                    
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <h3>Number of shops</h3>
                    <h2>100</h2>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <h3>Number of orders</h3>
                    <h2>100</h2>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
                
            </Col>
        </Row>
    </div>
  )
}

export default Dashboard