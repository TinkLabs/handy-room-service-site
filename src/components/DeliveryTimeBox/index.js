import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { converthhmmAToHHmm } from 'utils/time';
import styles from './style.scss';

const propTypes = {
	deliveryTimeSlotEnd: PropTypes.string,
	deliveryTimeSlotStart: PropTypes.string,
	locale: PropTypes.string,
	className: PropTypes.string,
};

const defaultProps = {
	deliveryTimeSlotEnd: '',
	deliveryTimeSlotStart: '',
	locale: 'en_US',
	className: '',
};

const DeliveryTimeBox = ({
	deliveryTimeSlotEnd,
	deliveryTimeSlotStart,
	locale,
	className,
}) => {
	if (!deliveryTimeSlotEnd || !deliveryTimeSlotStart) return null;
	const shortLocale = locale.substring(0, 2);
	const from = converthhmmAToHHmm(deliveryTimeSlotStart, shortLocale);
	const to = converthhmmAToHHmm(deliveryTimeSlotEnd, shortLocale);
	return (
		<div className={classnames('delivery-time-slot', className)}>
			<span className={classnames(classnames(styles.clock), 'icon icon-handy-icon-clock')} />
			<span>{`${from} - ${to}`}</span>
		</div>
	);
};

DeliveryTimeBox.propTypes = propTypes;
DeliveryTimeBox.defaultProps = defaultProps;

export default withRouter(DeliveryTimeBox);
