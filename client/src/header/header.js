import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import "./header.css"

function Header() {
    const {user, isAuthenticated, loginWithRedirect, logout, loginWithPopup} = useAuth0();

    const handleLogin = () => {
        loginWithPopup();
    };
    const handleLogut = () => {
        logout({ returnTo: window.location.origin });
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
            <Navbar.Brand href="#">Page</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="">Home</Nav.Link>
            </Nav>
            {
                isAuthenticated ? (<Nav.Link onClick={handleLogut}>Logut</Nav.Link>):(
                    (<Nav.Link onClick={handleLogin}>Login</Nav.Link>)
                )
                
            }
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Header;