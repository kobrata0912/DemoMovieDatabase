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
                <Link style={{"textDecoration": "none", "color":"black"}} className="p-2" to="/home">Home</Link>
                {!userContext.user || !userContext.user.loggedIn ? (
					<Link style={{"textDecoration": "none", "color":"black"}} className="p-2" to="/login">Log In</Link>
				) : (
					''
				)}
                {!userContext.user || !userContext.user.loggedIn ? (
					<Link style={{"textDecoration": "none", "color":"black"}} className="p-2" to="/register">Register</Link>
				) : (
					''
				)}
               <Link style={{"textDecoration": "none", "color":"black"}} className="p-2" to="/search/ ">Search</Link>
                {userContext.user && userContext.user.loggedIn ? (
					<Nav.Link style={{"textDecoration": "none", "color":"black"}} className="p-2" onClick={logOut}>Log out</Nav.Link>
				) : (
					''
				)}
                </Nav>
            </Container>
            <Form style={{width:"400px"}}className="d-flex">
                <Form.Control
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
