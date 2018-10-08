import React from 'react';
import { Route, withRouter } from 'react-router-dom';

// Fix React router didnt scrollToTop when route chamge
class ScrollToTopRoute extends React.Component {
	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}
	render() {
		const { component: Component, ...rest } = this.props;
		return <Route {...rest} render={props => (<Component {...props} />)} />;
	}
}

export default withRouter(ScrollToTopRoute);
