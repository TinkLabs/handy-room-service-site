import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { priceDisplay } from 'utils/price';
import styles from './style.scss';

const propTypes = {
	name: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	price: PropTypes.number,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	active: PropTypes.bool,
};

const defaultProps = {
	name: '',
	price: 0,
	children: null,
	active: false,
};

const AnswerCard = ({
	name,
	price,
	active,
	children,
	currency_symbol,
	currency_decimal_places,
}) => (
	<div
		className={classnames(styles.choice, { [styles.active]: active })}
	>
		<div className={styles.left}>
			<span className={styles.name}>{name}</span>
			{price ?
				<span className={styles.price}>
					{priceDisplay(currency_symbol, price, currency_decimal_places)}
				</span>
				: null
			}
		</div>
		<div className={styles.controls}>
			{children}
		</div>
	</div>
);

AnswerCard.propTypes = propTypes;
AnswerCard.defaultProps = defaultProps;

const mapStateToProps = state => ({
	currency_symbol: state.getIn(['roomServiceConfig', 'currency_symbol']),
	currency_decimal_places: state.getIn(['roomServiceConfig', 'currency_decimal_places']),
});

export default withRouter(connect(mapStateToProps, null)(AnswerCard));
