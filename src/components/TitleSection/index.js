import React from 'react';
import classnames from 'classnames';
import Immutable from 'immutable';
import t from 'translation';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './style.scss';
import DeliveryTimeBox from '../DeliveryTimeBox';

const propTypes = {
	title: PropTypes.string,
	hintText: PropTypes.string,
	details: PropTypes.string,
	deliveryTimeSlotStart: PropTypes.string,
	deliveryTimeSlotEnd: PropTypes.string,
	weekdaysAvailable: PropTypes.instanceOf(Immutable.List),
	backgroundColor: PropTypes.string,
};

const defaultProps = {
	title: null,
	hintText: null,
	details: null,
	deliveryTimeSlotStart: '',
	deliveryTimeSlotEnd: '',
	weekdaysAvailable: Immutable.List(),
	backgroundColor: '',
};

const getWeekdaysAvailableText = (weekdaysAvailable = Immutable.List()) => {
	if (weekdaysAvailable.equals(Immutable.List([0, 1, 2, 3, 4, 5, 6]))) {
		return t('Everyday');
	} else if (weekdaysAvailable.equals(Immutable.List([1, 2, 3, 4, 5]))) {
		return t('Monday to Friday');
	} else if (weekdaysAvailable.equals(Immutable.List([0, 6]))) {
		return t('Saturday and Sunday');
	}
	const weekdaysShortform = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
	let weekdaysArray = [];
	weekdaysArray = weekdaysAvailable.map(day => weekdaysShortform[day]);
	return weekdaysArray.join('/');
};
const TitleSection = ({
	title,
	details,
	deliveryTimeSlotStart,
	deliveryTimeSlotEnd,
	weekdaysAvailable,
	hintText,
	locale,
	backgroundColor,
}) => (
	<div className={classnames('container', styles.hero)}>
		<div className={styles.backgroundColor} style={{ backgroundColor }} />
		{title ? <div className={styles.text}><h2>{title}</h2></div> : null}
		{details ? <p className={styles.details}>{details}</p> : null}
		{ (deliveryTimeSlotStart && deliveryTimeSlotEnd) ||
		(weekdaysAvailable && weekdaysAvailable.size) ?
			<div className={styles.details}>
				<DeliveryTimeBox
					className={classnames(styles.deliveryTimeDiv)}
					deliveryTimeSlotEnd={deliveryTimeSlotEnd}
					deliveryTimeSlotStart={deliveryTimeSlotStart}
					locale={locale}
				/>
				<div className={styles.right}>
					<span className={classnames(classnames(styles.calendar), 'icon icon-handy-icon-order')} />
					{getWeekdaysAvailableText(weekdaysAvailable)}
				</div>
			</div>
			: null
		}
		{hintText ? <span className={styles.hint}>{hintText}</span> : null}
	</div>
);
TitleSection.propTypes = propTypes;
TitleSection.defaultProps = defaultProps;

export default withRouter(TitleSection);
