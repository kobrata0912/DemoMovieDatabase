import React, { useContext, useState } from "react"
import { Card, Button } from "react-bootstrap"
import UserContext from "../../utils/userContext"

function OneFavorite(props) {

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
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )

}

export default OneFavorite