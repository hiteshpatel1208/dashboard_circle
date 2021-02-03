import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color='light' light expand='md'>
                <NavbarBrand href="/">
                    <img src='https://www.circle.com/hubfs/favicon.ico'
                        height='25'
                        width='25'
                        alt='Circle Logo'
                    />
                    {' '}
					Dashboard
				</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className='nav-link' to='/listing'>Listing Screen</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/create'>Submit a Payment</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    )
}
