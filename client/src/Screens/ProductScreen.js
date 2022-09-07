import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Ratings from '../components/homeComponents/Ratings';
import { Helmet } from 'react-helmet-async';
import Data from "../components/Data"

import GlobalVariables from '../GlobalVariables';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
    switch (action.type) {
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

    // let reviewsRef = useRef();

    // const [rating, setRating] = useState(0);
    // const [comment, setComment] = useState('');
    // const [selectedImage, setSelectedImage] = useState('');
  
    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        
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

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { cart } = state;
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

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     if (!)
    // }

    return loading ? (
        <LoadingBox />
    ) : error ? (
       <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <Row>
                <Col md={6}>
                    <img
                        className="img-large"
                        src={product.imagesrc}
                        alt={product.productname}
                    ></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                <title>{product.productname}</title>
              </Helmet>
                            <h1>{product.productname}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ratings
                                rating={product.ratings}
                                numReviews={product.numberReviews}
                            ></Ratings>
                        </ListGroup.Item>
                        <ListGroup.Item>Pirce : KSh {product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Description:
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

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button onClick={addToCartHandler} variant="primary">Add to Cart</Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default ProductScreen;