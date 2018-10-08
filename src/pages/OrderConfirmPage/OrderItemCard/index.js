import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	count: PropTypes.number,
};

const defaultProps = {
	title: '',
	subtitle: '',
	count: 0,
};

const OrderItemCard = ({
	title,
	subtitle,
	count,
}) => (
	<div className={styles.card}>
		<h3>{`${count} x ${title}`}</h3>
		<p>{subtitle}</p>
	</div>

);

OrderItemCard.propTypes = propTypes;
OrderItemCard.defaultProps = defaultProps;

export default OrderItemCard;
