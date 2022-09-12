import React, { useState, useMemo, useEffect } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'

import { Form, Button, Card, Nav } from 'react-bootstrap';

import "./styles/createShop.css"

import Data from './Data';


function CreateShop() {

    const options = useMemo(() => countryList().getData(), [])
    const countries = useMemo(() => Data.Counties, [])
    console.log(`Counties: ${Data.Counties}`)


    const [value, setValue] = useState('')
    // const [country, setcountry] = useState('');
    // const [countystate, setcounty] = useState('')


    //create shop hooks
    const [shop_name, setShop_name] = useState('');
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('Kenya');
    const [county, setCounty] = useState('');
    const [town, setTown] = useState('');

    useEffect(() => {
        getLocation()
    }, [])
    

    //send to server
    function handleSubmit(event) {
        event.preventDefault();
        alert(`Shop name: ${shop_name}  Location: ${location}`)
        getLocation()
    }

    //GET USER LOCATION
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Location not supported by browser")
        }
    }

    function showPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(`Lat : ${latitude} long : ${longitude}`)
    }

    return (
        <>
            <Card style={{ width: '30rem', padding: '20px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create a Shop</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="shop-name">
                            <Form.Label>Shop name</Form.Label>
                            <Form.Control type="text" required placeholder="Enter a unique shop name"
                                value={shop_name} onChange={(e) => { setShop_name(e.target.value) }} />
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" required value={location} onChange={(e) => { setLocation(e.target.value) }} />
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Shop Email</Form.Label>
                            <Form.Control type="text" required value={location} onChange={(e) => { setLocation(e.target.value) }} />
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Shop Location</Form.Label>
                            <Form.Control type="text" required value={location} onChange={(e) => { setLocation(e.target.value) }} />
                        </Form.Group>
                        <Form.Group id="location">
                            <Form.Label>Country</Form.Label>
                            <Select options={options} value={country} onChange={(value) => setCountry(value) } />
                        </Form.Group>
                        <Form.Group id="location">
                            <Form.Label>County</Form.Label>
                            <Select options={countries} value={county} onChange={(value) => setCounty(value)} />
                        </Form.Group>
                        <Form.Group id="location">
                            <Form.Label>City/Town</Form.Label>
                            <Form.Control type="text" required value={location} onChange={(e) => { setLocation(e.target.value) }} />
                        </Form.Group>


                        <Form.Group id="location">
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text" required value={location} onChange={(e) => { setLocation(e.target.value) }} />
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Mpesa Registered Number</Form.Label>
                            <Form.Control type="text" required value={location} onChange={(e) => { setLocation(e.target.value) }} />
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Till Number</Form.Label>
                            <Form.Control type="text" required value={location} onChange={(e) => { setLocation(e.target.value) }} />
                        </Form.Group>

                        <button className="button-3" type="submit">Create Shop</button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default CreateShop;