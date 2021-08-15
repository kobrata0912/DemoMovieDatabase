import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from 'react-bootstrap'
import { toast } from "react-toastify";
import OneMovie from "../../components/oneMovie";
import OneNote from "../../components/oneNotes";
import OneRating from "../../components/oneRating"
import UserContext from "../../utils/userContext";

function MovieDetails(props) {

    const userContext = useContext(UserContext)
    const [movie, setMovie] = useState({})
    const [notes, setNotes] = useState({})

    useEffect(() => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                },
            }
            fetch(`http://localhost:4001/movie_details?movie_id=${props.match.params.movie_id}`, requestOptions)
                .then(res => res.json())
                .then(movie_details => {
                    setMovie(movie_details)
                })
                .catch((e) => {
                    toast.error('' + e);
                });
        } catch (e) {
            console.log(e)
            toast.error('' + e)
        }

    }, [props.match.params.movie_id])

    return (
        <Container fluid className="mt-5">
            {movie.id !== undefined ?
                <React.Fragment>
                    <Row>
                        <OneMovie {...movie} />
                    </Row>
                    <Row >
                        <OneRating {...movie} />
                    </Row>
                    <Row >
                        <OneNote {...movie} />
                    </Row>
                </React.Fragment>
                :
                "loading"
            }
        </Container>
    )
}

export default MovieDetails;