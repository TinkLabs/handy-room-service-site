import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { Switch, withRouter } from 'react-router-dom';
import t from 'translation';
import getRoomServiceConfig from 'api/getRoomServiceConfig';
import { initRoomServiceConfig } from 'modules/roomServiceConfig';
import { initRoomServiceCategories } from 'modules/roomServiceCategories';
import { initRoomServiceItems } from 'modules/roomServiceItems';
import ScrollToTopRoute from 'components/ScrollToTopRoute';
import getConfig from 'getConfig';
import Homepage from './Homepage';
import ItemPage from './ItemPage';
import OrderHistoryPage from './OrderHistoryPage';
import CheckoutPage from './CheckoutPage';
import CategoryPage from './CategoryPage';
import OrderConfirmPage from './OrderConfirmPage';
import ErrorTryAgainPage from './ErrorTryAgainPage';
import ErrorRefreshPage from './ErrorRefreshPage';

const propTypes = {
};

const defaultProps = {
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			comingSoon: false,
		};
	}
	componentWillMount() {
		getRoomServiceConfig()
			.then(({
				room_service_config,
				room_service_categories,
				room_service_items,
			}) => {
				this.props.initRoomServiceConfig(room_service_config);
				this.props.initRoomServiceCategories(room_service_categories);
				this.props.initRoomServiceItems(room_service_items);
				this.setState({
					loaded: true,
				});
			})
			.catch((error) => {
				console.error(error.response);
				this.setState({
					comingSoon: true,
				});
			});
	}
	render() {
		if (this.state.comingSoon) {
			return (
				<h2 style={{ textAlign: 'center' }}>
					{t('Coming Soon...')}
				</h2>
			);
		}
		if (!this.state.loaded) return null;
		return (
			<React.Fragment>
				<Helmet>
					<title>{getConfig().title}</title>
				</Helmet>
				<Switch>
					<ScrollToTopRoute
						exact
						path="/"
						component={Homepage}
					/>
					<ScrollToTopRoute
						exact
						path="/orders"
						component={OrderHistoryPage}
					/>
					<ScrollToTopRoute
						exact
						path="/category/:id"
						component={CategoryPage}
					/>
					<ScrollToTopRoute
						exact
						path="/item/:id"
						component={ItemPage}
					/>
					<ScrollToTopRoute
						exact
						path="/checkout"
						component={CheckoutPage}
					/>
					<ScrollToTopRoute
						exact
						path="/confirm"
						component={OrderConfirmPage}
					/>
					<ScrollToTopRoute
						exact
						path="/error-outdated"
						component={ErrorRefreshPage}
					/>
					<ScrollToTopRoute
						exact
						path="/error"
						component={ErrorTryAgainPage}
					/>
				</Switch>
			</React.Fragment>
		);
	}
}
App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => ({
	initRoomServiceConfig: bindActionCreators(initRoomServiceConfig, dispatch),
	initRoomServiceCategories: bindActionCreators(initRoomServiceCategories, dispatch),
	initRoomServiceItems: bindActionCreators(initRoomServiceItems, dispatch),
});
export default withRouter(connect(null, mapDispatchToProps)(App));
