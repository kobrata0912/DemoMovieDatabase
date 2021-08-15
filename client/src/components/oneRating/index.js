import React, { useContext, useEffect, useState } from "react"
import ReactStars from 'react-stars'
import { Row, Col, Button } from "react-bootstrap"
import UserContext from "../../utils/userContext"
import { toast } from "react-toastify"

function OneRating(props) {
    const userContext = useContext(UserContext)
    const [ratings, setRatings] = useState([])
    let rating = 0

    ratings.filter((x) => {
        if (x.id === props.id) {
            rating = x.rating
            return false
        }
        return false
    })

    const handleRating = (rating) => {
        if (userContext.user.loggedIn) {
            userContext.addRatings(userContext.user, { id: props.id, rating })
        } else {
            toast.error("You need to log in first!")
        }
    }

    const removeRating = () => {
        userContext.removeRatings(userContext.user, props.id)
    }

    useEffect(() => {
        if (userContext.user.loggedIn) {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json",
                        'x-access-token': userContext.user.user.token
                    }
                }

                fetch(`http://localhost:4001/ratings`, requestOptions)
                    .then(res => res.json())
                    .then(fetchRatings => {
                        setRatings(fetchRatings)
                    })

            } catch (e) {
                console.log(e)
                toast.error('' + e)
            }
        }

    }, [userContext.user.ratings])

    return (
        <Row className="m-2">
            <Col xl={{ span: 8, offset: 1 }}>
                <h4><strong>Your rating:</strong></h4>
            </Col>
            <Col xl={{ span: 3, offset: 1 }}>
                <ReactStars
                    count={5}
                    onChange={handleRating}
                    size={48}
                    color2={'#ffd700'}
                    value={rating}
                />
            </Col>
            {userContext.user.loggedIn && rating > 0 ?
                <Col xl={{ span: 3 }} className="mt-3 pt-2">
                        <Button onClick={removeRating}>Remove your rating</Button>
                </Col>
                :
                ''
            }
        </Row>
    )

}

export default OneRating