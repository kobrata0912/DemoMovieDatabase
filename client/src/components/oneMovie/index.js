import { Button, Col, Form, Row } from "react-bootstrap";
import { useContext, useState } from 'react'
import UserContext from '../../utils/userContext'

function OneMovie(props) {

    const userContext = useContext(UserContext)
    const [movieId] = useState(props.id)

    const isFavorite = userContext.user.favorites.movies_ids.indexOf(props.id) !== -1 ? true : false;

    const picture = props.poster_path !== null ? 'https://image.tmdb.org/t/p/original/' + props.poster_path : '/no-poster.jpg'

    const handleAdd = (event) => {
        event.preventDefault()
        userContext.addFavorites(userContext.user, movieId)
    }

    const handleRemove = (event) => {
        event.preventDefault()
        userContext.removeFavorites(userContext.user, movieId)
    }
    return (

        <Row className="m-2">
            <Col xl={{ span: 2, offset: 1 }}>
                <img src={picture} style={{ width: '12rem' }} alt="NO MOVIE POSTER" />
            </Col>
            <Col xl={7}>
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
                        {isFavorite ? (
                            <Form onSubmit={handleRemove}>
                            <Button style={{ width: "200px" }} variant="primary" type="submit">Remove from favorites</Button>
                            </Form>
                        ) : (
                            <Form onSubmit={handleAdd}>
                            <Button style={{ width: "140px" }} variant="primary" type="submit">Add to favorites</Button>
                            </Form>
                        )}
                </Row>
            </Col>
        </Row>
    )
}

export default OneMovie