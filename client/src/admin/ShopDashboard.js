
import React, { useContext, useReducer, useState, useEffect }  from 'react'
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import GlobalVariables from '../GlobalVariables';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import OrderScreen from '../Screens/OrderScreen';
import Charts from './Charts';

import { Bar } from 'react-chartjs-2'
import BarChart from './BarChart';


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


function ShopDashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [shopOrdersCount, setshopOrdersCount] = useState(0)
  const [shopName, setshopName] = useState('')
  const [seller, setseller] = useState('')
  const [visits, setvisits] = useState(0)
  const [totalSales, settotalSales ] = useState(0);
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
        console.log(response.data)
        setshopName(response.data.shop_name)
        setseller(response.data.user_id)
        setvisits(response.data.visits);

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
       
        setshopOrdersCount(data.length)
        let total = 0;
        for( let item of data) {
          if(item.isPaid === true) {
            total = total + item.totalPrice
            
          }
          settotalSales(total.toFixed(2))

        } 
        
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
  
    
    getShopName();
  }, [userInfo, seller]);

  const fetchData1 = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await axios.post(

        `${GlobalVariables.serverUrl}orders/shopOrders`,
        {seller: seller},

        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
     
      setshopOrdersCount(data.length)
      let total = 0;
      for( let item of data) {
        if(item.isPaid === true) {
          total = total + item.totalPrice
          
        }
        settotalSales(total.toFixed(2))

      } 
      
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload: getError(error),
      });
    }
  };
  const deliver = async (order_id) => {
    dispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axios.post(

        `${GlobalVariables.serverUrl}orders/deliver`,
        {id: order_id},

        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      ).then(response => {
        console.log(response.data.message)
        // fetchData1()
        
      })
      
      
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload: getError(error),
      });
    }
  }

  return (
    <div>
      <Helmet>
        <title>Shop Name</title>
      </Helmet>
        <Row>
            <Col md={2}></Col>
            <Col md={2}>
            {
            userInfo.name === 'admin'
            ?
            
                <Button onClick={(e) => {navigate('/adminDashboard')}} className="button-3" >Admin Dashboard</Button>
            
            : null
            }
            </Col>

            
            <Col md={2}>
                <Button onClick={(e) => {navigate('/productsManager')}} className="button-3" >Manage Products</Button>
            </Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/yourcustomerorders')}} className="button-3" >Customer Orders</Button>
            </Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/sell')}} className="button-3" >Add Products</Button>
            </Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/reports')}} className="button-3" >Reports</Button>
            </Col>
        </Row>
        <h5>Welcome back, {shopName}</h5>
        <p>Here is what is happpening in your shop.</p>
        <Row>

          <Col md={4}>
          <Card className="text-center bg-dark text-white">
            <Card.Header>Total Sales</Card.Header>
            <Card.Body>
              <Card.Title>Ksh. {totalSales}</Card.Title>
            </Card.Body>
          </Card>
          </Col>
          <Col md={4}>
          <Card className="text-center bg-dark text-white">
            <Card.Header>Visits</Card.Header>
            <Card.Body>
              <Card.Title>{visits}</Card.Title>
            </Card.Body>
          </Card>
          </Col>
          <Col md={4}>
          <Card className="text-center bg-dark text-white">
            <Card.Header>Total Orders</Card.Header>
            <Card.Body>
              <Card.Title>{shopOrdersCount}</Card.Title>
            </Card.Body>
          </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>Sales vs Orders</Card.Header>
              <Card.Body>
                  <BarChart sales = {[]} orders = {shopOrdersCount} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>Visits vs Orders</Card.Header>
              <Card.Body>
                <BarChart />
              </Card.Body>
            </Card>
          </Col>
        </Row> */}

        <Row  className="mt-4">
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
          {orders.length > 0 ? (orders.map((order) => (
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
                  ? 'Delivered'
                  : <Button type="button" variant="danger" onClick={() => {
                    deliver(order._id);
                  }}>Mark as delivered</Button>}
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
          ))) : (<h5>No Orders yet</h5>)}
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

export default ShopDashboard