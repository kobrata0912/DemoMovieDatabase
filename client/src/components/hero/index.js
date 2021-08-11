import { Container, Image, Row } from 'react-bootstrap'

function Hero() {
    return (
        <Container fluid style={{position:"relative", textAlign:"center"}} >
            <Row>
                <Image src="background.jpg" fluid style={{height:"400px"}}/>
                <span style={{position: "absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}><strong>Welcome to my Movie Database :)</strong></span>
            </Row>
        </Container>
    );
}

export default Hero;
