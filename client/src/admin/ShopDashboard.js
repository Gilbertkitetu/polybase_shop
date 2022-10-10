
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
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.post(
  
          `${GlobalVariables.serverUrl}orders/myorders`,
          {user_id: userInfo._id},
  
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        console.log(data)
        setshopOrdersCount(data.length)
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);


  return (
    <div>
      <Helmet>
        <title>Shop Name</title>
      </Helmet>
        <Row>
            <Col md={6}></Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/productsManager')}} className="button-3" >Manage Products</Button>
            </Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/yourcustomerorders')}} className="button-3" >Customer Orders</Button>
            </Col>
            <Col md={2}>
                <Button onClick={(e) => {navigate('/sell')}} className="button-3" >Add Products</Button>
            </Col>
        </Row>
        <h5>Welcome back, Ninja</h5>
        <p>Here is what is happpening in your shop today.</p>
        <Row>

          <Col md={4}>
          <Card className="text-center bg-dark text-white">
            <Card.Header>Total Sales</Card.Header>
            <Card.Body>
              <Card.Title>Ksh. 3,434,000</Card.Title>
            </Card.Body>
          </Card>
          </Col>
          <Col md={4}>
          <Card className="text-center bg-dark text-white">
            <Card.Header>Visitors</Card.Header>
            <Card.Body>
              <Card.Title>1000</Card.Title>
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

              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>Top Products</Card.Header>
              <Card.Body>

              </Card.Body>
            </Card>
          </Col>
        </Row>

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
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(0, 10)}</td>
              <td>{order.shippingAddress.fullName}</td>
              <td>{`${order.createdAt.substring(0, 10)}`}
              <Button variant='success' className="button-3">{order.createdAt.substring(11, 19)}</Button>
              </td>
              {/* <td>{order.productname}</td> */}
              <td>{order.totalPrice.toFixed(2)}</td>
              <td>{order.isPaid ? order.paidAt.substring(0, 10)
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

export default ShopDashboard