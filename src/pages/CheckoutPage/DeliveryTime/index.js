import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { updateDeliveryTime } from 'modules/order';
import moment from 'moment-timezone';
import t from 'translation';
import mixpanel from 'utils/mixpanel';
import { get24HourFormat } from 'utils/time';
import 'moment/min/locales.min';
import SetDeliveryTimePopUp from './SetDeliveryTimePopUp';
import styles from './style.scss';

const mixpanelProperties = {
	category: 'checkout',
	subcategory: 'index',
	screen_name: 'ird_checkout_index',
};

const propTypes = {
};
const defaultProps = {
};

const timeDiff = 15;
const ASAP = 'asap';

class DeliveryTimeTab extends ValidatorComponent {
	constructor(props) {
		super(props);
		moment.tz.setDefault(props.timezone);
		moment.locale(props.locale.substring(0, 2), {
			calendar: {
				nextDay: '['.concat(t('Tomorrow')).concat(',] HH:mm'),
				sameDay: '['.concat(t('Today')).concat(',] HH:mm'),
				sameElse: 'MMM DD YYYY, HH:mm',
			},
		});
		this.currentTime = moment().set({
			second: 0, millisecond: 0,
		});
		const { startTime, endTime } = this.props;
		this.startTime = moment(this.currentTime).set({
			hour: startTime.hour(),
			minutes: startTime.minute(),
		});
		this.endTime = moment(this.currentTime).set({
			hour: endTime.hour(),
			minutes: endTime.minute(),
		});
		this.todayArray = this.getTodayArray();
		this.tomArray = this.getTomorrowArray();
		this.defaultTime = this.todayArray[0] || this.tomArray[0];
		if (!this.defaultTime) {
			this.defaultTime = { value: ASAP };
		}
		this.state = {
			showPopUp: false,
			...this.state,
		};
		this.onChangeDeliveryTime = this.onChangeDeliveryTime.bind(this);
		this.onClosePopUp = this.onClosePopUp.bind(this);
		this.onOpenPopUp = this.onOpenPopUp.bind(this);
	}
	componentWillMount() {
		this.initializeDeliveryTime(this.defaultTime.value);
	}
	onClosePopUp() {
		this.setState({
			showPopUp: false,
		});
	}

	onOpenPopUp() {
		this.setState({
			showPopUp: true,
		});
		mixpanel().track('IRD Order Delivery Time Click', {
			...mixpanelProperties,
			delivery_time: this.props.value || 'ASAP',
		});
	}
	onChangeDeliveryTime(time) {
		this.setState({
			showPopUp: false,
		}, () => {
			this.props.onChangeDeliveryTime(time);
		});
	}

	getTodayArray() {
		const time = moment(this.currentTime);
		const arr = [];
		time.add(this.props.time_slot_minimum, 'm');
		let remainder = 0;
		if (time.minute() % timeDiff !== 0) {
			remainder = timeDiff - (time.minute() % timeDiff);
		}
		time.add(remainder, 'm');
		if (this.startTime.isBefore(time) && time.isSameOrBefore(this.endTime)) {
			arr.push({ value: ASAP, label: t('ASAP', {}, 'ASAP') });
		}
		const todayDate = time.date();
		while (time.date() === todayDate) {
			if (this.startTime.isSameOrBefore(time) && time.isSameOrBefore(this.endTime)) {
				arr.push({
					value: moment(time),
					label: time.format('HH:mm'),
				});
			}
			time.add(timeDiff, 'm');
		}
		return arr;
	}
	getTomorrowArray() {
		const time = moment(this.currentTime).add(1, 'days');
		time.set({
			hour: 0, minute: 0,
		});
		const startTime = this.startTime.add(1, 'days');
		const endTime = this.endTime.add(1, 'days');
		const tomDate = time.date();
		const arr = [];
		while (time.date() === tomDate) {
			if (startTime.isSameOrBefore(time) && time.isSameOrBefore(endTime)) {
				arr.push({
					value: moment(time),
					label: time.format('HH:mm'),
				});
			}

			time.add(timeDiff, 'm');
		}
		return arr;
	}

	initializeDeliveryTime(time) {
		if (!this.props.value) {
			this.props.onChangeDeliveryTime(time === ASAP ? null : time);
		}
	}
	render() {
		const { isValid } = this.state;
		return (
			<React.Fragment>
				<div>
					{this.state.showPopUp ?
						<SetDeliveryTimePopUp
							value={this.props.value}
							onCancel={this.onClosePopUp}
							onSet={this.onChangeDeliveryTime}
							todayArray={this.todayArray}
							tomArray={this.tomArray}
						/>
						: null}
				</div>
				<div className={classnames(styles.fieldName)}>
					<span className={!isValid ? styles.red : null}>{t('Delivery Time', {}, 'DELIVERY_TIME')}</span>
					{ !isValid ? <span className={styles.error}>{this.getErrorMessage()}</span> : null }
				</div>
				<button type="button" className={styles.fieldInput} onClick={this.onOpenPopUp}>
					{(this.props.value && moment.unix(this.props.value.unix()).calendar())
						|| (this.defaultTime.value === ASAP ?
							this.defaultTime.label :
							moment.unix((this.defaultTime.value || moment()).unix()).calendar())
					}
				</button>
				<hr />
			</React.Fragment>
		);
	}
}

DeliveryTimeTab.propTypes = propTypes;
DeliveryTimeTab.defaultProps = defaultProps;

const mapStateToProps = state => ({
	timezone: state.getIn(['roomServiceConfig', 'timezone']),
	time_slot_minimum: state.getIn(['roomServiceConfig', 'time_slot_minimum']),
	value: state.getIn(['order', 'delivery_time']),
	startTime: moment(get24HourFormat(state.getIn(['roomServiceConfig', 'delivery_time_slot_start'])), 'HH:mm'),
	endTime: moment(get24HourFormat(state.getIn(['roomServiceConfig', 'delivery_time_slot_end'])), 'HH:mm'),
	locale: state.getIn(['roomServiceConfig', 'locale']),
});

const mapDispatchToProps = dispatch => ({
	onChangeDeliveryTime: bindActionCreators(updateDeliveryTime, dispatch),
	validatorListener: () => {},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeliveryTimeTab));
