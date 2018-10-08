import React from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import t from 'translation';
import { Button } from 'components';
import { priceDisplay, calculateTax } from 'utils/price';
import styles from './style.scss';

const propTypes = {
	// onSubmit: PropTypes.func,
};

const defaultProps = {
	// onSubmit: () => {},
};

class FinalPrice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const {
			serviceChargeFlat,
			serviceChargePercentage,
			taxCharge,
			serviceTaxChargeCalculation,
			currency_symbol,
			order,
			hideFooter,
			gratuity_option,
			gratuity,
		} = this.props;
		const orderArray = order.get('shoppingCart').valueSeq().toArray();
		const subTotal = orderArray.length > 0 ? orderArray
			.reduce((acc, item) => acc + item.totalItemCost(), 0) : 0;
		const tax = calculateTax(
			subTotal,
			serviceChargeFlat,
			serviceChargePercentage,
			taxCharge,
			serviceTaxChargeCalculation,
		);
		let gratuityDiv = null;
		let gratuityPrice = 0;
		if (gratuity_option === 'custom') {
			gratuityPrice = gratuity;
			gratuityDiv = (
				<div className={styles.serviceCharge}>
					<span className={styles.label}>{t('Custom Gratuity')}</span>
					<span className={styles.price}>{priceDisplay(currency_symbol, gratuityPrice)}</span>
				</div>
			);
		} else if (gratuity_option) {
			gratuityPrice = (subTotal * gratuity_option) / 100;
			gratuityDiv = (
				<div className={styles.serviceCharge}>
					<span className={styles.label}>{t('%{percentage} Gratuity', { percentage: `${gratuity_option}%` })}</span>
					<span className={styles.price}>{priceDisplay(currency_symbol, gratuityPrice)}</span>
				</div>
			);
		}
		return (
			<footer className={classnames('container', styles.footer, { hideFooter })}>
				{gratuityDiv}
				<div className={styles.serviceCharge}>
					<span className={styles.label}>{t('Service Charge', {}, 'SERVICE_CHARGE')}</span>
					<span className={styles.price}>{priceDisplay(currency_symbol, tax)}</span>
				</div>
				<div className={styles.totalCharge}>
					<span className={styles.label}>{t('Total', {}, 'TOTAL')}</span>
					<span className={styles.price}>
						{priceDisplay(currency_symbol, subTotal + tax + gratuityPrice)}
					</span>
				</div>
				<Button className="btn orange" onClick={this.props.onSubmit}>{t('Confirm order', {}, 'CONFIRM')}</Button>
			</footer>
		);
	}
}

FinalPrice.propTypes = propTypes;
FinalPrice.defaultProps = defaultProps;

const mapStateToProps = state => ({
	order: state.get('order'),
	gratuity: state.getIn(['order', 'gratuity'], 0),
	gratuity_option: state.getIn(['order', 'gratuity_option'], null),
	serviceChargeFlat: state.getIn(['roomServiceConfig', 'service_charge_flat'], 0),
	serviceChargePercentage: state.getIn(['roomServiceConfig', 'service_charge_percentage'], 0),
	taxCharge: state.getIn(['roomServiceConfig', 'tax_charge'], 0),
	serviceTaxChargeCalculation: state.getIn(['roomServiceConfig', 'service_tax_charge_calculation'], false),
	currency_symbol: state.getIn(['roomServiceConfig', 'currency_symbol']),
});

export default withRouter(connect(mapStateToProps, null)(FinalPrice));
