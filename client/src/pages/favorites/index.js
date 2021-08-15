import React, { useMemo, useContext } from "react"
import { Container, Row } from "react-bootstrap"
import OneFavorite from '../../components/oneFavorite'
import UserContext from "../../utils/userContext"

function Favorites() {

    const userContext = useContext(UserContext)

    const renderFavorites = useMemo(() => {
        return userContext.user.favorites.movies_ids.map((oneFavorite, index) => {
            return <OneFavorite key={oneFavorite.id} index={index} {...oneFavorite} />;
        });
    }, [userContext.user.favorites])

    return (
        <Container fluid className="p-4">
            <Row style={{ textAlign: "center" }}>
                <h1>Your favorites</h1>
            </Row>
            <Row className="border p-4" style={{ textAlign: "center" }}>
                {userContext.user.favorites.movies_ids.length > 0 ? renderFavorites : <h5>You still don't have favorite movies, check out the search page and find your favorites!</h5>}
            </Row>
            </Container>
    )

}

export default Favorites