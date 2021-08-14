import { useContext, useState } from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../utils/userContext';

function NavigationBar() {

    const history = useHistory();

    const [searchTitle, setSearchTitle] = useState('')

    const userContext = useContext(UserContext)
    const {logOut} = userContext;

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchTitle('');
        history.push(`/search/${searchTitle}`)
    }

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
            <Form style={{width:"400px"}} className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                    type="search"
                    placeholder="Search by movie title ..."
                    className="mr-2"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    aria-label="Search"
                />
                <Button variant="outline-success" style={{marginLeft: "10px"}} disabled={searchTitle === ''} type="submit">Search</Button>
            </Form>
        </Navbar>
    );
}

export default NavigationBar;
