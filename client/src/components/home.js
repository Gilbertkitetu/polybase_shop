import React from "react";

import logo from "../images/logo.png";

//import style
//import './styles/home.css'

//import components
import Categories from './categories';
import CategoryDir from "./homeComponents/categoryDir";
import { Carousel } from "react-bootstrap";


function Home(){


    // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    // const listItems = numbers.map((number) => 
    // <li className="product-item">{number}</li>
    // );


    return(
        
      <div  className="home">
          <Carousel >
              <Carousel.Item>
                  <img className="d-block w-100" src={logo}
                  alt="First slide"/>
                  <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>What is this photo about</p>
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item >
                  <img className="d-block w-100" src={logo}
                  alt="First slide"/>
                  <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>What is this photo about</p>
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item >
                  <img className="d-block w-100" src={logo}
                  alt="First slide"/>
                  <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>What is this photo about</p>
                  </Carousel.Caption>
              </Carousel.Item>
          </Carousel>
        {/* <div className="categories">
        <Categories/>
        </div>
        <div className="home-box"><img src={logo}/>
        
      
        </div>
        <div className="help"><h3>Help</h3></div>


        <div className="category-directory"><CategoryDir /></div>


        <div className="products">

                    <ul>{listItems}</ul>
        </div>
         */}
        <div className="load-more">
            <button>Load more</button>
        </div>

        
        
        </div>
    );
}

export default Home;