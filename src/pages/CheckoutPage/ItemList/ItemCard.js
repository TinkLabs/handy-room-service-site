import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import Immutable from 'immutable';
import t from 'translation';
import { Element } from 'react-scroll';
import mixpanel from 'utils/mixpanel';
import { ItemCard, Incrementer } from 'components';
import { addOrderItem, removeOrderItem } from 'modules/order';
import { converthhmmAToLT } from 'utils/time';

import styles from './style.scss';

const mixpanelProperties = {
	category: 'checkout',
	subcategory: 'index',
	screen_name: 'ird_checkout_index',
};

const propTypes = {
	history: PropTypes.object,
	onClickMinus: PropTypes.func,
	onClickEdit: PropTypes.func,
};

const defaultProps = {
	history: {},
	onClickMinus: () => {},
	onClickEdit: () => {},
};

class ItemCardContainer extends ValidatorComponent {
	getAvailableDay() {
		const { weekdaysAvailable } = this.props.value;
		if (weekdaysAvailable.equals(Immutable.List([0, 1, 2, 3, 4, 5, 6]))) {
			return t('Everyday');
		} else if (weekdaysAvailable.equals(Immutable.List([1, 2, 3, 4, 5]))) {
			return t('Monday to Friday');
		} else if (weekdaysAvailable.equals(Immutable.List([0, 6]))) {
			return t('Saturday and Sunday');
		}
		const weekdaysShortform = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
		let weekdaysArray = [];
		weekdaysArray = weekdaysAvailable.map(day => weekdaysShortform[day]);
		return weekdaysArray.join('/');
	}
	getDeliveryTime() {
		const { value } = this.props;
		const locale = this.props.locale.substring(0, 2);
		if (!value.deliveryTimeSlotStart || !value.deliveryTimeSlotEnd) return '';
		return `${converthhmmAToLT(value.deliveryTimeSlotStart, locale)} - ${converthhmmAToLT(value.deliveryTimeSlotEnd, locale)}`;
	}
	render() {
		const {
			// error,
			// history,
			// order,
			// roomServiceItems,
			// onAdd,
			// onRemove,
			// currency_symbol,
			// locale,
			onAdd,
			onRemove,
			onClickMinus,
			onClickEdit,
			history,
			item,
			id,
			subtitle,
			title,
			price,
			imageUrl,
			count,
			locale,
			index,
			roomServiceItem,
			name,
		} = this.props;
		const errorDiv = (
			<React.Fragment>
				{this.getErrorMessage()} ({this.getAvailableDay()} {this.getDeliveryTime()})
			</React.Fragment>
		);
		return (
			<Element name={name}>
				<ItemCard
					error={!this.state.isValid ? errorDiv : null}
					title={title}
					subtitle={subtitle}
					price={price}
					imageUrl={imageUrl}
					isActive={false}
				>
					<div className={classnames('left', styles.editableText)}>
						{roomServiceItem.get('item_customization_enabled', false) ?
							<button
								type="button"
								onClick={() => {
									onClickEdit(item);
									mixpanel().track('IRD Edit Item Click', {
										...mixpanelProperties,
										item: roomServiceItem.get('name'),
										item_id: roomServiceItem.get('id'),
										item_type: 'room_service_items',
										item_position: index + 1,
										item_provider_id: roomServiceItem.get('category_id'),
										item_locale: locale,
									});
								}}
								className={styles.buttonEdit}
							>
								<span className="icon icon-handy-icon-edit" />
								<span>{t('Edit')}</span>
							</button>
							: null}
					</div>
					<div className="right">
						<Incrementer
							count={count}
							onAdd={() => {
								if (roomServiceItem.get('item_customization_enabled', false)) {
									history.push(`/item/${id}`);
								} else {
									onAdd({ roomServiceItem });
								}
								mixpanel().track('IRD Item Click', {
									...mixpanelProperties,
									click_type: 'add',
									item: roomServiceItem.get('name'),
									item_id: roomServiceItem.get('id'),
									item_type: 'room_service_items',
									item_position: index + 1,
									item_provider_id: roomServiceItem.get('category_id'),
									item_locale: locale,
								});
							}}
							onRemove={() => {
								if (roomServiceItem.get('item_customization_enabled', false) || count === 1) {
									onClickMinus(item);
								} else {
									onRemove(id);
								}
								mixpanel().track('IRD Item Click', {
									...mixpanelProperties,
									click_type: 'remove',
									item: roomServiceItem.get('name'),
									item_id: roomServiceItem.get('id'),
									item_type: 'room_service_items',
									item_position: index + 1,
									item_provider_id: roomServiceItem.get('category_id'),
									item_locale: locale,
								});
							}}
						/>
					</div>
				</ItemCard>
			</Element>
		);
	}
}

const mapStateToProps = (state, props) => {
	let deliveryTimeSlotStart = state.getIn(['roomServiceCategories', props.categoryId, 'delivery_time_slot_start']);
	let deliveryTimeSlotEnd = state.getIn(['roomServiceCategories', props.categoryId, 'delivery_time_slot_end']);
	if (!deliveryTimeSlotStart || !deliveryTimeSlotEnd) {
		const parent_id = state.getIn(['roomServiceCategories', props.categoryId, 'parent_id']);
		deliveryTimeSlotStart = state.getIn(['roomServiceCategories', parent_id, 'delivery_time_slot_start']);
		deliveryTimeSlotEnd = state.getIn(['roomServiceCategories', parent_id, 'delivery_time_slot_end']);
	}
	const parent_id = state.getIn(['roomServiceCategories', props.categoryId, 'parent_id']);
	let id = props.categoryId;
	if (parent_id >= 0) {
		id = parent_id;
	}
	const weekdaysAvailable = state.getIn(['roomServiceCategories', id, 'weekdays_available']);
	return {
		order: state.get('order'),
		locale: state.getIn(['roomServiceConfig', 'locale']),
		roomServiceItem: state.getIn(['roomServiceItems', props.id]),
		currency_symbol: state.getIn(['roomServiceConfig', 'currency_symbol'], '$'),
		value: {
			deliveryTimeSlotStart,
			deliveryTimeSlotEnd,
			categoryId: props.categoryId,
			weekdaysAvailable,
		},
	};
};


const mapDispatchToProps = dispatch => ({
	onAdd: bindActionCreators(addOrderItem, dispatch),
	onRemove: bindActionCreators(removeOrderItem, dispatch),
	validatorListener: () => {},
});

ItemCardContainer.propTypes = propTypes;
ItemCardContainer.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemCardContainer));
