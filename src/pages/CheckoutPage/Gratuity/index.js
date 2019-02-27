import React from 'react';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { ValidatorComponent } from 'react-form-validator-core';
import { updateGratuityOption, updateGratuity } from 'modules/order';
import t from 'translation';
import { priceDisplay } from 'utils/price';
import GratuityPopup from './GratuityPopup';
import styles from './style.scss';

const propTypes = {
};
const defaultProps = {
};


class Gratuity extends ValidatorComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false,
			...this.state,
		};
		this.onComplete = this.onComplete.bind(this);
		this.onClosePopup = this.onClosePopup.bind(this);
		this.onOpenPopup = this.onOpenPopup.bind(this);
		if (!props.gratuity_option && props.gratuitySelection.size) {
			props.onChangeGratuityOption(props.gratuitySelection.get(0));
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
	onComplete(option, value) {
		this.setState({
			showPopup: false,
		}, () => {
			this.props.onChangeGratuityOption(option);
			this.props.onChangeGratuity(value);
		});
	}
	errorText() {
		const { isValid } = this.state;

		if (isValid) {
			return null;
		}

		return (
			<span className={styles.error}>{this.getErrorMessage()}</span>
		);
	}
	render() {
		const {
			gratuity_option,
			gratuity,
			shoppingCart,
			currency_symbol,
			currency_decimal_places,
		} = this.props;
		const orderArray = shoppingCart.valueSeq().toArray();
		const subTotal = orderArray.length > 0 ? orderArray
			.reduce((acc, item) => acc + item.totalItemCost(), 0) : 0;
		let gratuityPrice = 0;
		if (gratuity_option === 'custom') {
			gratuityPrice = gratuity;
		} else if (gratuity_option) {
			gratuityPrice = (subTotal * gratuity_option) / 100;
		}
		return (
			<React.Fragment>
				<div>
					{this.state.showPopup ?
						<GratuityPopup
							onCancel={this.onClosePopup}
							onSet={this.onComplete}
						/> : null}
				</div>
				<span className={classnames(styles.fieldName, { [styles.red]: !this.state.isValid })}>
					{t('Gratuity')}
					{this.errorText()}
				</span>
				<button type="button" className={styles.fieldInput} onClick={this.onOpenPopup}>
					{this.props.gratuity_option === 'custom' ?
						t('Other Amount')
						:
						t('<b>%{percentage}%</b> of subtotal', { percentage: gratuity_option, renderHTML: true })
					}
					<div className={styles.price}>
						{priceDisplay(currency_symbol, gratuityPrice, currency_decimal_places)}
					</div>
				</button>
				<hr />
			</React.Fragment>
		);
	}
}

Gratuity.propTypes = propTypes;
Gratuity.defaultProps = defaultProps;

const mapStateToProps = state => ({
	gratuity_option: state.getIn(['order', 'gratuity_option'], null),
	gratuity: state.getIn(['order', 'gratuity'], null),
	gratuitySelection: state.getIn(['roomServiceConfig', 'gratuity'], Immutable.List()),
	shoppingCart: state.getIn(['order', 'shoppingCart']),
	currency_symbol: state.getIn(['roomServiceConfig', 'currency_symbol']),
	currency_decimal_places: state.getIn(['roomServiceConfig', 'currency_decimal_places']),
});

const mapDispatchToProps = dispatch => ({
	onChangeGratuityOption: bindActionCreators(updateGratuityOption, dispatch),
	onChangeGratuity: bindActionCreators(updateGratuity, dispatch),
	validatorListener: () => {},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gratuity));
