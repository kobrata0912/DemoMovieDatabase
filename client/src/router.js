import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserContext from './utils/userContext';

import Home from './pages/home'
import Login from './pages/login';
import Register from './pages/register';
import Search from './pages/search'
import MovieDetails from './pages/movieDetails';


const MyRouter = () => {
    const userContext = useContext(UserContext);
	const loggedIn = userContext.user && userContext.user.loggedIn;

	return (
		<Switch>
			<Route exact path='/home' component={Home} />
			<Route exact path='/login'>
			{loggedIn ? <Redirect to='/home' /> : <Login />}
			</Route>
			<Route exact path='/register'>
			{loggedIn ? <Redirect to='/home' /> : <Register />}
			</Route>
			<Route exact path='/search/:movie_title' component={Search} />
			<Route exact path='/movie_details/:movie_id' component={MovieDetails} />
			<Route exact path='/' component={Home} />
			{/* <Route component={Error} /> */}
		</Switch>
	);

}

export default MyRouter;