import React, {useState, useEffect, useContext, useReducer} from 'react'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import {Form, Card, Row, Button, Col} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import ProductCard from './homeComponents/ProductCard';
import GlobalVariables from '../GlobalVariables';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false };
      case 'UPLOAD_REQUEST':
        return { ...state, loadingUpload: true, errorUpload: '' };
      case 'UPLOAD_SUCCESS':
        return {
          ...state,
          loadingUpload: false,
          errorUpload: '',
          products: action.payload.Products,
          page: action.payload.page,
          pages: action.payload.pages,
          loading: false,
        };
      case 'UPLOAD_FAIL':
        return { ...state, loadingUpload: false, errorUpload: action.payload };
  
      default:
        return state;
    }
  };

function ShopPublicView() {

    const [
        {
          loading,
          error,
          products,
          pages,
          loadingCreate,
          loadingDelete,
          successDelete,
        },
        dispatch,
      ] = useReducer(reducer, {
        loading: true,
        error: '',
      });

    const navigate = useNavigate();
    const params = useParams(); // /product/:id
    const { id: seller } = params;

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const page = sp.get('page') || 1;
  
    const { state } = useContext(Store);
  const { userInfo } = state;

  const [shopDetails, setshopDetails] = useState()
  const [Products, setProducts] = useState([])
  const [shopname, setshopname] = useState('Shop')
  const [location, setlocation] = useState('')
  const [country1, setcountry1] = useState('')
  const [bussinessCategory, setbussinessCategory] = useState('')
  const [county1, setcounty1] = useState('')
  const [mpesaName, setmpesaName] = useState('')
  const [mpesaNumber, setmpesaNumber] = useState('')
  const [shopLocation, setshopLocation] = useState('')
  const [shop_email, setshop_email] = useState('')
  const [shop_phone_number, setshop_phone_number] = useState('')
  const [tillNumber, settillNumber] = useState('')
  const [town, settown] = useState('')

  

  useEffect(() => {
    const fetchData = async () => {
       
          await axios.post(`${GlobalVariables.serverUrl}getShopProducts?page=${page}`, {
            _id: seller
          },{
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }).then( function (response){
            console.log(response.data.Products)
            setProducts(response.data.Products)
            
            
          })
          //dispatch({ type: 'FETCH_SUCCESS', payload: data });
    }
    const addVisit = async () => {
      await axios.put(`${GlobalVariables.serverUrl}shops/visit`, {
          id: seller
      },{
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }).then( function (response){
        console.log(response.data)
        
        
        
      })
    }

    const getShopName = async () => {
     
        await axios.post(
          `${GlobalVariables.serverUrl}shops/getShopbyuserid`,
          {_id: seller},
          { headers: { Authorization: `Bearer ${userInfo.token}` } }

        ).then(function (response) {
          console.log(response.data)
          setshopDetails(response.data)
          setshopname(response.data.shop_name)
          settown(response.data.town)
          setshopLocation(response.data.shopLocation)
          setshop_phone_number(response.data.shop_phone_number)
          settillNumber(response.data.tillNumber)
          setshop_email(response.data.shop_email)
          setmpesaNumber(response.data.mpesaNumber)
          
          addVisit();
          
        });
      
    }

    fetchData();
    getShopName();
    
    
  }, [seller, userInfo._id, userInfo.token, page]);
  
  
  return (
    <div>
        <Helmet>
            <title>Shop </title>
        </Helmet>
        <Card>
          <Row>
            <Col><h4>{shopname}</h4></Col>
          </Row>
          <Row>
          <Col>
          
        <img width='100px' src='https://api.freelogodesign.org/assets/thumb/logo/5072150_400.png?t=637946206510000000'/>
        </Col>
        
          <Col>
          <h6>Location: {town} , {shopLocation} </h6>
          <h6>Email: {shop_email}</h6>
          </Col>
          <Col>
          <h6>Phone Number: {shop_phone_number}</h6>
          <h6>Mpesa Number: <Button variant='success'>{mpesaNumber}</Button></h6>
          <h6>Till Number: <Button variant='success'>{tillNumber}</Button></h6>
          </Col>

        </Row>
        </Card>
        <Card>
            <Card.Header>Products</Card.Header>
        <Card.Body>
            <Row className="w-100">
        {Products.map((item) => {
            return (
                <Col>
                <ProductCard products = {item}/>
                </Col>
              )
        }

        
      )}
      </Row>
      </Card.Body>
        </Card>
    </div>
  )
}

export default ShopPublicView