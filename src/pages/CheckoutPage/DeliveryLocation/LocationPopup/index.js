import React from 'react';
import PropTypes from 'prop-types';
import { PopUpBox, AnswerCard, RadioButton, Button } from 'components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import t from 'translation';
import styles from './style.scss';

const propTypes = {
	onCancel: PropTypes.func,
	onSet: PropTypes.func,
};
const defaultProps = {
	onCancel: () => {},
	onSet: () => {},
};

class LocationPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.storedDeliveryLocation
				|| this.props.deliveryLocationOptions.keys().next().value,
		};
		this.onSet = this.onSet.bind(this);
	}
	onSet() {
		this.props.onSet(this.state.value);
	}

	render() {
		const { value } = this.state;
		const options = [];
		this.props.deliveryLocationOptions.forEach((val, key) => {
			options.push({ value: key, label: val[this.props.locale] });
		});
		return (
			<PopUpBox onClose={this.props.onCancel}>
				<div className={styles.title}>
					<h1>{t('Set Delivery Location')}</h1>
				</div>
				<div className={classnames('container', styles.options)}>
					<hr />
					{options.map((obj, i) => (
						<React.Fragment key={`ans-${i}`}>
							<AnswerCard name={obj.label} >
								<RadioButton
									selected={value === obj.value}
									onClick={() => {
										this.setState({
											value: obj.value,
										});
									}}
								/>
							</AnswerCard>
							<hr />
						</React.Fragment>
					))}
				</div>
				<div className={styles.bottomControls}>
					<div className="btn-half-wrapper">
						<Button className="btn" onClick={this.props.onCancel}>{t('Cancel')}</Button>
					</div>
					<div className="btn-half-wrapper">
						<Button className={classnames('btn blue', styles.button)} onClick={this.onSet}>{t('Set')}</Button>
					</div>
				</div>
			</PopUpBox>
		);
	}
}

LocationPopup.propTypes = propTypes;
LocationPopup.defaultProps = defaultProps;

const mapStateToProps = state => ({
	locale: state.getIn(['roomServiceConfig', 'locale']),
	storedDeliveryLocation: state.getIn(['order', 'delivery_location'], null),
	deliveryLocationOptions: state.getIn(['roomServiceConfig', 'location_options']),
});

export default withRouter(connect(mapStateToProps)(LocationPopup));

