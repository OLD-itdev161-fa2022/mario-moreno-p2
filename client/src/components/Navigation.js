import React from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from "react-bootstrap"

function Navigation() {
    return (
        <header>
            <Navbar variant = "dark" bg ="dark">
            <NavbarBrand><strong>MMF FP2</strong></NavbarBrand>
            <Nav >
                <Nav.Link as ={NavLink} to ="/">Menu</Nav.Link>
                <Nav.Link as ={NavLink} to ="/create-product">New Product</Nav.Link>
                <Nav.Link as ={NavLink} to ="/product">Product</Nav.Link>
            </Nav>
            </Navbar>
        </header>
    )
}

export default Navigation
