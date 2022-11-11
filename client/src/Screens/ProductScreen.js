import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../components/styles/Styles.css'
import { Row, Col, ListGroup, Badge, Button, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

import Ratings from '../components/homeComponents/Ratings';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify'
import Data from "../components/Data"

import GlobalVariables from '../GlobalVariables';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
    switch (action.type) {
      case 'REFRESH_PRODUCT':
        return { ...state, product: action.payload };
      case 'CREATE_REQUEST':
        return { ...state, loadingCreateReview: true };
      case 'CREATE_SUCCESS':
        return { ...state, loadingCreateReview: false };
      case 'CREATE_FAIL':
        return { ...state, loadingCreateReview: false };
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, product: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

function ProductScreen() {

    let reviewsRef = useRef();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
  
    
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');


    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, product, loadingCreateReview }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        
                //User Location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
    
    console.log(`latitude: ${position.coords.latitude}`)
    setlatitude(position.coords.latitude)
    console.log(`longitude: ${position.coords.longitude}`)
    setlongitude(position.coords.longitude)
    
    })
  
    }

        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`${GlobalVariables.serverUrl}products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });  //result.data
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [slug]);

    function distance(lat1, lon1, lat2, lon2) {
        console.log(lat1, lon1, lat2, lon2)
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        
        const dis = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
        return parseFloat(dis).toFixed(2);
      }

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { cart, userInfo } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`${GlobalVariables.serverUrl}products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });
        navigate('/cart')
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!comment || !rating) {
          toast.error('Please enter comment and rating');
          return;
        }
        console.log(rating, comment)
        try {
          const { data } = await axios.post(
            `${GlobalVariables.serverUrl}products/${product._id}/reviews`,
            { rating, comment, name: userInfo.name },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          );
    
          dispatch({
            type: 'CREATE_SUCCESS',
          });
          toast.success('Review submitted successfully');
          product.reviews.unshift(data.review);
          product.numReviews = data.numReviews;
          product.rating = data.rating;
          dispatch({ type: 'REFRESH_PRODUCT', payload: product });
          window.scrollTo({
            behavior: 'smooth',
            top: reviewsRef.current.offsetTop,
          });
        } catch (error) {
          toast.error(getError(error));
          dispatch({ type: 'CREATE_FAIL' });
        }
      };

    return loading ? (
        <LoadingBox />
    ) : error ? (
       <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <Row>
                <Col md={6}>
                    <img
                        className="img"
                        src={product.imagesrc}
                        alt={product.productname}
                    />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                <title>{product.productname}</title>
              </Helmet>
                            <h5>{product.productname}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ratings
                                rating={product.ratings}
                                numReviews={product.numberReviews}
                            ></Ratings>
                        </ListGroup.Item>
                        <ListGroup.Item>Price : <strong>KSh {product.price}</strong></ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong>
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>KSh {product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? (
                                                <Badge bg="success">In Stock</Badge>
                                            ) : (
                                                <Badge bg="danger">Unavailable</Badge>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item><strong>Brand: </strong> {product.brand}</ListGroup.Item>
                                <ListGroup.Item><strong>Seller: </strong> {product.shop_name}</ListGroup.Item>
                                <ListGroup.Item><strong>Location: </strong>{product.product_location}</ListGroup.Item>
                                <ListGroup.Item><strong>Distance: </strong>≈ <strong>{distance(product.latitude, product.longitude, latitude, longitude)}</strong> km away</ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button onClick={addToCartHandler} variant="success">Add to Cart</Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            

            <div className="my-3">
        <h2 ref={reviewsRef}>Reviews</h2>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>There are no Reviews, Be the first to review this product</MessageBox>
          )}
        </div>
        <ListGroup>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Ratings rating={review.rating} caption=" "></Ratings>
              <p>{review.createdAt?.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating: </Form.Label>
                <br />
                <select
                  aria-label="Rating" width='100%'
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excelent</option>
                </select>
              </Form.Group>
            
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              

              <div className="mb-3">
                <Button disabled={loadingCreateReview} type="submit" variant='success'>
                  Submit
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{' '}
              <Link to={`/signin?redirect=/product/${product.slug}`}>
                Sign In
              </Link>{' '}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>

        </div>
    );
}
export default ProductScreen;