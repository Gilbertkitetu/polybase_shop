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

function AllUsers() {

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [ products, setproducts ] = useState([])

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        await axios.get(
          `${GlobalVariables.serverUrl}getAllUsers`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        ).then(function (response) {
          console.log(response.data)
          setproducts(response.data)
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
        })
        
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchUsers();

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
                <Button onClick={(e) => {navigate('/AllOrders')}} className="button-3" >Orders</Button>
            </Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/AllUsers')}} className="button-3" >Users</Button>
            </Col>
          
        </Row>
        <Row>
      <Col>
          <h3>All Users</h3>
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
          
            <th>Date Created</th>
            <th></th>
            
            
            </tr>
          </thead>
          <tbody>
            {products.map((user) => (
              <tr key={user._id}>
                <td>{user._id.slice(0, 10)}</td>
      
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
               
                <td>{user.date_created}</td>
                
        
               
                
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

export default AllUsers