import React, {useContext, useState,useMemo, useEffect} from 'react'
import { Helmet } from 'react-helmet-async'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Store } from '../Store'
import CheckoutSteps from '../Screens/CheckoutSteps'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Data from './Data'
import './styles/Styles.css'


function ShippingAddress() {

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const countries = useMemo(() => Data.Counties, [])
    console.log(`Counties: ${Data.Counties}`)
  

  
    const navigate  = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [county, setCounty] = useState(shippingAddress.county || '')

    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [nearAddresses, setnearAddresses] = useState([])
    const [nearCity, setnearCity] = useState([])

    // const options = useMemo(() => countryList().getData(), [])
    // const nearAddresses = useMemo(() => Data.Counties, [])


    useEffect(() => {

       

          //User Location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position);
      console.log(`latitude: ${position.coords.latitude}`)
      setlatitude(position.coords.latitude)
      console.log(`longotude: ${position.coords.longitude}`)
      setlongitude(position.coords.longitude)

    //Near Locations Address
      const option = {
        method: 'GET',
        url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
        params: {latitude: position.coords.latitude, longitude: position.coords.longitude, range: '0'},
        headers: {
          'X-RapidAPI-Key': '045412b31amsh673fa8c42aa3d8cp1d9805jsn019373048925',
          'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
        }
      };
      
      axios.request(option).then(function (response) {
          console.log(response.data);
     

          setnearAddresses(response.data)

      }).catch(function (error) {
          console.error(error);
      });



      const optio = {
        method: 'GET',
        url: 'https://geocodeapi.p.rapidapi.com/GetLargestCities',
        params: {latitude: position.coords.latitude, longitude: position.coords.longitude, range: '50000'},
        headers: {
          'X-RapidAPI-Key': '045412b31amsh673fa8c42aa3d8cp1d9805jsn019373048925',
          'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
        }
      };
      
      axios.request(optio).then(function (response) {
          console.log(response.data);

          setnearCity(response.data)
       

      }).catch(function (error) {
          console.error(error);
      });
    
    });
    
}
        if (!userInfo) {
            navigate('/login?redirect=/shipping')
        }
    },[userInfo, navigate]);


    const submitHandler = (e) => {
        e.preventDefault()
        let country1 = country.label;
        let county1 = county.label;
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                latitude,
                longitude,
                fullName,
                address,
                city,
                country1,
                county1
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                latitude,
                longitude,
                fullName,
                address,
                city,
                country1,
                county1
            })
        );
        navigate('/payment');
    

    }
  return (
    <div>
        <Helmet>
            <title>Delivery Address</title>
        </Helmet>

        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className='container small-container'>
            <h1 className='my-3'>Delivery Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='fullName'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} required/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='address'>
                    <Form.Label>Your Address</Form.Label>
                    
                    <select onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    required
                    name='nearAddresses' id='address'  className='select'>
                        <option>Select your nearest address</option>
                        {nearAddresses.map((option, index) => (
                            <option key={index} value={option.City}>
                                {option.City}
                            </option>
                        ))}
                    </select>
                </Form.Group>
      
                <Form.Group className='mb-3' controlId='city'>
                    <Form.Label>Nearest City</Form.Label>
                    {/* <Form.Control value={city} 
                    onChange={(e) => setCity(e.target.value)} required/> */}
                     <select onChange={(e) => setCity(e.target.value)}
                    value={city}
                    required
                    name='nearCity' id='city' className='select'>
                        <option value=''>Select your nearest city or town</option>
                        {nearCity.map((option, index) => (
                            <option key={index} value={option.City}>
                                {option.City}
                            </option>
                        ))}
                    </select>
                </Form.Group>

                <Form.Group id="location">
                            <Form.Label>Country</Form.Label>
                            <Select options={options} value={country} 
                            onChange={(value) => setCountry(value)} required />
                </Form.Group>
                <Form.Group id="location">
                            <Form.Label>County</Form.Label>
                            <Select options={countries} value={county}
                            onChange={(value) => setCounty(value)} required />
                </Form.Group>
                
                <div className='mb-3'>
                    <Button variant='success' type='submit'>
                        Continue
                    </Button>
                </div>
               
            </Form>
        </div>
    </div>
  )
}

export default ShippingAddress