import React, { useContext } from "react"
import { Card, Button, Form } from "react-bootstrap"
import UserContext from "../../utils/userContext"
import {Link} from 'react-router-dom'

function OneFavorite(props) {

    const userContext = useContext(UserContext)

    const picture = props.poster_path !== null ? 'https://image.tmdb.org/t/p/original/' + props.poster_path : '/no-poster.jpg'

    const handleRemove = (event) => {
        event.preventDefault()
        userContext.removeFavorites(userContext.user, props)
    }

    return (
        <Card style={{ width: '18rem' }} className="m-1 p-1">
            <Card.Img variant="top" src={picture} />
            <Card.Body>
            <Link to={{pathname: `/movie_details/${props.id}`}}><Card.Title>{props.title} ({props.release_date})</Card.Title></Link>
                <Card.Text>
                    {props.overview.substring(0, 150).concat("...")}
                </Card.Text>
                <Form onSubmit={handleRemove}>
                            <Button style={{ width: "200px" }} variant="primary" type="submit">Remove from favorites</Button>
                            </Form>
            </Card.Body>
        </Card>
    )

}

export default OneFavorite