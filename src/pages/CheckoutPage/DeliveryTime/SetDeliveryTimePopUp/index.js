import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PopUpBox, Button } from 'components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Picker from 'react-scrollable-picker';
import moment from 'moment-timezone';
import t from 'translation';
import TabSelector from './TabSelector';
import styles from './style.scss';

const TODAY = 'today';
const TOMORROW = 'tmr';
const ASAP = 'asap';

const propTypes = {
	onCancel: PropTypes.func,
	onSet: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.instanceOf(moment),
	]),
	todayArray: PropTypes.array,
	tomArray: PropTypes.array,
	currentTime: PropTypes.instanceOf(moment),
};
const defaultProps = {
	onCancel: () => {},
	onSet: () => {},
	value: null,
	todayArray: [],
	tomArray: [],
	currentTime: moment(),
};

class SetDeliveryTimePopUp extends React.Component {
	constructor(props) {
		super(props);
		moment.tz.setDefault(props.timezone);
		this.currentTime = this.props.currentTime;
		this.todayArray = this.props.todayArray;
		this.tomArray = this.props.tomArray;
		this.dateOption = [
			{ value: TODAY, label: t('Today') },
			{ value: TOMORROW, label: t('Tomorrow') },
		];
		let time = ASAP;
		let activeTab = TODAY;
		if (this.props.value !== null) {
			const storedDate = moment(this.props.value);
			if (storedDate.date() === moment(this.currentTime).date() ||
				storedDate.date() === moment(this.currentTime).add(1, 'd').date()) {
				activeTab = storedDate.date() === moment(this.currentTime).date() ?
					activeTab : TOMORROW;
				time = this.initializeSelectedTime(storedDate, activeTab);
			}
		}
		if (activeTab === TODAY && !(this.todayArray.length > 0)) {
			activeTab = TOMORROW;
			time = this.initializeSelectedTime(time, activeTab);
		}
		this.state = {
			time,
			activeTab,
		};

		this.handleChange = this.handleChange.bind(this);
		this.onDayChange = this.onDayChange.bind(this);
		this.onSetDeliveryTime = this.onSetDeliveryTime.bind(this);
	}
	onDayChange(activeTab) {
		// disable today tab is array is empty
		if (activeTab === TODAY && !(this.todayArray.length > 0)) {
			return;
		}
		this.setState({
			activeTab,
			time: this.initializeSelectedTime(this.state.time, activeTab),
		});
	}

	onSetDeliveryTime() {
		const { time } = this.state;
		this.props.onSet(time === ASAP ? null : time);
	}
	getOption(date) {
		if (date === TODAY) {
			return this.todayArray;
		}
		return this.tomArray;
	}
	initializeSelectedTime(selectedTime, activeTab) {
		const options = this.getOption(activeTab);
		if (selectedTime === ASAP) {
			return options[0].value;
		}
		let time = null;
		options.forEach((obj) => {
			if (obj.label === selectedTime.format('HH:mm')) {
				time = obj.value;
			}
		});
		return time || options[0].value;
	}
	handleChange(name, value) {
		this.setState({
			[name]: value,
		});
	}
	render() {
		const { onCancel } = this.props;
		const { activeTab, time } = this.state;
		const options = this.getOption(activeTab);
		return (
			<PopUpBox onClose={onCancel}>
				<div className={styles.scrollable}>
					<div className={styles.title}>
						<h1>{t('Set Delivery Time')}</h1>
					</div>
					<TabSelector
						onChange={this.onDayChange}
						value={activeTab}
						nameList={this.dateOption}
					/>
					<div className="container">
						<Picker
							height={170}
							optionGroups={{ time: options }}
							valueGroups={{ time }}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className={styles.bottomControls}>
					<div className="btn-half-wrapper">
						<Button className="btn" onClick={onCancel}>{t('Cancel')}</Button>
					</div>
					<div className="btn-half-wrapper">
						<Button className={classnames('btn blue', styles.button)} onClick={this.onSetDeliveryTime}>{t('Set')}</Button>
					</div>
				</div>
			</PopUpBox>
		);
	}
}

SetDeliveryTimePopUp.propTypes = propTypes;
SetDeliveryTimePopUp.defaultProps = defaultProps;

const mapStateToProps = state => ({
	timezone: state.getIn(['roomServiceConfig', 'timezone']),
});

export default withRouter(connect(mapStateToProps, null)(SetDeliveryTimePopUp));
