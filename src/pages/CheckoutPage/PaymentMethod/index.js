import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePaymentMethod } from 'modules/order';
import t from 'translation';
import PaymentPopup, { paymentMethodOptions } from './PaymentPopup';
import styles from './style.scss';

const propTypes = {
};
const defaultProps = {
};


class PaymentMethod extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false,
		};
		this.paymentMethodOptions = paymentMethodOptions();
		this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);
		this.onClosePopup = this.onClosePopup.bind(this);
		this.onOpenPopup = this.onOpenPopup.bind(this);
	}
	componentWillMount() {
		if (!this.props.paymentMethod) {
			this.props.onChangePaymentMethod(this.props.paymentMethodFirstOption);
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
	onChangePaymentMethod(value) {
		this.setState({
			showPopup: false,
		}, () => {
			this.props.onChangePaymentMethod(value);
		});
	}
	render() {
		return (
			<React.Fragment>
				<div>
					{this.state.showPopup ?
						<PaymentPopup
							onCancel={this.onClosePopup}
							onSet={this.onChangePaymentMethod}
						/> : null}
				</div>
				<span className={styles.fieldName}>{t('Payment Method', {}, 'PAYMENT_METHOD')}</span>
				<button type="button" className={styles.fieldInput} onClick={this.onOpenPopup}>
					{this.paymentMethodOptions[this.props.paymentMethod ||
						this.props.paymentMethodFirstOption]}
				</button>
				<hr />
			</React.Fragment>
		);
	}
}

PaymentMethod.propTypes = propTypes;
PaymentMethod.defaultProps = defaultProps;

const mapStateToProps = state => ({
	paymentMethod: state.getIn(['order', 'payment_method']),
	paymentMethodFirstOption: state.getIn(['roomServiceConfig', 'payment_method_options', 0], null),
});

const mapDispatchToProps = dispatch => ({
	onChangePaymentMethod: bindActionCreators(updatePaymentMethod, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentMethod));
