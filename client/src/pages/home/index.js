import React from "react";
import Hero from '../../components/hero/'
import Favorites from "../../components/favorites"

const Home = () => {
    return (
        <React.Fragment>
            <Hero/>
            <Favorites/>
        </React.Fragment>
    )
}

export default Home;