import React, { useContext, useEffect, useState, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import GlobalVariables from '../GlobalVariables';


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

function ShopOrders() {
    const { state } = useContext(Store);
  const { userInfo } = state;

  const [checkSeller, setcheckSeller] = useState(false)
  const [seller, setseller] = useState('')
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    
    const getShopName = async () => {
     
      await axios.post(
        `${GlobalVariables.serverUrl}shops/getShopbyuserid`,
        {_id: userInfo._id},
        { headers: { Authorization: `Bearer ${userInfo.token}` } }

      ).then(function (response) {
        console.log(response.data.user_id)
        setcheckSeller(true)
        setseller(response.data.user_id)

        fetchData();
    
      });
     
  }

  
    const fetchData = async () => {
      
      
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.post(

          `${GlobalVariables.serverUrl}orders/shopOrders`,
          {seller: seller},

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    
    };

    getShopName()

  }, [userInfo, seller]);
  return (
    <div>
      <Helmet>
        <title>Customer Orders</title>
      </Helmet>

      <Row>
      <Col md={12}>
            <Card>
            <Card.Header>Your Customer Orders</Card.Header>
            <Card.Body>
           
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
            <th>Order Id</th>
            <th>Customer Name</th>
            <th>Date Ordered</th>
            <th>Total Price (Ksh)</th>
            <th>Paid</th>
            <th>Items Ordered</th>
            <th>Delivery Address</th>
            <th>Delivered</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
            <tr key={order._id}>
            <td>{order._id.slice(0, 10)}</td>
            <td>{order.shippingAddress.fullName}</td>
            <td>{`${order.createdAt.substring(0, 10)}`}
            <Button variant='success' className="button-3">{order.createdAt.substring(11, 19)}</Button>
            </td>
            {/* <td>{order.productname}</td> */}
            <td>{order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid ? <Button variant="success">Paid</Button>
             : <Button variant="danger">No</Button>}</td>
            <td>{order.orderItems.length}</td>
            <td>{order.shippingAddress.address}</td>
            <td>
              {order.isDelivered
                ? order.deliveredAt.substring(0, 10)
                : <Button variant="danger">No</Button>}
            </td>
            <td>
              <Button
                type="button"
                variant="light"
                onClick={() => {
                  navigate(`/order/${order._id}`);
                }}
              >
                Details
              </Button>
            </td>
          </tr>
            ))}
          </tbody>
        </table>
      )}
      </Card.Body>
       </Card>
      </Col>
      </Row>
    </div>

  )
}

export default ShopOrders