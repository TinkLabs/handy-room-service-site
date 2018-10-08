import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
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
export const paymentMethodOptions = () => ({
	cash: t('Cash on Delivery', {}, 'CASH_ON_DELIVERY'),
	card: t('Card on Delivery', {}, 'CARD_ON_DELIVERY'),
	hotelbill: t('Bill to Room', {}, 'BILL_TO_ROOM'),
});
class PaymentPopup extends React.Component {
	constructor(props) {
		super(props);
		this.optionsMapping = paymentMethodOptions();
		this.state = {
			value: this.props.storedPaymentMethod || this.props.paymentMethodOptions.get(0),
		};
		this.onSet = this.onSet.bind(this);
	}
	onSet() {
		this.props.onSet(this.state.value);
	}

	render() {
		const { value } = this.state;
		const options = this.props.paymentMethodOptions.map(option => (
			{ value: option, label: this.optionsMapping[option] }));
		return (
			<PopUpBox onClose={this.props.onCancel}>
				<div className={styles.title}>
					<h1>{t('Set Payment Method')}</h1>
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

PaymentPopup.propTypes = propTypes;
PaymentPopup.defaultProps = defaultProps;

const mapStateToProps = state => ({
	storedPaymentMethod: state.getIn(['order', 'payment_method'], null),
	paymentMethodOptions: state.getIn(['roomServiceConfig', 'payment_method_options'], Immutable.List()),
});

export default withRouter(connect(mapStateToProps)(PaymentPopup));
