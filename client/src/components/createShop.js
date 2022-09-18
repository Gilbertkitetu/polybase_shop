import React, { useState, useMemo, useEffect, useContext, useReducer } from 'react';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import countryList from 'react-select-country-list'
import GlobalVariables from '../GlobalVariables';
import { toast } from 'react-toastify';

import { Form, Button, Card, Nav } from 'react-bootstrap';

import "./styles/createShop.css"

import Data from './Data';
import { getError } from '../utils';


const reducer = (state, action) => {
    switch (action.type) {
      case 'CREATE_REQUEST':
        return { ...state, loading: true };
      case 'CREATE_SUCCESS':
        return { ...state, loading: false };
      default:
        return state;
    }
  };


function CreateShop() {

    const options = useMemo(() => countryList().getData(), [])
    const countries = useMemo(() => Data.Counties, [])
    console.log(`Counties: ${Data.Counties}`)

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
      });
  
      
    const [value, setValue] = useState('')
    // const [country, setcountry] = useState('');
    // const [countystate, setcounty] = useState('')


  
    const navigate  = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const {
        userInfo,
        
    } = state;

    const [towns, setTowns] = useState([]);
    //create shop hooks
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
   
    const [shop_name, setShop_name] = useState('');
    const [shop_phone_number, setshop_phone_number] = useState('')
    const [bussinessCategory, setbussinessCategory] = useState('')

    const [shop_email, setshop_email] = useState('')
    const [shopLocation, setshopLocation] = useState('');
    const [country, setCountry] = useState('Kenya');
    const [county, setCounty] = useState('');
    const [town, setTown] = useState('');
    const [mpesaName, setmpesaName] = useState('');
    const [mpesaNumber, setmpesaNumber] = useState('');
    const [tillNumber, settillNumber] = useState('');
    const [id_number, setid_number] = useState('')
    const [krapin, setkrapin] = useState('');

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
        //   let nearlocationsArray = [];
        //   let nearlocationsObj = response.data;
        //   nearlocationsObj.forEach((Location) => {
        //     console.log(Location)
        //     nearlocationsArray.push(Location.City)
        //     console.log(`Arra of city : ${Location.City}`)
            

        //   })

        setTowns(response.data)

      }).catch(function (error) {
          console.error(error);
      });

    
    });
    
}
        if (!userInfo) {
            navigate('/login?redirect=/shipping')
        }
    }, [userInfo, navigate])
    

    //send to server
    function handleSubmit(event) {
        event.preventDefault();
        let country1 = country.label;
        let county1 = county.label;
        let data = [
            latitude,
            longitude,
            shop_name,
            shop_phone_number,
            shop_email,
            bussinessCategory,
            shopLocation,
            country1,
            county1,
            town,
            mpesaName,
            mpesaNumber,
            tillNumber,
            id_number,
            krapin,
            userInfo._id
        ]

        console.log(data)

        try {
            dispatch({ type: 'CREATE_REQUEST' });
            
            axios.post(
                `${GlobalVariables.serverUrl}shops/create-shop`,{
                    latitude: latitude,
                    longitude: longitude,
                    shop_name: shop_name,
                    shop_phone_number: shop_phone_number,
                    shop_email: shop_email,
                    bussinessCategory: bussinessCategory,
                    shopLocation: shopLocation,
                    country1: country1,
                    county1: county1,
                    town: town,
                    mpesaName: mpesaName,
                    mpesaNumber: mpesaNumber,
                    tillNumber: tillNumber,
                    id_number: id_number,
                    krapin: krapin,
                    user_id: userInfo._id
                }, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            //Navigate

        } catch (err) {
            dispatch({ type: 'CREATE_FAIL' })
            toast.error(getError(err));
        }

       
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
                            <Form.Control type="text" required value={shop_phone_number} onChange={(e) => { setshop_phone_number(e.target.value) }} />
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Shop Email</Form.Label>
                            <Form.Control type="email" required value={shop_email} onChange={(e) => { setshop_email(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formBasic'>
                    <Form.Label>Bussiness Category</Form.Label>

                    <select onChange={(e) => setbussinessCategory(e.target.value)}
                     value={bussinessCategory} className='select' required >
                        <option value=''>Select Bussiness Category</option>
                        <option value='General'>General</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Laptops'>Laptops</option>
                        <option value='Accessories'>Accessories</option>
                        <option value='Clothes'>Clothes</option>
                        <option value='Shoes'>Shoes</option>
                        <option value='Beauty'>Beauty</option>
                        <option value='Health'>Health</option>
                        <option value='Sports'>Sports</option>
                        <option value='Cameras'>Cameras</option>
                        <option value='Phones'>Phones</option>
                        <option value='Desktop'>Desktop</option>
                        <option value='Home&Office'>Home & Office</option>
                        <option value='Gaming'>Gaming</option>
                    </select>

                        <Form.Text className='text-muted'>
                            Please pick carefully as it is the most important feature to assure your product discoverability.
                        </Form.Text>


                    </Form.Group>
                        <Form.Group id="location">
                            <Form.Label>Shop Location</Form.Label>
                            <Form.Control type="text" required value={shopLocation} onChange={(e) => { setshopLocation(e.target.value) }} />
                            <Form.Text className=''>Describe bussiness location to your local customers</Form.Text>
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Country</Form.Label>
                            <Select options={options} value={country} 
                            onChange={(value) => setCountry(value) } />
                        </Form.Group>
                        <Form.Group id="location">
                            <Form.Label>County</Form.Label>
                            <Select options={countries} value={county} 
                            onChange={(value) => setCounty(value)} />
                        </Form.Group>
                        <Form.Group id="location">
                            <Form.Label>City/Town</Form.Label>
                            {/* <Form.Control type="text" required value={location} onChange={(e) => { setLocation(e.target.value) }} /> */}
                            <select onChange={(e) => setTown(e.target.value)}
                            value={town} required className='select'>
                                <option value=''>Select Your Nearest Town or City</option>
                                {
                                    towns.map((option, index) => (
                                        <option key={index} value={option.City}>
                                            {option.City}
                                        </option>
                                    ))
                                }
                            </select>
                        </Form.Group>


                        <Form.Group id="location">
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text" required value={id_number} onChange={(e) => { setid_number(e.target.value) }} />
                        </Form.Group>
                        <Form.Group id="location">
                            <Form.Label>KRA PIN</Form.Label>
                            <Form.Control type="text" required value={krapin} onChange={(e) => { setkrapin(e.target.value) }} />
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Mpesa Registered Number</Form.Label>
                            <Form.Control type="text" required value={mpesaNumber} onChange={(e) => { setmpesaNumber(e.target.value) }} />
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Mpesa Name</Form.Label>
                            <Form.Control type="text" required value={mpesaName} onChange={(e) => { setmpesaName(e.target.value) }} />
                        </Form.Group>

                        <Form.Group id="location">
                            <Form.Label>Till Number</Form.Label>
                            <Form.Control type="text" required value={tillNumber} onChange={(e) => { settillNumber(e.target.value) }} />
                        </Form.Group>

                        <button className="button-3" type="submit">Create Shop</button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default CreateShop;