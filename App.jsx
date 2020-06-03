import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AllRecommendations from './pages/AllRecommendations/AllRecommendations';
import NewRecommendation from './pages/NewRecommendation/NewRecommendation';
import Recommentaion from './pages/Recommendation/Recommendation';
import SideBar from './components/SideBar/SideBar';
import About from './components/About/About';
import Login from './pages/Login/Login';
import routes from './modules/navigation/routes';
import history from './modules/navigation/history';
import {
	authorizationUser,
	authorizationIsLoading,
} from './modules/redux/authorization/authorization.selectors';
import { Layout } from 'antd';

import 'antd/dist/antd.css';
import './theme/global.scss';

export class App extends React.Component {
	render() {
		return (
			<Router history={history}>
				{this.props.user === null ? (
					<Login />
				) : (
					<Layout>
						<Layout.Sider>
							<SideBar />
						</Layout.Sider>
						<Layout>
							<Layout.Content>
								<Switch>
									<Route
										exact
										path={routes.recommendations}
										component={AllRecommendations}
									/>
									<Route
										exact
										path={routes.newRecommendation}
										component={NewRecommendation}
									/>
									<Route exact path={routes.about} component={About} />
									<Route
										exact
										path={routes.recommendationId}
										component={Recommentaion}
									/>
								</Switch>
							</Layout.Content>
						</Layout>
					</Layout>
				)}
			</Router>
		);
	}
}

Route.propTypes = {
	path: PropTypes.string,
	exact: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	render: PropTypes.func,
};

App.propTypes = {
	user: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		isLoading: authorizationIsLoading(state),
		user: authorizationUser(state),
	};
};

export default connect(mapStateToProps)(App);
