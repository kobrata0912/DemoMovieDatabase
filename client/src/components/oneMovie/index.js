import { Button, Col, Form, Row } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useContext, useState } from 'react'
import UserContext from '../../utils/userContext'
import { toast } from "react-toastify";

function OneMovie(props) {

    const userContext = useContext(UserContext)
    
    const [movie] = useState({id: props.id, overview: props.overview, poster_path: props.poster_path, title: props.title, release_date: props.release_date.split("-")[0]})

    const isFavorite = userContext.user.loggedIn === true ? userContext.user.favorites.movies_ids.findIndex(i => i.id === movie.id) !== -1 ? true : false : false

    const picture = props.poster_path !== null ? 'https://image.tmdb.org/t/p/original/' + props.poster_path : '/no-poster.jpg'

    const handleAdd = (event) => {
        event.preventDefault()
        if (userContext.user.loggedIn) {
            userContext.addFavorites(userContext.user, movie)
        } else {
            toast.error("You need to log in first!")
        }

    }

    const handleRemove = (event) => {
        event.preventDefault()
        userContext.removeFavorites(userContext.user, movie)
    }
    return (

        <Row className="m-2">
            <Col xl={{ span: 2, offset: 1 }}>
                <img src={picture} style={{ width: '12rem' }} alt="Movie poster" />
            </Col>
            <Col xl={7}>
                <Row className="m-1">
                    <Link to={{pathname: `/movie_details/${props.id}`}}><h4>{props.title} ({props.release_date.split("-")[0]})</h4></Link>
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