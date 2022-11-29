import React, { useContext, useReducer, useState, useEffect }  from 'react'
import { Helmet } from 'react-helmet-async'
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getError } from '../../utils';
import axios from 'axios';
import GlobalVariables from '../../GlobalVariables';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Store } from '../../Store';
import { toast } from 'react-toastify';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Dashboard() {

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [ shops, setShops ] = useState([])

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchShops = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        await axios.get(
          `${GlobalVariables.serverUrl}shops/getAll`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        ).then(function (response) {
          console.log(response.data)
          setShops(response.data)
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
        })
        
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchShops();

  }, [userInfo]);

const  deleteHandler = async (shop) => {
  if (window.confirm(`Are you sure to delete? ${shop.shop_name}`)) {
    try {
      await axios.delete(`${GlobalVariables.serverUrl}shops/deleteShop/${shop._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success('product deleted successfully');
      dispatch({ type: 'DELETE_SUCCESS' });
    } catch (err) {
      toast.error(getError(error));
      dispatch({
        type: 'DELETE_FAIL',
      });
    }
  }
}

  
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Row>
      <Col>
          <h2>Admin Dashboard</h2>
      </Col>
      </Row>
     <Row>
            <Col md={6}></Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/allProducts')}} className="button-3" >All Products</Button>
            </Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/yourcustomerorders')}} className="button-3" >Orders</Button>
            </Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/sell')}} className="button-3" >Users</Button>
            </Col>
          
        </Row>
        <Row>
      <Col>
          <h3>Shops</h3>
      </Col>
      </Row>
        <Row>
          <Col>
          {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
            <th>Id</th>
            <th>Shop Name</th>
            <th>Business Category</th>
            <th>Town/City</th>
            <th>Shop Location</th>

            <th>Shop Email</th>
            <th>Shop Phone</th>
            <th>Till Number</th>
            <th>Mpesa Name</th>
            <th>Mpesa Number</th>
            <th>Visits</th>
            <th>Actions</th>
            <th></th>
            
            
            </tr>
          </thead>
          <tbody>
            {shops.map((shop) => (
              <tr key={shop._id}>
                <td>{shop._id.slice(0, 10)}</td>
                <td>{shop.shop_name}</td>
                <td>{shop.bussinessCategory}</td>
                <td>{shop.town}</td>
                <td>{shop.shopLocation}</td>
                <td>{shop.shop_email}</td>
                <td>{shop.shop_phone_number}</td>
                <td>{shop.tillNumber}</td>
                <td>{shop.mpesaName}</td>
                <td>{shop.mpesaNumber}</td>
                <td>{shop.visits}</td>
                <td className="danger1" onClick={() => deleteHandler(shop)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </td>
              </tr>
            ))}
          </tbody>
          </table>
      )}
          </Col>
        </Row>
      
    </div>
  )
}

export default Dashboard