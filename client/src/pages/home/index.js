import React, { useContext } from "react";
import Hero from '../../components/hero/'
import Favorites from "../../components/favorites"
import UserContext from "../../utils/userContext";

function Home() {

    const userContext = useContext(UserContext)

    return (
        <React.Fragment>
            <Hero />
            {
                userContext.user.loggedIn === true ? (<Favorites />) : ('')
            }
        </React.Fragment>
    )
}

export default Home;