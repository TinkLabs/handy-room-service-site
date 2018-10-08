import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.scss';

const propTypes = {
	price: PropTypes.number,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	active: PropTypes.bool,
};

const defaultProps = {
	price: 0,
	children: null,
	active: false,
};

const AnswerCard = ({
	price,
	description,
	children,
	active,
}) => (
	<div
		className={classnames(styles.choice, { [styles.active]: active })}
	>
		<span className={styles.price}>{price}</span>
		<span className={styles.description}>{description}</span>
		<div className={styles.controls}>
			{children}
		</div>
	</div>
);

AnswerCard.propTypes = propTypes;
AnswerCard.defaultProps = defaultProps;

export default AnswerCard;
