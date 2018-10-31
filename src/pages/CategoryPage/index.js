import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import t from 'translation';
import mixpanel from 'utils/mixpanel';
import { withRouter } from 'react-router-dom';
import { Header, TitleSection } from 'components';
import { CheckoutButton, ItemCard, CategoryCard } from 'containers';
import RoomServiceCategory from 'records/RoomServiceCategory';
import { addOrderItem, removeOrderItem } from 'modules/order';
import RemovePopup from './RemovePopup';
import styles from './style.scss';

const mixpanelProperties = {
	category: 'item',
	subcategory: 'index',
	screen_name: 'ird_item_index',
};

const propTypes = {
	history: PropTypes.object,
	category: PropTypes.instanceOf(RoomServiceCategory),
	subcategoryIds: PropTypes.instanceOf(Immutable.List),
	itemIds: PropTypes.instanceOf(Immutable.List),
};

const defaultProps = {
	history: {},
	category: new RoomServiceCategory(),
	subcategoryIds: Immutable.List(),
	itemIds: Immutable.List(),
};
class CategoryPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openRemovePopUp: false,
			removeItemId: null,
		};
		this.onClickClosePopup = this.onClickClosePopup.bind(this);
		this.onCompleteClosePopup = this.onCompleteClosePopup.bind(this);
	}
	onClickClosePopup() {
		this.setState({
			openRemovePopUp: false,
		});
	}
	onCompleteClosePopup(indexList) {
		this.setState({
			openRemovePopUp: false,
		}, () => {
			indexList.forEach((index) => {
				this.props.onRemove(this.state.removeItemId, index);
			});
		});
	}
	render() {
		const {
			history,
			category,
			subcategoryIds,
			itemIds,
			locale,
		} = this.props;
		return (
			<div className={styles.itemPage}>
				{this.state.openRemovePopUp ?
					<RemovePopup
						itemId={this.state.removeItemId}
						onClose={this.onClickClosePopup}
						onComplete={this.onCompleteClosePopup}
					/>
					: null }
				<Header hasBackButton />
				{itemIds.size ?
					<TitleSection
						title={category.getIn(['contents', locale, 'name'])}
						details={category.getIn(['contents', locale, 'detail'])}
						hintText={t('Please select items')}
						deliveryTimeSlotStart={category.get('parent_id') ? null : category.get('delivery_time_slot_start')}
						deliveryTimeSlotEnd={category.get('parent_id') ? null : category.get('delivery_time_slot_end')}
						weekdaysAvailable={category.get('parent_id') ? null : category.get('weekdays_available', Immutable.List())}
						locale={locale}
					/>
					:
					<TitleSection
						title={category.getIn(['contents', locale, 'name'])}
						details={category.getIn(['contents', locale, 'detail'])}
						locale={locale}
						hintText={t('Please select a sub-category')}
						deliveryTimeSlotStart={category.get('delivery_time_slot_start')}
						deliveryTimeSlotEnd={category.get('delivery_time_slot_end')}
						weekdaysAvailable={category.get('weekdays_available', Immutable.List())}
					/>
				}
				<div className="container">
					{subcategoryIds.map((subcategoryId, pos) => (
						<CategoryCard
							key={`category-${subcategoryId}`}
							id={subcategoryId}
							hasNextArrow
							onClick={(e, subcat) => {
								history.push(`/category/${subcategoryId}`);
								mixpanel().track('IRD SubCategory Click', {
									...mixpanelProperties,
									category: 'subcat',
									subcategory: 'index',
									screen_name: 'ird_subcat_index',
									item: subcat.get('name'),
									item_id: subcategoryId,
									item_type: 'room_service_categories',
									item_position: pos + 1,
									item_provider_id: subcat.get('parent_id'),
									item_locale: locale,
								});
							}}
						/>
					))}
					{itemIds.map((itemId, pos) => (
						<ItemCard
							key={`item-${itemId}`}
							id={itemId}
							onAddCustomize={id => history.push(`/item/${id}`)}
							onRemoveCustomize={(id) => {
								this.setState({
									openRemovePopUp: true,
									removeItemId: id,
								});
							}}
							onClickCallback={(type, item) => {
								mixpanel().track('IRD Item Click', {
									...mixpanelProperties,
									click_type: type,
									item: item.get('name'),
									item_id: itemId,
									item_type: 'room_service_categories',
									item_position: pos + 1,
									item_provider_id: item.get('category_id'),
									item_locale: locale,
								});
							}}
							enableActiveHighlight
						/>
					))}
					<CheckoutButton
						onClickCallback={() => {
							mixpanel().track('IRD Checkout Click', mixpanelProperties);
						}}
					/>
				</div>
			</div>
		);
	}
}

CategoryPage.propTypes = propTypes;
CategoryPage.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps.match.params;
	const category = state.get('roomServiceCategories', Immutable.List()).find(cat => `${cat.get('id')}` === `${id}`) || new RoomServiceCategory();
	const subcategoryIds = category.get('room_service_categories', Immutable.List());
	const itemIds = category.get('room_service_items', Immutable.List());
	return {
		locale: state.getIn(['roomServiceConfig', 'locale']),
		category,
		subcategoryIds,
		itemIds,
	};
};
const mapDispatchToProps = dispatch => ({
	onAdd: bindActionCreators(addOrderItem, dispatch),
	onRemove: bindActionCreators(removeOrderItem, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPage));
