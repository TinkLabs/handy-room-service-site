import React from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import styles from './style.scss';

moment.locale('en', {
	calendar: {
		lastDay: '[Yesterday,] MMMM D YYYY',
		lastWeek: '[Last] dddd[,] MMMM D YYYY',
		sameDay: '[Today]',
		sameElse: 'MMMM D YYYY',
	},
});

const DatetimeHr = ({
	momentDateTime,
	timezone,
}) => {
	try {
		moment.tz.setDefault(timezone);
	} catch (ex) {
		console.log(ex);
	}
	return (
		<div className={styles.datetimehr}>
			<span>{moment.unix(momentDateTime.unix()).calendar()}</span>
		</div>
	);
};

const mapStateToProps = state => ({
	timezone: state.getIn(['roomServiceConfig', 'timezone']),
});

export default connect(mapStateToProps)(DatetimeHr);
