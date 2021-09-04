import React, { useState } from 'react';
import { Form, Button, Card, Nav } from 'react-bootstrap';


function CreateShop () {
    
    //create shop hooks
    const[shop_name, setShop_name] = useState('');
    const[location, setLocation] = useState('');

    //send to server
    function handleSubmit (event) {
        event.preventDefault();
        alert(`Shop name: ${shop_name}  Location: ${location}`)
    }

    return(
        <>
        <Card style={{ width: '30rem', padding: '20px'}}>
            <Card.Body>
                <h2 className="text-center mb-4">Create Shop</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="shop-name">
                        <Form.Label>Shop name</Form.Label>
                        <Form.Control type="text" required placeholder="Enter a unique shop name"
                        value={shop_name} onChange={(e) => {setShop_name(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group id="location">
                        <Form.Label>Shop Location</Form.Label>
                        <Form.Control type="text" required value={location} onChange={(e) => {setLocation(e.target.value)}}/> 
                    </Form.Group>
                    <Button className="w-100" type="submit">Create Shop</Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    );
}

export default CreateShop;