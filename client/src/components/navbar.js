import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap'

function NavigationBar() {
    return (
        <Navbar bg="light" variant="light">
            <Container fluid>
                <Navbar.Brand href="#home">My Movies Collection</Navbar.Brand>
                <Nav className="me-auto">
                </Nav>
            </Container>
            <Container fluid>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
