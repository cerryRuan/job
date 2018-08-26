import React from 'react';
import ReactDOM from 'react-dom';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import {
	Provider
} from 'react-redux';
import thunk from 'redux-thunk';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';
import reducers from './reducer';
import './config';
import Login from './container/login/login';
import Bossinfo from './container/bossinfo/bossinfo';
import Geniusinfo from './container/geniusinfo/geniusinfo';
import Register from './container/register/register';
import AuthRoute from './components/authrouter/authroute';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(<Provider store={store}>
	<BrowserRouter>
		<div>
			<AuthRoute></AuthRoute>
			<Switch>
				<Route path='/login' component={Login}></Route>
				<Route path='/bossinfo' component={Bossinfo}></Route>
				<Route path='/geniusinfo' component={Geniusinfo}></Route>
				<Route path='/register' component={Register}></Route>
			</Switch>
		</div>
	</BrowserRouter>
	</Provider>, document.getElementById('root'));