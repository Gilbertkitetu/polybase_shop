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

import jsPDF from 'jspdf'
import 'jspdf-autotable'


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

  function Reports() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();
  
    
  const [checkSeller, setcheckSeller] = useState(false)
  const [seller, setseller] = useState('')

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
        fetchData();
    
      }, [userInfo, seller]);

      const filterByPaid = async (isit) => {
       
        var routeHere = '/filterByPaid';
        if(isit === 'All') {
          routeHere = ''
        }
        dispatch({ type: 'FETCH_REQUEST' });
          try {
            const { data } = await axios.post(
    
              `${GlobalVariables.serverUrl}orders/shopOrders${routeHere}`,
              {seller: seller, isPaid: isit},
    
              { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (error) {
            dispatch({
              type: 'FETCH_FAIL',
              payload: getError(error),
            });
          }
      }

      const filterByDelivery = async (isit) => {
       
        var routeHere = '/filterByDelivery';
        if(isit === 'All') {
          routeHere = ''
        }
        dispatch({ type: 'FETCH_REQUEST' });
          try {
            const { data } = await axios.post(
    
              `${GlobalVariables.serverUrl}orders/shopOrders${routeHere}`,
              {seller: seller, isDelivered: isit},
    
              { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (error) {
            dispatch({
              type: 'FETCH_FAIL',
              payload: getError(error),
            });
          }
      }

      const columns = [
        {title: "#", field: '_id', },
        {title: "customer Name", field: 'fullName', },
        {title: "Ordered On", field: 'createdAt', },
        {title: "IO No.", field: 'length', },
        {title: "Items", field: 'productname', },
        {title: "TP (Ksh)", field: 'totalPrice', },
        {title: "Paid", field: 'isPaid', },
        {title: "D Address", field: 'address', },
        {title: "Delivered", field: 'isDelivered', }
      
      ]
      const downloadPdf = async () => {
        orders.forEach(order => {
          order._id = order._id.substring(0, 10)
          order.createdAt = order.createdAt.substring(0, 10)
          order.length = order.orderItems.length;
          order.fullName = order.shippingAddress.fullName;
          order.address = order.shippingAddress.address;
          order.productname = order.orderItems[0].productname.substring(0, 15)
        });
        console.log(orders)
        
        const doc = new jsPDF()
        doc.text("EPSB Reports", 20, 10)

        doc.autoTable({
          theme: "striped",
          columns:columns.map(col=>({...col,dataKey:col.field})),
          body: orders
        })

        doc.save("reports.pdf")
      }


    return (
        <div>
        <Helmet>
        <title>Shop</title>
        </Helmet>
        <Row>
            <Col md={2}></Col>
            <Col md={3}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Filter by Delivery</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01" onChange={(e) => filterByDelivery(e.target.value)}>
                <option selected>All</option>
                <option value="true">Delivered</option>
                <option value="false">Not Delivered</option>
            </select>
            </div>
            </Col>
            <Col md={3}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Filter by Paid</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01" onChange={(e) => filterByPaid(e.target.value)}>
                <option selected>All</option>
                <option value="true">Paid</option>
                <option value="false">Not Paid</option>
            </select>
            </div>
            </Col>
            {/* <Col md={3}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Filter by Delivery Address</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01">
                <option selected>All</option>
                <option value="1">Paid</option>
                <option value="2">Not Paid</option>
            </select>
            </div>
            </Col> */}
            <Col md={2}>
               {/* <Button onClick={(e) => {}} className="button-3" >Add Products</Button>  */}
            </Col>
            <Col md={2}>
                <Button onClick={(e) => downloadPdf()} className="button-3" >Dowload Report</Button>
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
            <th>Customer Name</th>
            <th>D&T Ordered</th>
            <th>IO No.</th>
            <th>Items Ordered</th>
            <th>TP (Ksh)</th>
            <th>Paid</th>
            <th>DA</th>
            <th>Delivered</th>
            
            </tr>
          </thead>
          <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
            <td>{order._id.slice(0, 10)}</td>
            <td>{order.shippingAddress.fullName}</td>
            <td>{`${order.createdAt.substring(0, 16)}`}
            {/* <Button variant='success' className="button-3">{order.createdAt.substring(11, 19)}</Button> */}
            </td>
            <td>{order.orderItems.length}</td>
            <td><ul>
              {
                order.orderItems.map((product, key) => (
                  <li>{product.productname.substring(0, 15)}</li>
                ))
              }
              
              {/* <li>{!order.orderItems[1].productname}</li> */}
              {/* <li>{order.orderItems[2].productname}</li> */}
              </ul></td>
            <td>{order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid ? 'Yes'
             : 'No'}</td>
            
            <td>{order.shippingAddress.address}</td>
            <td>
              {order.isDelivered
                ? 'Yes'
                : 'No'}
            </td>
            <td>
           
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

  export default Reports