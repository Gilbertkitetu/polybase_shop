
import logo from "./images/logo.png"
//importing styles
import './App.css';


import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { ReactSession } from "react-client-session";

//import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

//import icons
//import { VscHeart } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


//import components
import NavbarComponent from "./components/Navbar";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Footer from "./components/footer";
import Liked from "./components/liked";
import CreateShop from "./components/createShop";
import Cart from "./components/cart";
import { Container, Nav, Navbar, Button, Form} from "react-bootstrap";




function App() {
  return (
   
     <div className = "App">
       <BrowserRouter>

       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" style={{backgroundColor: "#2C5F2D"}}>
         <Navbar.Brand  exact href="/">Polybase</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="mr-auto">
           <Form.Control type="email" placeHolder="Search polybase" required></Form.Control>
           <button className="button-3" type="submit">Search</button>
           </Nav>
           <Nav>
             <Nav.Link href="/create-shop" className="">Create shop</Nav.Link>
             <Nav.Link href="/liked-products">Saved</Nav.Link>
             <Nav.Link href="/cart">Cart
             <span class="cart-basket d-flex align-items-center justify-content-center">
            0
          </span>
             </Nav.Link>
             <Nav.Link href="/login" >{ReactSession.get("email") ? ReactSession.get("email") : "Login" }</Nav.Link>
             
           </Nav>
         </Navbar.Collapse>
       </Navbar>
      
       
          <div className = "content">
            
          <Container style={{ marginTop: "20px" }}>
          
            <Switch>
            
              <Route path = '/' component = { Home } exact />
              <Route path = '/signup' component = { Signup } exact />
              <Route path = '/login' component = { Login } exact />
              <Route path = '/liked-products' component = { Liked }/>
              <Route path = '/create-shop' component = { CreateShop } />
              <Route path = '/cart' component = { Cart } />

            </Switch>
            
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
