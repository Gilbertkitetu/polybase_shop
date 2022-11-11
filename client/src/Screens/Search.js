import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Ratings from '../components/homeComponents/Ratings';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import '../components/styles/Styles.css'
import Select from "react-select";
import Product from '../components/Product';

import ProductCard from '../components/homeComponents/ProductCard';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import GlobalVariables from '../GlobalVariables';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.Products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: '1 to 5,000',
    value: '1-5000',
  },
  {
    name: '5,000 to 10,000',
    value: '5000-10000',
  },
  {
    name: '10,000 to 50,000',
    value: '10000-50000',
  }, 
  {
    name: '50,000 to 150,000',
    value: '50000-150000',
  },
];

export const ratings = [
  {
    name: '5stars',
    rating: 5,
  },
  {
    name: '4stars',
    rating: 4,
  },

  {
    name: '3stars',
    rating: 3,
  },

  {
    name: '2stars',
    rating: 2,
  },

  {
    name: '1stars',
    rating: 1,
  },
];

export default function Search() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [latitude, setlatitude] = useState('')
  const [longitude, setlongitude] = useState('')


  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

    

    function distance(lat1, lon1, lat2, lon2) {
     // console.log(lat1, lon1, lat2, lon2)
      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 + 
              c(lat1 * p) * c(lat2 * p) * 
              (1 - c((lon2 - lon1) * p))/2;
    
      
      const dis = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
      return parseFloat(dis).toFixed(2);
    }

    
    


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        console.log(`latitude: ${position.coords.latitude}`)
        setlatitude(position.coords.latitude)
        console.log(`longotude: ${position.coords.longitude}`)
        setlongitude(position.coords.longitude)
      })
      }
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${GlobalVariables.serverUrl}search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });

      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
            `${GlobalVariables.serverUrl}categories`);
        setCategories(data);
        console.log(data)
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  // var p = handleDistanceSort(products)
  //   var productsMap = p
  
    function handleDistanceSort(products) {
      console.log(products)
      let productsMapped = products.map((element) => ({
        ...element,
        distance: distance(latitude, longitude, element.latitude, element.longitude)
      }))
      console.log(productsMapped)
      return productsMapped.sort((a, b) => Number(a.distance) -  Number(b.distance))
    
    }
   

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3} >
          <h5>Category</h5>
          <div className='category'>
            <ul>
              <li>
                <Link 
                  className={'all text-link' === category ? 'text-bold text-dark text-link' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c, index) => (
                <li key={index} className="text-dark ">
                  <Link
                    className={c === category ? 'text-bold text-dark text-link' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='price'>
            <h5>Price in KSHs</h5>
            <ul>
              <li>
                <Link
                  className={'all' === price ? 'text-bold text-dark text-link' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'text-bold text-dark text-link' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Reviews</h5>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'text-bold text-dark' : ''}
                  >
                    <Ratings caption={' '} rating={r.rating}></Ratings>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ rating: '0' })}
                  className={rating === 'all' ? 'text-bold text-dark text-link' : ''}
                >
                  <Ratings caption={' '} rating={0}></Ratings>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">   
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{' '}
                  <select variant="success" className="select"
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {
                  

                  handleDistanceSort(products).map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <ProductCard products={product}></ProductCard>
                  </Col>
                ))
                }
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}