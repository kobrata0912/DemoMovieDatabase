import { useContext } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import UserContext from '../../utils/userContext';

function NavigationBar() {

    const userContext = useContext(UserContext)
    const {logOut} = userContext;

    return (
        <Navbar bg="light" variant="pills">
            <Container fluid lg={2}>
                <Navbar.Brand>My Movies Collection</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link><Link style={{"text-decoration": "none", "color":"black"}} to="/home">Home</Link></Nav.Link>
                {!userContext.user || !userContext.user.loggedIn ? (
					<Nav.Link><Link style={{"text-decoration": "none", "color":"black"}} to="/login">Log In</Link></Nav.Link>
				) : (
					''
				)}
                {!userContext.user || !userContext.user.loggedIn ? (
					<Nav.Link><Link style={{"text-decoration": "none", "color":"black"}} to="/register">Register</Link></Nav.Link>
				) : (
					''
				)}
                <Nav.Link><Link style={{"text-decoration": "none", "color":"black"}} to="/search">Search</Link></Nav.Link>
                {userContext.user && userContext.user.loggedIn ? (
					<Nav.Link style={{"text-decoration": "none", "color":"black"}} onClick={logOut}>Log out</Nav.Link>
				) : (
					''
				)}
                </Nav>
            </Container>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search by movie title ..."
                    className="mr-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar>
    );
}

export default NavigationBar;
