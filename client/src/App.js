import { useContext } from "react";
import logo from "./images/logo.png"
//importing styles
import './App.css';


import { BrowserRouter, Routes, Route, NavLink, useParams, Link } from 'react-router-dom';
import { ReactSession } from "react-client-session";

//import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

//import icons
//import { VscHeart } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { Container, Nav, Navbar, Badge, Form} from "react-bootstrap";
import { Store } from "./Store";

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






function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
   
     <div className = "App">
       <BrowserRouter>

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
             <Nav.Link href="/create-shop" className="">Create shop</Nav.Link>
             <Nav.Link href="/liked-products">Saved</Nav.Link>
             <Nav.Link href="/cart">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">{cart.cartItems.length}</Badge>
              )}
             </Nav.Link>
             <Nav.Link href="/login" >{ReactSession.get("email") ? ReactSession.get("email") : "Login" }</Nav.Link>
             
           </Nav>
         </Navbar.Collapse>
       </Navbar>
      
       
          <div className = "content">
            
          <Container style={{ marginTop: "20px" }}>
          
            <Routes>
            
              <Route path = '/' element = { <Home />}  />
              <Route path = '/signup' element = { <Signup/> }  />
              <Route path = '/login' element = { <Login/> }  />
              <Route path = '/liked-products' element = { <Liked/> }/>
              <Route path = '/create-shop' element = { <CreateShop/> } />
              <Route path = '/cart' element = { <Cart/> } />


              <Route path='/product/:slug' element={<ProductScreen />} />

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
