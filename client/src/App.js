
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




function App() {
  return (
     <div className = "App">
        <BrowserRouter>
          <div className = "header">

            <NavLink exact activeClassName = "active"
            to = "/" > <h1> < span className = 'poly' >Poly</span><span className='base'>base</span > </h1></NavLink >

          <div>
           
            <div className ="search">

            <input type = 'text' placeholder = 'Search for products' className = 'input-control' />
            <button className = 'search-btn' > Search </button>
            
            
            
            </div>

            <div className="right_btns">
            <button className = 'btn-create-shop' > Create Shop </button>
             
            <NavLink id="nav-link" activeClassName = "active" to = "/signup"> <FontAwesomeIcon icon={faHeart} /> </NavLink>
            <NavLink id="nav-link" activeClassName = "active" to = "/login"> Sign In </NavLink>
            <NavLink id="nav-link" activeClassName = "active" to = "/cart"> Cart<span >3.</span> </NavLink>
            </div>
          </div>
          </div>
          <div className = "content">
            <Switch>
            
              <Route path = '/' component = { Home } exact />
              <Route path = '/signup' component = { Signup } exact />
              <Route path = '/login' component = { Login } exact />

            </Switch>

          </div>
        </BrowserRouter>
        <div className="footer">
          <Footer />
        </div>
      </div>
  );
}

export default App;
