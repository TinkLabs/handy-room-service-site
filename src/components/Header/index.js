import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './style.scss';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	hasBackButton: PropTypes.bool,
	backgroundColor: PropTypes.string,
	onBack: PropTypes.func,
};

const defaultProps = {
	children: null,
	hasBackButton: false,
	backgroundColor: '',
	onBack: () => {},
};

const Header = ({
	children,
	hasBackButton,
	backgroundColor,
	onBack,
	history,
}) => (
	<header className={styles.header} style={{ backgroundColor }}>
		{hasBackButton ?
			<button
				type="button"
				onClick={() => {
					onBack();
					history.goBack();
				}}
				className={styles.buttonBack}
			>
				<span className="icon icon-handyicon-fonta-left" />
			</button>
			: null}
		<span className={styles.title}>{children}</span>
	</header>
);
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withRouter(Header);
