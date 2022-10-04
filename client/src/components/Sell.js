import React, {useContext, useState,useMemo, useEffect, Fragment} from 'react'
import { Helmet } from 'react-helmet-async'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import './styles/sell.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import GlobalVariables from '../GlobalVariables'
import { Store } from '../Store'
import Select from 'react-select'
import './styles/Styles.css'

import 'react-dropzone-uploader/dist/styles.css'



function Sell() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, } = state;

const [file, setfile] = useState('')
const [filename, setfilename] = useState('Choose File')
const [uploadedFile, setuploadedFile] = useState({})
const [message, setmessage] = useState('')
const [uploadPercentage, setuploadPercentage] = useState(0)

const onChange = e => {
    setfile(e.target.files[0]);
    setfilename(e.target.files[0].name)
  
}
    const [nearAddresses, setnearAddresses] = useState([])

    const [shop, setshop] = useState({})


    const [latitude, setlatitude] = useState('')
    const [longitude, setlongitude] = useState('')
    const [productName, setproductName] = useState('');
    const [description, setdescription] = useState('');
    const [productCategory, setproductCategory] = useState('')
    const [productCondition, setproductCondition] = useState('')
    const [productBrand, setproductBrand] = useState('')
    const [productModel, setproductModel] = useState('')
    const [productPrice, setproductPrice] = useState('')
    const [productsInStock, setproductsInStock] = useState()
    const [productSize, setproductSize] = useState('')
    const [nearestTown, setnearestTown] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let slug = productName.replace(/ /g,"_");

        let productData = {
            productname: productName,
            slug: slug,
            price: productPrice,
            seller: userInfo._id,
            description: description,
            product_details: "",
            brand: productBrand,
            latitude: latitude,
            longitude: longitude,
            product_location: nearestTown,
            imagesrc: "",
            category: productCategory,
            countInStock: productsInStock,
            shop_name: shop.shop_name,
        
        }
        console.log(productData)

        const formData = new FormData();
        formData.append('file', file);
        // formData.append('productData', productData)
        

        try {
            const res = await axios.post(
                `${GlobalVariables.serverUrl}products/uploadphoto`,
                formData, {
                   
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: ProgressEvent => {
                    setuploadPercentage(
                        parseInt(
                            Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                        )
                    )
                }
            })
            
            //Clear percentage
            setTimeout(() => setuploadPercentage(0), 10000);

            const { filename, filePath, data } = res.data;

            console.log(data)

            setuploadedFile({ filename, filePath });

            setmessage('File Uploaded');

            if(filePath) {
                console.log(filePath)

                productData.imagesrc = filePath;

            const product = await axios.post(
                `${GlobalVariables.serverUrl}products/addproduct`, productData 
               
            );
            }

        } catch (err) {
            if(err) {
                setmessage('There was a problem with the server');
            } else {
                setmessage(err.response.data.message);
            }
            setuploadPercentage(0)
        }

        let data = [
            productName,
            description,
            productCategory,
            productCondition,
            productBrand,
            productModel,
            productPrice,
            productsInStock,
            productSize
        ]

        console.log(data);
    }

  
    useEffect(() => {

       //Get shop name and id
       console.log(userInfo._id)
       const shop1 =  axios.post(
        `${GlobalVariables.serverUrl}/shops/getShopbyuserid`, userInfo
        ).then(function (response) {
            console.log(response.data);
            setshop(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
       
        
        

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

  
  });
  
}
   
  },[]);

  return (
    <div>
        <Helmet>
            <title>Upload & Sell</title>
        </Helmet>
        <h2>Upload Product</h2>
        <Row>
            <Col>
            <Form onSubmit={handleSubmit}>

            <h6>Add product photo</h6>
            <div className='custom-file mb4'>
                <input type='file' name='file' className='custom-file-input'
                id='customFile' onChange={onChange}/>
                <label className='custom-file-label' htmlFor='customFile'>
                    {filename}
                </label>
            </div>

            <div className='progress'>
      <div
        className='progress-bar progress-bar-striped bg-success'
        role='progressbar'
        style={{ width: `${uploadPercentage}%` }}
      >
        {uploadPercentage}%
      </div>
    </div>

            {uploadedFile ? (
                <div className='row mt-5'>
                    <div className='col-md-6 m-auto'>
                        <h3 className='text-center'>{uploadedFile.filename}</h3>
                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                    </div>
                </div>
            ) : null}

            <Card>
            <Card.Header>Product Info</Card.Header>
            <Card.Body>
                <Form.Group className='mb-3' controlId='formBasic'>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter product name'
                    onChange={(e) => setproductName(e.target.value)}/>
                    <Form.Text className='text-muted'>
                    You will have a better chance to be discovered if your product name will be more informative
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasic'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" name="description"
                    onChange={(e) => setdescription(e.target.value)}/>
                    <Form.Text className='text-muted'>
                    Good description will help you be visible for search engines and avoid misunderstandings with the customers
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasic'>
                <Form.Label>Product Category</Form.Label>
                <select onChange={(e) => setproductCategory(e.target.value)}
                className="select"
                value={productCategory} required id='selectInput'>
                    <option value=''>Select Our Product Category</option>
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
                <Form.Group className='mb-3' controlId='formBasic'>
                    <Form.Label>Product Condition</Form.Label>
                    <Form.Check type="radio" name="productCondition" label="Brand New" value="BrandNew" onChange={(e) => setproductCondition(e.target.value)}/>
                    <Form.Check type="radio" name="productCondition"  label="Custom Made"  value="customMade"  onChange={(e) => setproductCondition(e.target.value)}/>
                    <Form.Check type="radio" name="productCondition"  label="Refurblished"  value="Refurblished"  onChange={(e) => setproductCondition(e.target.value)}/>
                    <Form.Check type="radio" name="productCondition"  label="Used" value="Used" onChange={(e) => setproductCondition(e.target.value)}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasic'>
                    <Form.Label>Brand Name</Form.Label>
                    <Form.Control type="text" 
                    onChange={(e) => setproductBrand(e.target.value)}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasic'>
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" 
                    onChange={(e) => setproductModel(e.target.value)}/>
                </Form.Group>

            </Card.Body>
            </Card>

            <Card>
            <Card.Header>Pricing and Stock</Card.Header>
            <Card.Body>
            <Form.Group className='mb-3' controlId='formBasic'>
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter product price'
                    onChange={(e) => setproductPrice(e.target.value)}/>
                
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasic'>
                    <Form.Label>How many in stock?</Form.Label>
                    <Form.Control type='number' placeholder='Enter number products in stock'
                    onChange={(e) => setproductsInStock(e.target.value)}/>
                
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasic'>
                    <Form.Label>Product Size</Form.Label>
                    <p>Evaluate your product size and mark the best vehicle to transport it with</p>
                    <Form.Check type="radio" name="productSize"  label="Bike" value="Bike" 
                     onChange={(e) => setproductSize(e.target.value)}/>
                    <Form.Check type="radio" name="productSize" label="Van"  value="Van"
                     onChange={(e) => setproductSize(e.target.value)}/>
                    <Form.Check type="radio" name="productSize" label="Truck"  value="Truck"
                     onChange={(e) => setproductSize(e.target.value)}/>
                    
                </Form.Group>

                <Form.Group className='mb-3' >
                    <Form.Label>Near Town/City</Form.Label>
                    <select onChange={(e) => setnearestTown(e.target.value)}
                    className="select"
                    value={nearestTown} required>
                        <option value=''>Select your nearest town/city</option>
                        {nearAddresses.map((option, index) => (
                            <option key={index} value={option.City}>
                                {option.City}
                            </option>
                        ))}
                    </select>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasic'>
                    <Button type='submit' variant='success'>Submit</Button>
                </Form.Group>
            </Card.Body>
            </Card>


            </Form>
            </Col>
        </Row>
    </div>
  )
}

export default Sell