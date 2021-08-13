import { Card, Button, Col, Row } from "react-bootstrap";


function OneMovie(props) {

    const picture = 'https://image.tmdb.org/t/p/original/' + props.poster_path

    return (

        <Row className="m-2">
            {/* <Card style={{ width: '18rem' }} className="p-1 m-2">
            <img src={picture} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.overview}
                </Card.Text>
                <Button variant="primary">Add to favorites</Button>
            </Card.Body>
            </Card> */}
            <Col sm={{span: 2, offset: 1}}>
                <img src={picture} style={{ width: '12rem' }} />
            </Col>
            <Col sm={7}>
                <Row className="m-1">
                    <h4>{props.title} ({props.release_date.split("-")[0]})</h4>
                </Row>
                <Row className="m-3">
                    GENRE TO BE ADDED
                </Row>
                <Row className="m-3">
                    {props.overview}
                </Row>
                <Row className="m-3">
                    <Button style={{width:"140px"}} variant="primary">Add to favorites</Button>
                </Row>
            </Col>
        </Row>
    )
}

export default OneMovie