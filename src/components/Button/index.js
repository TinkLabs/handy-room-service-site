import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	type: PropTypes.string,
	onClick: PropTypes.func,
};

const defaultProps = {
	children: null,
	type: 'button',
	onClick: () => {},
};

const Button = ({
	children,
	onClick,
	staticContext,
	type,
	...props
}) => (
	<button
		onClick={() => { setTimeout(onClick, 10); }}
		staticcontext={staticContext}
		type={type}
		{...props}
	>
		{children}
	</button>
);
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default withRouter(Button);
