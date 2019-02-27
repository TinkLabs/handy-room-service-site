import React from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import styles from './style.scss';


class DatetimeHr extends React.Component {
	constructor(props) {
		super(props);
		moment.locale('en', {
			calendar: {
				lastDay: '[Yesterday,] MMMM D YYYY',
				lastWeek: '[Last] dddd[,] MMMM D YYYY',
				sameDay: '[Today]',
				sameElse: 'MMMM D YYYY',
			},
		});
		moment.tz.setDefault(props.timezone);
	}
	render() {
		return (
			<div className={styles.datetimehr}>
				<span>{moment.unix(this.props.momentDateTime.unix()).calendar()}</span>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	timezone: state.getIn(['roomServiceConfig', 'timezone']),
});

export default connect(mapStateToProps)(DatetimeHr);
