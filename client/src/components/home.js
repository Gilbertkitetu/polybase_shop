import React from "react";

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
        
        
        </div>
    );
}

export default Home;