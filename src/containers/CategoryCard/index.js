import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import moment from 'moment';
import 'moment/min/locales.min';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CategoryCard } from 'components';
import t from 'translation';
import RoomServiceCategory from 'records/RoomServiceCategory';
import styles from './style.scss';

const propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	locale: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	category: PropTypes.instanceOf(RoomServiceCategory),
	hasNextArrow: PropTypes.bool,
};

const defaultProps = {
	id: null,
	onClick: () => {},
	locale: 'en_US',
	children: null,
	category: new RoomServiceCategory(),
	hasNextArrow: false,
};

const CategoryCardContainer = ({
	id,
	onClick,
	children,
	category,
	hasNextArrow,
	count,
	locale,
}) => {
	if (!id) return null;
	moment.locale(locale);
	return (
		<CategoryCard
			title={category.getIn(['contents', locale, 'name']) || category.getIn(['contents', 'en_US', 'name'])}
			subtitle={category.getIn(['contents', locale, 'detail']) || category.getIn(['contents', 'en_US', 'detail'])}
			deliveryTimeSlotStart={category.get('parent_id') ? null : category.get('delivery_time_slot_start')}
			deliveryTimeSlotEnd={category.get('parent_id') ? null : category.get('delivery_time_slot_end')}
			isActive={!!count}
			hasNextArrow={hasNextArrow}
			onClick={(e) => {
				onClick(e, category);
			}}
			locale={locale}
		>
			{children}
			{count ?
				<span className={styles.selectedText}>{t('%{count} items selected', { count })}</span>
				: null}
		</CategoryCard>
	);
};

CategoryCardContainer.propTypes = propTypes;
CategoryCardContainer.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => {
	const orderItemIds = state.getIn(['order', 'shoppingCart']).keySeq().toArray();
	const subitemIds = state.getIn(['roomServiceCategories', ownProps.id, 'room_service_items'], Immutable.List());
	const subcategoryIds = state.getIn(['roomServiceCategories', ownProps.id, 'room_service_categories'], Immutable.List());
	let subcategoryItemIds = Immutable.List();
	subcategoryIds.forEach((id) => {
		subcategoryItemIds = subcategoryItemIds.concat(state.getIn(['roomServiceCategories', id, 'room_service_items'], Immutable.List()));
	});
	const locale = state.getIn(['roomServiceConfig', 'locale']);
	const allSubItemIds = subitemIds.concat(subcategoryItemIds);
	return {
		locale,
		category: state.getIn(['roomServiceCategories', ownProps.id], new RoomServiceCategory()),
		count: allSubItemIds ?
			orderItemIds
				.filter(id => allSubItemIds.includes(id))
				.reduce((sum, id) => sum + state.getIn(['order', 'shoppingCart', id, 'count'], 0), 0)
			: 0,
	};
};
export default withRouter(connect(mapStateToProps)(CategoryCardContainer));
