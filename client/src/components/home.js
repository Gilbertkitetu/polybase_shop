import React from "react";

import logo from "../images/logo.png";

//import style
import './styles/home.css'

//import components
import Categories from './categories';


function Home(){
    return(
        
      <div  className="home">
        <div className="categories">
        <Categories/>
        </div>
        <div className="home-box"><img src={logo}/>
        <h3>Home box</h3>
        </div>
        
        
        </div>
    );
}

export default Home;