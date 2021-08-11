import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserContext from './utils/userContext';

import Home from './pages/home'
import Login from './pages/login';


const MyRouter = () => {
    const userContext = useContext(UserContext);
	const loggedIn = userContext.user && userContext.user.loggedIn;

	return (
		<Switch>
			<Route exact path='/home' component={Home} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/' component={Home} />
			{/* <Route component={Error} /> */}
		</Switch>
	);

}

export default MyRouter;