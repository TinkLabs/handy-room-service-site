import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { priceDisplay } from 'utils/price';
import styles from './style.scss';


const propTypes = {
	error: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	price: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	imageUrl: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	isActive: PropTypes.bool,
};

const defaultProps = {
	error: null,
	title: '',
	subtitle: '',
	price: '',
	imageUrl: '',
	children: null,
	isActive: false,
};

const ItemCard = ({
	error, title, subtitle, price, imageUrl, children, isActive, currency_symbol,
	currency_decimal_places,
}) => (
	<div
		className={classnames('card', styles.card, { [styles.active]: isActive })}
	>
		<div>
			{imageUrl ?
				<div
					className={styles.image}
					style={{ backgroundImage: `url(${imageUrl})` }}
				/>
				: null}
			<div className={classnames(styles.bio, { noImage: !imageUrl })}>
				{title ?
					<div className={classnames({ [styles.red]: error }, styles.title)}>
						{title}
					</div>
					: null }
				{price ?
					<span className={styles.price}>
						{priceDisplay(currency_symbol, price, currency_decimal_places)}
					</span>
					: null}
				{subtitle ? <p>{subtitle}</p> : null}
				{error ? <span className={styles.error}>{error}</span> : null }
			</div>
		</div>
		<div>
			{children}
		</div>
	</div>
);

ItemCard.propTypes = propTypes;
ItemCard.defaultProps = defaultProps;

const mapStateToProps = state => ({
	currency_symbol: state.getIn(['roomServiceConfig', 'currency_symbol'], '$'),
	currency_decimal_places: state.getIn(['roomServiceConfig', 'currency_decimal_places']),
});

export default withRouter(connect(mapStateToProps, null)(ItemCard));
