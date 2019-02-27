import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { PopUpBox, RadioButton, Button } from 'components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { priceDisplay, roundToDecimal } from 'utils/price';

import t, { getTranslation } from 'translation';
import AnswerCard from './AnswerCard';
import styles from './style.scss';

const propTypes = {
	onCancel: PropTypes.func,
	onSet: PropTypes.func,
};
const defaultProps = {
	onCancel: () => {},
	onSet: () => {},
};

class GratuityPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gratuity_option: props.storedGratuityOption || props.options.get(0),
			gratuity: props.storedGratuity || '',
			focusInput: false,
			error: false,
		};
		this.onSet = this.onSet.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}
	onSet() {
		this.setState({
			error: !this.validate(),
		}, () => {
			if (!this.state.error) {
				this.props.onSet(this.state.gratuity_option, this.state.gratuity_option === 'custom' ? this.state.gratuity : 0);
			}
		});
	}
	onChangeInput(e) {
		this.setState({
			gratuity: e.target.value,
		});
	}
	onFocus() {
		this.setState({
			focusInput: true,
		});
	}
	onBlur() {
		this.setState({
			// eslint-disable-next-line
			gratuity: !this.state.gratuity || isNaN(this.state.gratuity) ? this.state.gratuity : roundToDecimal(this.state.gratuity, this.props.currency_decimal_places),
		}, () => {
			this.setState({
				focusInput: false,
				error: !this.validate(),
			});
		});
	}
	validate() {
		if (this.state.gratuity_option !== 'custom') {
			return true;
		}
		// eslint-disable-next-line
		if (!this.state.gratuity || isNaN(this.state.gratuity)) {
			return false;
		}
		// eslint-disable-next-line
		if (parseFloat(this.state.gratuity, 10) < roundToDecimal((this.props.subTotal * this.props.minOption) / 100, this.props.currency_decimal_places)) {
			return false;
		}
		return true;
	}
	render() {
		const {
			currency_symbol,
			minOption,
			subTotal,
			currency_decimal_places,
		} = this.props;
		const {
			gratuity_option,
			gratuity,
		} = this.state;
		return (
			<PopUpBox onClose={this.props.onCancel}>
				<div className={styles.title}>
					<h1>{t('Gratuity')}</h1>
					<p>{t('Gratuity amount will be based on the subtotal charge of the order.')}</p>
				</div>
				<div className={classnames('container', styles.options)}>
					<hr />
					{this.props.options.map((gratuityOpt, i) => (
						<React.Fragment key={`ans-${i}`}>
							<AnswerCard
								leftDiv={t('<b>%{percentage}%</b> of subtotal', { percentage: gratuityOpt, renderHTML: true })}
							>
								<div className={styles.price}>
									{priceDisplay(
										currency_symbol,
										(gratuityOpt * subTotal) / 100,
										currency_decimal_places,
									)}
								</div>
								<RadioButton
									selected={gratuity_option === gratuityOpt}
									onClick={() => {
										this.setState({
											gratuity_option: gratuityOpt,
										});
									}}
								/>
							</AnswerCard>
							<hr />
						</React.Fragment>
					))}
					<AnswerCard
						leftDiv={
							<div
								className={classnames(styles.input, {
									[styles.focus]: this.state.focusInput || gratuity,
								})}
								data-currency-symbol={currency_symbol}
							>
								<input
									name="amount"
									placeholder={getTranslation(this.props.locale, 'Other Amount')}
									value={gratuity}
									onChange={this.onChangeInput}
									onFocus={this.onFocus}
									onBlur={this.onBlur}
								/>
							</div>
						}
					>
						<div className={classnames(styles.priceSuggestion, { error: this.state.error })}>
							{t('Minimum %{price}', { price: priceDisplay(currency_symbol, (minOption * subTotal) / 100, currency_decimal_places) })}
						</div>
						<RadioButton
							selected={gratuity_option === 'custom'}
							onClick={() => {
								this.setState({
									gratuity_option: 'custom',
								});
							}}
						/>
					</AnswerCard>
					<hr />
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

GratuityPopup.propTypes = propTypes;
GratuityPopup.defaultProps = defaultProps;

const mapStateToProps = (state) => {
	const orderArray = state.getIn(['order', 'shoppingCart']).valueSeq().toArray();
	const subTotal = orderArray.length > 0 ? orderArray
		.reduce((acc, item) => acc + item.totalItemCost(), 0) : 0;
	return {
		storedGratuityOption: state.getIn(['order', 'gratuity_option'], null),
		storedGratuity: state.getIn(['order', 'gratuity'], null),
		options: state.getIn(['roomServiceConfig', 'gratuity'], Immutable.List()),
		minOption: state.getIn(['roomServiceConfig', 'gratuity', 0], 0),
		subTotal,
		currency_symbol: state.getIn(['roomServiceConfig', 'currency_symbol']),
		currency_decimal_places: state.getIn(['roomServiceConfig', 'currency_decimal_places']),
		locale: state.getIn(['roomServiceConfig', 'locale']),
	};
};

export default withRouter(connect(mapStateToProps)(GratuityPopup));
