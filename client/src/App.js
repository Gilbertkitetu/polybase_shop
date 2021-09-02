
import logo from "./images/logo.png"
//importing styles
import './App.css';


import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';


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
import { Container, Nav, Navbar, Button, Form} from "react-bootstrap";




function App() {
  return (
   
     <div className = "App">
       <BrowserRouter>

       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
         <Navbar.Brand  exact href="/">Polybase</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="mr-auto">
           <Form.Control type="email" placeHolder="Search polybase" required></Form.Control>
           <Button className="w-200" type="submit">Search</Button>
           </Nav>
           <Nav>
             <Nav.Link href="#Create Shop">Create shop</Nav.Link>
             <Nav.Link href="/liked-products">Favorite</Nav.Link>
             <Nav.Link href="/cart">Cart</Nav.Link>
             <Nav.Link href="/login">Login</Nav.Link>
           </Nav>
         </Navbar.Collapse>
       </Navbar>
      
       
          <div className = "content">
            
          <Container className="d-flex align-items-center
          justify-content-center"
          style={{ minHeight: "100vh"}}
          >
            <div className="w-100" style={{ maxWidth: "400px"}}>
            <Switch>
            
              <Route path = '/' component = { Home } exact />
              <Route path = '/signup' component = { Signup } exact />
              <Route path = '/login' component = { Login } exact />
              <Route path = '/liked-products' component = { Liked }/>

            </Switch>
            </div>
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
