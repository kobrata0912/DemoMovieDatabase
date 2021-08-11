import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap'

function NavigationBar() {
    return (
        <Navbar bg="light" variant="light">
            <Container fluid lg={2}>
                <Navbar.Brand href="#home">My Movies Collection</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/login">Log In</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
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
