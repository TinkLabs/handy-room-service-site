import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'components';
import classnames from 'classnames';
import ShoppingCart from 'records/ShoppingCart';
import t from 'translation';
import styles from './style.scss';

const propTypes = {
	onClickCallback: PropTypes.func,
	count: PropTypes.number,
};

const defaultProps = {
	onClickCallback: () => {},
	count: 0,
};

const CheckoutButton = ({ history, count, onClickCallback }) => {
	if (!count) return null;
	return (
		<React.Fragment>
			<div className={styles.footerPlaceholder} />
			<footer className={styles.footer} >
				<Button
					onClick={() => {
						history.push('/checkout');
						onClickCallback();
					}}
					className={classnames('btn', 'orange', styles.button)}
				>
					<span className={styles.badge}>{t('%{count} Item', { count })}</span>
					<span className={styles.label}>
						{t('Go to Checkout')}
						<span className="icon icon-handyicon-fonta-right" />
					</span>
				</Button>
			</footer>
		</React.Fragment>);
};

CheckoutButton.propTypes = propTypes;
CheckoutButton.defaultProps = defaultProps;

const mapStateToProps = state => ({
	count: state.getIn(['order', 'shoppingCart'], new ShoppingCart()).itemCount(),
});

export default connect(mapStateToProps)(withRouter(CheckoutButton));
