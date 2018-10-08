import React from 'react';
import classnames from 'classnames';
import { Button } from 'components';
import PropTypes from 'prop-types';
import styles from './style.scss';
import DeliveryTimeBox from '../DeliveryTimeBox';

const propTypes = {
	title: PropTypes.string,
	onClick: PropTypes.func,
	hasNextArrow: PropTypes.bool,
	subtitle: PropTypes.string,
	deliveryTimeSlotStart: PropTypes.string,
	deliveryTimeSlotEnd: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	isActive: PropTypes.bool,
};

const defaultProps = {
	title: '',
	onClick: () => { },
	hasNextArrow: false,
	subtitle: '',
	deliveryTimeSlotStart: '',
	deliveryTimeSlotEnd: '',
	children: null,
	isActive: false,
};

const CategoryCard = ({
	title, onClick, hasNextArrow, subtitle, deliveryTimeSlotStart,
	deliveryTimeSlotEnd, isActive, children, locale,
}) => (
	<Button
		className={classnames(styles.card, 'card', { [styles.active]: isActive })}
		onClick={onClick}
	>
		<div className={classnames(styles.textDiv)}>
			<div>{title}</div>
			{subtitle && <span>{subtitle}</span>}
			{children}
		</div>
		{
			<DeliveryTimeBox
				className={classnames(styles.deliveryTimeDiv)}
				deliveryTimeSlotEnd={deliveryTimeSlotEnd}
				deliveryTimeSlotStart={deliveryTimeSlotStart}
				locale={locale}
			/>
		}
		{hasNextArrow && <span className={classnames(styles.arrow, 'icon icon-handy-icon-right-arrow')} />}
	</Button>
);

CategoryCard.propTypes = propTypes;
CategoryCard.defaultProps = defaultProps;

export default CategoryCard;
