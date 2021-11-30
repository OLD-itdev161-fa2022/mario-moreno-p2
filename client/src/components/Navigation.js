import React from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from "react-bootstrap"

function Navigation({user, isLogged}) {

    const login = () => {
        isLogged();
    }

    return (
        <header>
            <Navbar variant = "dark" bg ="dark">
            <NavbarBrand className = "ms-3"><strong>MMF FP2</strong></NavbarBrand>
            <Nav className = "ms-auto">
                <Nav.Link as ={NavLink} to ="/">Menu</Nav.Link>
                { user && <Nav.Link as ={NavLink} to ="/create-product">New Product</Nav.Link>}
                
            </Nav>
            <Nav className = "me-3">
                
                { user ? <Nav.Link as ={NavLink} to ="" onClick ={() => login()}>Log out</Nav.Link> :
                <Nav.Link as ={NavLink} to ="/" onClick = {() => login()}>Log in</Nav.Link>
            }
                
            </Nav>
            </Navbar>
        </header>
    )
}

export default Navigation
