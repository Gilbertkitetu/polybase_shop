
import logo from "./images/logo.png"
//importing styles
import './App.css';


import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';


//import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';


//import components
import NavbarComponent from "./components/Navbar";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";




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
            <NavLink id="nav-link" activeClassName = "active" to = "/signup"> New Account </NavLink>
            <NavLink id="nav-link" activeClassName = "active" to = "/login"> Login </NavLink>
            <NavLink id="nav-link" activeClassName = "active" to = "/cart"> <button>Cart<span >3.</span></button> </NavLink>
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

      </div>
  );
}

export default App;
