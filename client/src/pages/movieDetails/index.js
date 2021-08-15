import React, { useEffect, useState } from "react";
import { Container, Row } from 'react-bootstrap'
import { toast } from "react-toastify";
import OneMovie from "../../components/oneMovie";
import OneNote from "../../components/oneNotes";
import OneRating from "../../components/oneRating"

function MovieDetails(props) {

    const [movie, setMovie] = useState({})

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