import { useContext, useState } from "react";
import logo from "./images/logo.png"
//importing styles
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


import { BrowserRouter, Routes, Route, NavLink, useParams, Link } from 'react-router-dom';
import { ReactSession } from "react-client-session";

//import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

//import icons
//import { VscHeart } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { Container, Nav, Navbar, Badge, Form, NavDropdown, Dropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Helmet } from "react-helmet-async";
import { Store } from "./Store";

import Dashboard from "./admin/Dashboard";

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







function App() {

  const [showDropdown, setshowDropdown] = useState(false)


  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/login';
  }

  return (
   
     <div className = "App">
       <BrowserRouter>
       <ToastContainer position="botton-center" limit={1} />
       <Helmet>
       <title>Polybase</title>
       </Helmet>

       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" style={{backgroundColor: "#2C5F2D"}}>
         <Link to ="/">
         <Navbar.Brand>Polybase</Navbar.Brand>
         </Link>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="mr-auto">
           <Form.Control type="email" placeholder="Search polybase" required></Form.Control>
           <button className="button-3" type="submit">Search</button>
           </Nav>
           <Nav>
           <Nav.Link href="/sell">Sell</Nav.Link>
           <Nav.Link href="/yourcustomerorders">Orders</Nav.Link>
             <Nav.Link href="/create-shop" className="">Create shop</Nav.Link>
             <Nav.Link href="/liked-products">Saved</Nav.Link>
             <Nav.Link href="/cart">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.length}
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
              )}
             </Nav.Link>
             {userInfo ? (
           
              <Dropdown 
              onMouseLeave={()=> setshowDropdown(false)}
              onMouseOver={() => setshowDropdown(true)}
              style={{ width: '166px'}}
              >
                <Dropdown.Toggle className="main-style"
                id="dropdown-basic">
                  {userInfo.name}
                </Dropdown.Toggle>

                <Dropdown.Menu show={showDropdown}>
                  <Dropdown.Item href="/profile">
                  User Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="/orderhistory">
                  Order History
                  </Dropdown.Item>
                  
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
                
              <Route path = '/admin/dashboard' element = { <Dashboard /> } />
              <Route path = '/shop/shopdashboard' element = { <ShopDashboard /> } />
              
              
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
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path = '/sell' element = {<Sell /> } />
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
