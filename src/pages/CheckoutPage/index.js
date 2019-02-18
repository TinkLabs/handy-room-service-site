import React from 'react';
import { withRouter } from 'react-router-dom';
import { ValidatorForm } from 'react-form-validator-core';
import classnames from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { Header, TitleSection, Loading } from 'components';
import t from 'translation';
import { Element, scroller } from 'react-scroll';
import { isBetween, isAvailableDay } from 'utils/time';
import { roundToDecimal } from 'utils/price';
import mixpanel from 'utils/mixpanel';

import submitOrder from './submit';

import DeliveryTime from './DeliveryTime';
import DeliveryLocation from './DeliveryLocation';
import PaymentMethod from './PaymentMethod';
import Remarks from './Remarks';
import Gratuity from './Gratuity';
import Name from './Name';
import RoomNum from './RoomNum';
import ItemList from './ItemList';
import FinalPrice from './FinalPrice';
import styles from './style.scss';

const mixpanelProperties = {
	category: 'checkout',
	subcategory: 'index',
	screen_name: 'ird_checkout_index',
};

class CheckoutPage extends React.Component {
	constructor(props) {
		super(props);
		moment.tz.setDefault(props.timezone);
		this.state = {
			showLoading: false,
			showFooter: true,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.showFooter = this.showFooter.bind(this);
		this.hideFooter = this.hideFooter.bind(this);
		this.onError = this.onError.bind(this);
	}
	onError(components) {
		const firstName = components[0].props.name;
		scroller.scrollTo(firstName, {
			duration: 500,
			smooth: true,
			offset: -80,
			containerId: 'root',
		});
	}
	onSubmit() {
		this.setState({
			showLoading: true,
		}, () => {
			submitOrder(this.props.order, this.props.config)
				.then(redirect => this.props.history.push(redirect));
		});
	}
	showFooter() {
		this.setState({
			showFooter: true,
		});
	}
	hideFooter() {
		this.setState({
			showFooter: false,
		});
	}
	render() {
		ValidatorForm.addValidationRule('isMatchRoomNum', (value) => {
			if (value !== this.props.config.roomNum) {
				return false;
			}
			return true;
		});
		ValidatorForm.addValidationRule('isAfterNow', (value) => {
			if (value && !moment(value).isAfter(moment())) {
				return false;
			}
			return true;
		});
		ValidatorForm.addValidationRule('matchItemAvailableDays', ({ categoryId }) => {
			const { deliveryTime, timezone } = this.props;
			const parentCategoryId = this.props.roomServiceCategories.getIn([categoryId, 'parent_id']);
			let id = categoryId;
			if (parentCategoryId) {
				id = parentCategoryId;
			}
			const weekdaysAvailable = this.props.roomServiceCategories.getIn([id, 'weekdays_available']);
			if (!isAvailableDay(weekdaysAvailable, deliveryTime, timezone)) {
				return false;
			}
			return true;
		});
		ValidatorForm.addValidationRule('matchItemDeliveryTime', ({ categoryId }) => {
			const { deliveryTime, timezone } = this.props;
			let deliveryTimeSlotStart = this.props.roomServiceCategories.getIn([categoryId, 'delivery_time_slot_start']);
			let deliveryTimeSlotEnd = this.props.roomServiceCategories.getIn([categoryId, 'delivery_time_slot_end']);
			if (!deliveryTimeSlotStart || !deliveryTimeSlotEnd) {
				const parent_id = this.props.roomServiceCategories.getIn([categoryId, 'parent_id']);
				deliveryTimeSlotStart = this.props.roomServiceCategories.getIn([parent_id, 'delivery_time_slot_start']);
				deliveryTimeSlotEnd = this.props.roomServiceCategories.getIn([parent_id, 'delivery_time_slot_end']);
			}
			if (deliveryTimeSlotStart && deliveryTimeSlotEnd &&
				!isBetween(deliveryTime, deliveryTimeSlotStart, deliveryTimeSlotEnd, timezone)) {
				return false;
			}
			return true;
		});
		ValidatorForm.addValidationRule('isGratuityValid', ({ gratuity_option, gratuity }) => {
			const orderArray = this.props.order.get('shoppingCart').valueSeq().toArray();
			const subTotal = orderArray.length > 0 ? orderArray
				.reduce((acc, item) => acc + item.totalItemCost(), 0) : 0;
			const minCost = (subTotal * this.props.config.minOption) / 100;
			if (gratuity_option === null) return false;
			if (gratuity_option === 'custom' && gratuity < roundToDecimal(minCost, this.props.config.currency_decimal_places)) {
				return false;
			}
			return true;
		});

		if (!this.props.hasOrder) {
			return (
				<div className={styles.checkoutPage}>
					<Header hasBackButton />
					<div className={classnames('container', styles.hero)}>
						<div className={styles.backgroundColor} />
						<div className={styles.text}><h2>{t('You have not added anything', {}, 'EMPTY_ORDER_TITLE')}</h2></div>
						<span className={styles.hint}>{t('Kindly place tour in-room dining order by adding items from the menu.', {}, 'EMPTY_ORDER_DETAIL')}</span>
					</div>
				</div>
			);
		}
		console.log(this.props.config.type);

		return (
			<ValidatorForm
				ref={(form) => { this.form = form; }}
				onError={this.onError}
				onSubmit={this.onSubmit}
				className={classnames(styles.checkoutPage, {
					[styles.clickNotAllowed]: this.state.showLoading,
				})}
			>
				{this.state.showLoading ?
					<div className={styles.whiteLayer}>
						<Loading show />
					</div> : null}
				<Header hasBackButton>{t('Checkout')}</Header>
				<TitleSection
					title={t('Checkout')}
					hintText={t('Please enter the details and confirm your order')}
				/>
				<div className="container">
					<ItemList
						validators={['matchItemDeliveryTime', 'matchItemAvailableDays']}
						errorMessages={[t('* Not available at this time'), t('* Not available on this day')]}
					/>
				</div>
				<div className="container">
					<div className={classnames('card', styles.card)}>
						{
							this.props.config.type === 'dining' && (
								<Element name="delivery_time">
									<DeliveryTime
										name="delivery_time"
										validators={['isAfterNow']}
										errorMessages={[t('* Invalid Time')]}
									/>
								</Element>
							)
						}
						{this.props.isLocationOptionAvailable ?
							<DeliveryLocation />
							: null}
						<Remarks
							onFocus={(e) => {
								this.hideFooter(e);
								mixpanel().track('IRD Order Remarks Click', {
									...mixpanelProperties,
								});
							}}
							onBlur={this.showFooter}
						/>
					</div>
					<div className={classnames('card', styles.card)}>
						<Element name="guest_name">
							<Name
								onFocus={(e) => {
									this.hideFooter(e);
									mixpanel().track('IRD Order Name Click', {
										...mixpanelProperties,
									});
								}}
								onBlur={this.showFooter}
								name="guest_name"
								validators={['required']}
								errorMessages={[t('* Required')]}
							/>
						</Element>
						<hr />
						<Element name="room_num">
							<RoomNum
								onFocus={(e) => {
									this.hideFooter(e);
									mixpanel().track('IRD Order Room Number Click', {
										...mixpanelProperties,
									});
								}}
								onBlur={this.showFooter}
								name="room_num"
								validators={['required', 'isMatchRoomNum']}
								errorMessages={[t('* Required'), t('* Wrong room number')]}
							/>
						</Element>
					</div>
					{this.props.isPaymentOptionAvailable || this.props.config.gratuity.size ?
						<div className={classnames('card', styles.card)}>
							{this.props.isPaymentOptionAvailable ?
								<PaymentMethod />
								: null}
							{this.props.config.gratuity.size ?
								<Element name="gratuity">
									<Gratuity
										name="gratuity"
										validators={['isGratuityValid']}
										errorMessages={[t('* Custom gratuity is invalid')]}
										value={{
											gratuity_option: this.props.gratuity_option,
											gratuity: this.props.gratuity,
										}}
									/>
								</Element>
								: null}
						</div>
						: null }
				</div>
				<FinalPrice
					hideFooter={!this.state.showFooter}
					onSubmit={() => {
						this.form.submit();
					}}
				/>
			</ValidatorForm>
		);
	}
}

const mapStateToProps = state => ({
	order: state.get('order'),
	config: {
		gratuity: state.getIn(['roomServiceConfig', 'gratuity']),
		roomNum: state.getIn(['roomServiceConfig', 'hotel_room_number']),
		serviceChargeFlat: state.getIn(['roomServiceConfig', 'service_charge_flat'], 0),
		serviceChargePercentage: state.getIn(['roomServiceConfig', 'service_charge_percentage'], 0),
		taxCharge: state.getIn(['roomServiceConfig', 'tax_charge'], 0),
		locale: state.getIn(['roomServiceConfig', 'locale'], 0),
		type: state.getIn(['roomServiceConfig', 'type']),
		serviceTaxChargeCalculation: state.getIn(['roomServiceConfig', 'service_tax_charge_calculation'], false),
		minOption: state.getIn(['roomServiceConfig', 'gratuity', 0], 0),
		currency_decimal_places: state.getIn(['roomServiceConfig', 'currency_decimal_places']),
	},
	roomNum: state.getIn(['order', 'hotel_room_number']),
	delivery_time: state.getIn(['order', 'delivery_time']),
	name: state.getIn(['order', 'hotel_guest_name']),
	timezone: state.getIn(['roomServiceConfig', 'timezone']),
	hasOrder: state.getIn(['order', 'shoppingCart']).keySeq().size > 0,
	isPaymentOptionAvailable: state.getIn(['roomServiceConfig', 'payment_method_options']).size > 0,
	isLocationOptionAvailable: state.getIn(['roomServiceConfig', 'location_options']).size > 0,
	configRoomNum: state.getIn(['roomServiceConfig', 'hotel_room_number'], ''),
	deliveryTime: state.getIn(['order', 'delivery_time']),
	gratuity: state.getIn(['order', 'gratuity']),
	gratuity_option: state.getIn(['order', 'gratuity_option']),

	roomServiceCategories: state.get('roomServiceCategories'),
});

export default withRouter(connect(mapStateToProps)(CheckoutPage));
