import { useContext, useState, useEffect } from "react";
import logo from "./images/logo.png"
//importing styles
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


import { BrowserRouter, Routes, Route, NavLink,useNavigate, useParams, Link } from 'react-router-dom';
import { ReactSession } from "react-client-session";

//import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

//import icons
//import { VscHeart } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { Container, Nav, Navbar, Badge, Form, NavDropdown,ButtonGroup,Button, Dropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Helmet } from "react-helmet-async";
import { Store } from "./Store";

//import Dashboard from "./admin/Dashboard";

//Shop Admin Components
import ShopDashboard from "./admin/ShopDashboard";

//import components
import NavbarComponent from "./components/Navbar";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Footer from "./components/footer";
import Liked from "./components/liked";
import CreateShop from "./components/createShop";
import Cart from "./components/cart";
import ProductScreen from "./Screens/ProductScreen";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import PlaceOrder from "./components/PlaceOrder";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistory from "./Screens/OrderHistory";
import ShopOrders from "./Screens/ShopOrders";
import Sell from "./components/Sell";
import ProfileScreen from "./Screens/ProfileScreen";
import Search from "./Screens/Search";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import ShopPublicView from "./components/ShopPublicView";


import MapScreen from "./Screens/MapScreen";

import GlobalVariables from "./GlobalVariables";
import axios from "axios";
import Reports from "./admin/Reports";
import Dashboard from "./admin/epsbadmin/Dashboard";
import AllProducts from "./admin/epsbadmin/AllProducts"
import AllUsers from "./"


function App() {

  const [query, setquery] = useState('')

  const [showDropdown, setshowDropdown] = useState(false)
  const [shop, setshop] = useState({})


  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/login';
  }

  const search = (e) => {
    e.preventDefault();
    window.location.href = `${query}` ? `/search/?query=${query}` : `/search`
  }

  useEffect(() => {
         //Get shop name and id
        //  console.log(userInfo._id)
        //  const shop1 =  axios.post(
        //   `${GlobalVariables.serverUrl}/shops/getShopbyuserid`, userInfo
        //   ).then(function (response) {
        //       console.log(response.data);
        //       setshop(response.data)
        //       localStorage.setItem('shop', JSON.stringify(response.data))
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
  }, [])
  

  return (
   
     <div className = "App">
       <BrowserRouter>
       <ToastContainer position="botton-center" limit={1} />
       <Helmet>
       <title>EPSB</title>
       </Helmet>

       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" style={{backgroundColor: "#2C5F2D"}}>
         <Link to ="/">
         <Navbar.Brand>EPSB</Navbar.Brand>
         </Link>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="mr-auto">
           <Form.Control type="email" placeholder="Search EPSB"
             onChange={(e) => setquery(e.target.value)}
           required></Form.Control>
           <button className="button-3" type="submit" onClick={search}
           
           >Search</button>
           </Nav>
           <Nav>
           <Nav.Link href="/sell">Sell</Nav.Link>
           <Nav.Link href="/yourcustomerorders">Orders</Nav.Link>
             <Nav.Link href="/create-shop" className="">Create shop</Nav.Link>
             {/* <Nav.Link href="/liked-products">Saved</Nav.Link> */}
             <Nav.Link href="/cart">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill className="danger">
                  {cart.cartItems.length}
                  {/* {cart.cartItems.reduce((a, c) => a + c.quantity, 0)} */}
                  </Badge>
              )}
             </Nav.Link>
             {userInfo ? (
           
              <Dropdown className=""
              variant="dark"
              
              onMouseLeave={()=> setshowDropdown(false)}
              onMouseOver={() => setshowDropdown(true)}
              style={{ width: '150px', backckgroudColor: 'dark'}}
              >
                
                <Dropdown.Toggle className="userinfo"
                id="dropdown-basic"  variant="success">
                  {userInfo.name}
                </Dropdown.Toggle>

                <Dropdown.Menu show={showDropdown}>
                  <Dropdown.Item href="/shop">
                  Your Shop {shop.shop_name} 
                  </Dropdown.Item>

                  <Dropdown.Item href="/profile">
                  Your Profile
                  </Dropdown.Item>

                  <Dropdown.Item href="/orderhistory">
                  Order History
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item href="#signout" onClick={signoutHandler}>
                  Sign Out
                  </Dropdown.Item>
                  

                  </Dropdown.Menu>

              </Dropdown>
                
                  
             ) : (
              <Link className="nav-link" to="/login">Sign In</Link>
             )}
            
           </Nav>
         </Navbar.Collapse>
       </Navbar>
      
       
          <div className = "content">
            
          <Container style={{ marginTop: "20px" }}>
          
            <Routes>
                
              {/* <Route path = '/admin/dashboard' element = { <Dashboard /> } /> */}
              <Route path = '/shop' element = { <ShopDashboard /> } />
              
              
              <Route path = '/' element = { <Home />}  />
              <Route path = '/signup' element = { <Signup/> }  />
              <Route path = '/login' element = { <Login/> }  />
              <Route path = '/liked-products' element = { <Liked/> } />
              <Route path = '/create-shop' element = { <CreateShop/> } />
              <Route path = '/cart' element = { <Cart/> } />
              <Route path = '/shipping' element = { <ShippingAddress/> } />
              <Route path = '/payment' element = { <PaymentMethod/> } />
              <Route path = '/placeorder' element = { <PlaceOrder/> } />
              <Route path = '/order/:id' element = { <OrderScreen /> } />
              <Route path = '/orderhistory' element = { <OrderHistory /> } />
              <Route path = '/yourcustomerorders' element = { <ShopOrders /> } />
              <Route path = '/product/:slug' element={<ProductScreen />} />
              <Route path = '/sell' element = {<Sell /> } />
              <Route path = '/profile' element = {<ProfileScreen /> } />
              <Route path = '/search' element = {<Search />} />
              <Route path = '/productsManager' element = { <ProductListScreen /> } />
              <Route path = '/editProduct/:id' element = { <ProductEditScreen /> } />
              <Route path = '/shop/:id' element = { <ShopPublicView /> } />
              <Route path = '/reports' element = { <Reports /> } />
              <Route path = '/admindashboard' element = { <Dashboard /> } />              
              <Route path = '/allProducts' element = { <AllProducts /> } />
              <Route path = '/MapScreen' element = { <MapScreen /> } />

            </Routes>
            
            </Container>

          </div>
       
        <div className="footer">
          <Footer />
        </div>
        </BrowserRouter>
      </div>
      
  );
}

export default App;
