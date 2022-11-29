import React, {useContext, useState, useEffect, useReducer} from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getError } from '../utils'

import LoadingBox from '../components/LoadingBox';
import { Store } from '../Store'
import CheckoutSteps from '../Screens/CheckoutSteps'
import GlobalVariables from '../GlobalVariables';


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


function PlaceOrder() {


    const navigate = useNavigate()

    const [{ loading }, dispatch] = useReducer(reducer, {
      loading: false,
    });

    const alreadyShownShops = []
    

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const [shopObjects, setshopObjects] = useState()

    const [ shopname, setshopname ] = useState("");
    
    const [itemsprice, setitemsprice] = useState(0)
    const [shippingprice, setshippingprice] = useState(0)
    const [taxprice, settaxprice] = useState(0)
    const [totalprice, settotalprice] = useState(0)

    const [latitude, setlatitude] = useState('')
    const [longitude, setlongitude] = useState('')


    function distance(lat1, lon1, lat2, lon2) {
      // console.log(lat1, lon1, lat2, lon2)
       var p = 0.017453292519943295;    // Math.PI / 180
       var c = Math.cos;
       var a = 0.5 - c((lat2 - lat1) * p)/2 + 
               c(lat1 * p) * c(lat2 * p) * 
               (1 - c((lon2 - lon1) * p))/2;
     
       
       const dis = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
       return parseFloat(dis).toFixed(2);
     }


   // const [alreadyShownShops, setalreadyShownShops] = useState([])

    //var newcart = groupBy(cart.cartItems, 'seller')
    //console.log(newcart)
    
    ///AddplaceOrderDetails(newcart)

    //Calculate delivery cost based on zones
    function calculateDeliveryCost (distance) {
      var deliveryCost = 0;
      if (distance < 1){
        deliveryCost = 0
      } else if (distance < 3){
        deliveryCost = 50
      } else if (distance < 6) {
        deliveryCost = 100
      } else if(distance < 10) {
        deliveryCost = 150
      } else if (distance < 15) {
        deliveryCost = 200
      } else {
        deliveryCost = 500
      }
      return deliveryCost
    }


    var ShopObjects
    function AddplaceOrderDetails (newcart) {
      //key is seller id
     // let keys = Object.keys();
      for(let key in newcart) {
         console.log(key , newcart[key])
         ShopObjects = newcart[key]
         console.log(shopObjects)

       // console.log(key , addShippingDetails(newcart[key]))

      }
      
    }


    var cartItemsObject = groupBy(cart.cartItems, "seller")
    //console.log(cartItemsObject)
    AddplaceOrderDetails(cartItemsObject)


    function addShippingDetails (newcart) {
     
      //console.log(newcart)

    cart.shopcartItems = newcart
    console.log(cart.shopcartItems[0].latitude)
    console.log(cart.shopcartItems[0].longitude)
    cart.distance = distance(latitude, longitude, cart.shopcartItems[0].latitude, cart.shopcartItems[0].longitude);
    console.log(cart.distance)
    cart.shippingPrice = calculateDeliveryCost(cart.distance)
    console.log(cart.shippingPrice)
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    cart.itemsPrice = round2(
      cart.shopcartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    
    console.log(cart.itemsPrice)
    // cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.16 * cart.itemsPrice);
    //cart.taxPrice = 0;
    cart.totalPrice = Math.ceil(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);
    console.log(cart)

     
    return cart;

    }
    

    
    //console.log(cart)



    function groupBy(xs, prop) {
      var grouped = {};
      for (var i=0; i<xs.length; i++) {
        var p = xs[i][prop];
        if (!grouped[p]) { grouped[p] = []; }
        grouped[p].push(xs[i]);
      }
      return grouped;
    }

    const getShopName =  (sellerId) => {
     
       axios.post(
        `${GlobalVariables.serverUrl}shops/getShopbyuserid`,
        {_id: sellerId},
        { headers: { Authorization: `Bearer ${userInfo.token}` } }

      ).then(function (response) {
        console.log(response.data.shop_name)
       
        setshopname(response.data.shop_name)
        console.log(shopname)
        
       
        
      });
    
  }

    

    const placeOrderHandler = async (shopItems) => {
      //console.log(shopItems)
      addShippingDetails(shopItems)

      //Set Totals
      setitemsprice(cart.itemsPrice)
      setshippingprice(cart.shippingPrice)
      settaxprice(cart.taxPrice)
      settotalprice(cart.totalPrice)
      
      try {
        dispatch({ type: 'CREATE_REQUEST' });

        const { data } = await axios.post(
          `${GlobalVariables.serverUrl}placeOrder`,
          {
            
            orderItems: cart.shopcartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            user_id: userInfo._id,
            seller: cart.shopcartItems[0].seller,

          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        ).then((response)=> {
          console.log("response")
          console.log(response.data.order)
          var navigateotoId = response.data.order._id;
          getShopName(cart.shopcartItems[0].seller)

          const whatsApp = async () => {
             
            var orderToWhatsApp = {
              order : response.data.order,
              shopname : shopname
            }
            console.log(shopname)
            console.log(orderToWhatsApp)
            axios.post(
           
            `${GlobalVariables.serverUrl}orderNotification`,
              orderToWhatsApp,
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`,
              },
            }
            ).then((response) => {
              console.log(response.data)
            })
          }
          whatsApp()
        
        

        ctxDispatch({ type: 'CART_CLEAR' });
        dispatch({ type: 'CREATE_SUCCESS' });


        
        // localStorage.removeItem('cartItems');
        var localStorageCart = JSON.parse(localStorage.getItem('cartItems')|| [])

          console.log(localStorageCart)
          console.log(cart.shopcartItems[0].seller)
          
          
            // localStorageCart.filter(i,1);
            // localStorage.setItem('cartItems', JSON.stringify(localStorageCart));

            
            let x = localStorageCart.filter((a)=>{if(a.seller!=cart.shopcartItems[0].seller){return a}});
            console.log(x)
            localStorage.setItem('cartItems', JSON.stringify(x));
          
     
      
        navigate(`/order/${navigateotoId}`);
      });
    
 

      } catch (err) {

        dispatch({ type: 'CREATE_FAIL' });
        //toast.error(getError(err));

      }
    };
    

    useEffect(() => {
        if(!cart.paymentMethod){
            navigate('/payment');
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            console.log(`latitude: ${position.coords.latitude}`)
            setlatitude(position.coords.latitude)
            console.log(`longitude: ${position.coords.longitude}`)
            setlongitude(position.coords.longitude)
          })
          }

    }, [cart, navigate]);


  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Delivery Address</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>  Address: </strong>
                 {cart.shippingAddress.address}
                 <strong>  City/Town: </strong>
                {cart.shippingAddress.city}
                <strong>  County: </strong>
                 {cart.shippingAddress.county1}
                 <strong>  Country: </strong>
                {cart.shippingAddress.country1}
              </Card.Text>
              <Card.Text><strong>Phone number: </strong>{userInfo.phone_number}</Card.Text>
              <Link className='btn btn-success text-dark' to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link className='btn btn-success text-dark' to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                    <Col>
                    <h5>{`Shop: ${item.shop_name}`}</h5>
                      </Col>
                    </Row>
                    <Row className="align-items-center">
                    
                      <Col md={3}>
                      
                        <img
                          src={item.imagesrc}
                          alt={item.productname}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        
                        <Link className='text-dark' to={`/product/${item.slug}`}>{item.productname}</Link>
                      </Col>
                   
                      <Col md={3}>
                        <span>{item.quantity}</span>

                        
                      </Col>
                      <Col md={3}><strong>Each</strong> KSHs {item.price}</Col>
                      
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link className='btn btn-success text-dark' to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              {
                Object.keys(cartItemsObject).map((key, index) => {
                  console.log(cartItemsObject[key])
                  
                  return (
                    
                  cartItemsObject[key].map((shopItem) => {
                    console.log(shopItem.productname)
                    if(!alreadyShownShops.includes(shopItem.shop_name)){
                    alreadyShownShops.push(shopItem.shop_name)
                    console.log(alreadyShownShops)
                    } else {
                      console.log("Shop name exists already")
                    }

                  return (
                    <ListGroup.Item key={shopItem._id}>
                        <h6>{alreadyShownShops.includes(shopItem.shop_name) ? shopItem.shop_name : "hi"}</h6>
                         <Row>
                           <Col>
                           <img src={shopItem.imagesrc} alt={shopItem.productname} width='120px'/>
                           </Col>
                           <Col><p>{shopItem.productname}</p></Col>

                         </Row>
                         <Row>
                          <Col>
                          {alreadyShownShops.includes(shopItem.shop_name) ? 
                          <Button type="button"
                            variant='success'
                            onClick={() => placeOrderHandler(cartItemsObject[key])}
                            disabled={cart.cartItems.length === 0}>Place Order to {shopItem.shop_name}</Button>
                             : "hi"}
                          </Col>
                         </Row>

                       </ListGroup.Item>
                       
                  )
                  }
                  )
                  )
                })
                // ShopObjects.map((shop) => {
                //   return (
                //     <ListGroup.Item>
                //       <h5>{shop.shop_name}</h5>
                //     <Row>
                //       <Col>
                //       <img src={shop.imagesrc} width='120px'/>
                //       </Col>
                //       <Col>{shop.productname}</Col>
                //     </Row>
                //   </ListGroup.Item>
                //   )
                //})
              
              }
              
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items Cost</Col>
                    <Col>KSHs {itemsprice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Delivery Cost</Col>
                    <Col>KSHs {shippingprice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>VAT(16%)</Col>
                    <Col>KSHs {taxprice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>KSHs {totalprice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    {/* <Button
                      type="button"
                      variant='success'
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button> */}
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrder