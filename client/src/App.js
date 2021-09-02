
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
import { Container } from "react-bootstrap";




function App() {
  return (
   
     <div className = "App">
        <BrowserRouter>
          <div className = "header">

            <NavLink exact activeClassName = "active"
            to = "/" > <h1> < span className = 'poly' >Poly</span><span className='base'>base</span > </h1></NavLink >

          <div>
           
            <div className ="search">

            <input type = 'text' placeholder = 'Search for products or shops' className = 'input-control' />
            <button className = 'search-btn' > Search </button>
            
            
            
            </div>

            <div className="right_btns">
            <button className = 'btn-create-shop' > Create Shop </button>
             
            <NavLink id="nav-link" activeClassName = "active" to = "/liked-products"> <FontAwesomeIcon icon={faHeart} /> </NavLink>
            <NavLink id="nav-link" activeClassName = "active" to = "/login"> Sign In </NavLink>
            <NavLink id="nav-link" activeClassName = "active" to = "/signup"> Create Account </NavLink>
            <NavLink id="nav-link" activeClassName = "active" to = "/cart"> Cart<span >3.</span> </NavLink>
            </div>
          </div>
          </div>
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
        </BrowserRouter>
        <div className="footer">
          <Footer />
        </div>
      </div>
      
  );
}

export default App;
