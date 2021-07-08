import React from 'react';

//import bootstraps
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavbarComponent = () => {
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home" >Polybase</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#create_store">Create Store</Nav.Link>
                    <Nav.Link href="#sell">Prices</Nav.Link>
                    
                </Nav>
                <Nav>
                <NavDropdown title="Login" id="collasible-nav-dropdown">
                        <NavDropdown.item href="#action/3.1">Action1</NavDropdown.item>
                        <NavDropdown.item href="#action/3.2">Action1</NavDropdown.item>
                        <NavDropdown.item href="#action/3.3">Action1</NavDropdown.item>
                        <NavDropdown.Divider/>
                        <NavDropdown.item href="#action/3.4">Action1</NavDropdown.item>
                    </NavDropdown>
                    <Nav.Link href="#help">Help</Nav.Link>
                    <Nav.Link event={2} href="#cart">Cart</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default NavbarComponent;