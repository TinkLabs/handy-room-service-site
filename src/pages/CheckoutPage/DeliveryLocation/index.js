import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateDeliveryLocation } from 'modules/order';
import t from 'translation';
import LocationPopup from './LocationPopup';
import styles from './style.scss';

const propTypes = {
};
const defaultProps = {
};


class DeliveryLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false,
		};
		this.onChangeDeliveryLocation = this.onChangeDeliveryLocation.bind(this);
		this.onClosePopup = this.onClosePopup.bind(this);
		this.onOpenPopup = this.onOpenPopup.bind(this);
	}
	componentWillMount() {
		if (this.props.loaded) {
			this.initValue(this.props);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.loaded !== nextProps.loaded) {
			this.initValue(nextProps);
		}
	}
	onClosePopup() {
		this.setState({
			showPopup: false,
		});
	}

	onOpenPopup() {
		this.setState({
			showPopup: true,
		});
	}
	onChangeDeliveryLocation(value) {
		this.setState({
			showPopup: false,
		}, () => {
			this.props.onChangeDeliveryLocation(value);
		});
	}
	initValue(props) {
		if (props.loaded && props.deliveryLocationOptions.size === 0) {
			props.onChangeDeliveryLocation(null);
		}
		if (props.loaded && !props.deliveryLocation) {
			props.onChangeDeliveryLocation(props.deliveryLocationFirstOption);
		}
		if (props.loaded
				&& props.deliveryLocation
				&& !props.deliveryLocationOptions.includes(props.deliveryLocation)) {
			props.onChangeDeliveryLocation(props.deliveryLocationFirstOption);
		}
	}
	render() {
		return (
			<React.Fragment>
				<div>
					{this.state.showPopup ?
						<LocationPopup
							onCancel={this.onClosePopup}
							onSet={this.onChangeDeliveryLocation}
						/> : null}
				</div>
				<span className={styles.fieldName}>{t('Delivery Location', {}, 'DELIVERY_LOCATION')}</span>
				<button type="button" className={styles.fieldInput} onClick={this.onOpenPopup}>
					{this.props.deliveryLocationOptions
						.get(this.props.deliveryLocation || this.props.deliveryLocationFirstOption)
						.getLocale(this.props.locale)}
				</button>
				<hr />
			</React.Fragment>
		);
	}
}

DeliveryLocation.propTypes = propTypes;
DeliveryLocation.defaultProps = defaultProps;

const mapStateToProps = state => ({
	deliveryLocation: state.getIn(['order', 'delivery_location']),
	deliveryLocationOptions: state.getIn(['roomServiceConfig', 'location_options']),
	deliveryLocationFirstOption: state.getIn(['roomServiceConfig', 'location_options'], null)
		.keys().next().value,
	loaded: state.getIn(['roomServiceConfig', 'loaded']),
});

const mapDispatchToProps = dispatch => ({
	onChangeDeliveryLocation: bindActionCreators(updateDeliveryLocation, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeliveryLocation));
