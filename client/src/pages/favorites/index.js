import React, { useState, useMemo, useEffect, useContext } from "react"
import { Row } from "react-bootstrap"
import OneFavorite from '../../components/oneFavorite'
import UserContext from "../../utils/userContext"
import { toast } from "react-toastify"

function Favorites() {

    const userContext = useContext(UserContext)
    const [favorites, setFavorites] = useState(userContext.user.favorites.movies_ids)

    const renderFavorites = useMemo(() => {
        return favorites.map((oneFavorite, index) => {
            return <OneFavorite key={oneFavorite.id} index={index} {...oneFavorite} />;
        });
    }, [favorites])

    useEffect(() => {
        const favs = []

        userContext.user.favorites.movies_ids.forEach(async (movie) => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': "application/json", 'x-access-token': userContext.user.user.token },
            }
            await fetch(`http://localhost:4001/movie_details?movie_id=${movie}`, requestOptions)
                .then(resp => resp.json())
                .then(movie_details => {
                    favs.push(movie_details)
                })
                .catch((e) => {
                    toast.error('error is ' + e);
                });
        })
        setFavorites(favs)
    }, [userContext.user.favorites.movies_ids, userContext.user.user.token])

    return (
        <React.Fragment>
            <Row style={{ textAlign: "center" }}>
                <h1>Your favorites</h1>
            </Row>
            <Row sm={12} style={{ textAlign: "center" }}>
                {renderFavorites}
            </Row>
        </React.Fragment>
    )

}

export default Favorites