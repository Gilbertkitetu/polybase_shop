import React from 'react';
import { Row, Col, Card, Table, Button } from "react-bootstrap";

function Cart(){
    

    return(
        <div class="wrapper wrapper-content animated fadeInRight">
        <Row>
            <Col md-9>
                <Card>
                    <Card.Title>
                        <span class="pull-right"><strong>2</strong>items</span>
                        <h5>Items in your cart</h5>
                    </Card.Title>
                    <Card.Body>
                        <div class="table-responsive">
                            <Table className="shoping-cart-table">
                                <tbody>
                                <tr>
                                    <td>
                                        <div class="cart-product-imitation">
                                        </div>
                                    </td>
                                    <td class="desc">
                                        <h3>
                                        <a href="#" class="text-navy">
                                           laptop
                                        </a>
                                        </h3>
                                        <p class="small">
                                            laptop description
                                        </p>
                                        <dl class="small m-b-none">
                                            <dt>Description lists</dt>
                                            <dd>A description list is perfect for defining terms.</dd>
                                        </dl>
    
                                        <div class="m-t-sm">
                                           
                                            
                                            <a href="#" class="text-muted"><i class="fa fa-trash"></i> Remove item</a>
                                        </div>
                                    </td>
    
                                    <td>
                                        $180.00
                                        <s class="small text-muted">$230,00</s>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="1"/>
                                    </td>
                                    <td>
                                        <h4>
                                            $180,00
                                        </h4>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
    
                    </Card.Body>
                    
                    <Card.Body>
                        <div class="table-responsive">
                            <Table className="shoping-cart-table">
    
                                <tbody>
                                <tr>
                                    <td>
                                        <div class="cart-product-imitation">
                                        </div>
                                    </td>
                                    <td class="desc">
                                        <h3>
                                            <a href="#" class="text-navy">
                                               Table.
                                            </a>
                                        </h3>
                                        <p class="small">
                                            Table description
                                        </p>
                                        <dl class="small m-b-none">
                                            <dt>Description lists</dt>
                                            <dd>A description list is perfect for defining terms.</dd>
                                        </dl>
    
                                        <div class="m-t-sm">
                                           
                                            
                                            <a href="#" class="text-muted"><i class="fa fa-trash"></i> Remove item</a>
                                        </div>
                                    </td>
    
                                    <td>
                                        $110,00
                                    </td>
                                    <td width="65">
                                        <input type="text" class="form-control" placeholder="1"/>
                                    </td>
                                    <td>
                                        <h4>
                                            $110,00
                                        </h4>
                                    </td>
    
                                </tr>
                                </tbody>
                            </Table>
                        </div>
    
                    </Card.Body>
                    
                    
                    <Card.Body>
                        <Button class="btn-primary pull-right"><i class="fa fa fa-shopping-cart"></i> Checkout</Button>
                        <Button class="btn btn-white"><i class="fa fa-arrow-left"></i> Continue shopping</Button>
    
                    </Card.Body>
                </Card>
    
            </Col>
            <Col md-3>
                <Card>
                    <Card.Title>
                        <h5>Cart Summary</h5>
                    </Card.Title>
                    <Card.Body>
                        <span>
                            Total
                        </span>
                        <h2 class="font-bold">
                            $390,00
                        </h2>
    
                        <hr></hr>
                        <span class="text-muted small">
                            *For United States, France and Germany applicable sales tax will be applied
                        </span>
                        <div class="m-t-sm">
                            <Button>
                            <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-shopping-cart"></i> Checkout</a>
                            <a href="#" class="btn btn-white btn-sm"> Cancel</a>
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
    
                <Card>
                    <Card.Title>
                        <h5>Support</h5>
                    </Card.Title>
                    <div class="ibox-content text-center">
                        <h3><i class="fa fa-phone"></i> +254 746 362 456</h3>
                        <span class="small">
                            Please contact with us if you have any questions. We are available 24 hours.
                        </span>
                    </div>
                </Card>
    
                <Card>
                    <Card.Body>
    
                        <p class="font-bold">
                        Other related products
                        </p>
                        <hr></hr>
                        <div>
                            <a href="#" class="product-name"> Product 1</a>
                            <div class="small m-t-xs">
                                Product 1 description
                            </div>
                            <div class="m-t text-righ">
    
                                <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i class="fa fa-long-arrow-right"></i> </a>
                            </div>
                        </div>
                        <hr></hr>
                        <div>
                            <a href="#" class="product-name"> Product 2</a>
                            <div class="small m-t-xs">
                                Product 2 description
                            </div>
                            <div class="m-t text-righ">
    
                                <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i class="fa fa-long-arrow-right"></i> </a>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
    
    );
}


export default Cart;