import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import t from 'translation';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { ItemCard, Incrementer } from 'components';
import RoomServiceItem from 'records/RoomServiceItem';
import { addOrderItem, removeOrderItem } from 'modules/order';
import styles from './style.scss';

const propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	onAddCustomize: PropTypes.func,
	onRemoveCustomize: PropTypes.func,
	onClickCallback: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	item: PropTypes.instanceOf(RoomServiceItem),
	additionalPrice: PropTypes.number,
	enableActiveHighlight: PropTypes.bool,
	subtitle: PropTypes.string,
};

const defaultProps = {
	id: null,
	onAddCustomize: null,
	onRemoveCustomize: null,
	onClickCallback: () => {},
	children: null,
	item: new RoomServiceItem(),
	additionalPrice: 0,
	enableActiveHighlight: false,
	subtitle: '',
};

const ItemCardContainer = ({
	id,
	onAddCustomize,
	onRemoveCustomize,
	onAdd,
	onRemove,
	onClickCallback,
	children,
	item,
	additionalPrice,
	locale,
	selectedCount,
	enableActiveHighlight,
	subtitle,
}) => {
	if (!id) return null;
	const price = item.get('price') ? item.get('price') + additionalPrice : 0;
	return (
		<ItemCard
			key={`item-${id}`}
			title={item.getIn(['contents', locale, 'name']) || item.getIn(['contents', 'en_US', 'name'])}
			subtitle={subtitle || item.getIn(['contents', locale, 'description'])}
			price={price}
			isActive={enableActiveHighlight && selectedCount > 0}
			imageUrl={item.get('image')}
		>
			{!children && onAddCustomize && onRemoveCustomize ?
				<React.Fragment>
					<div className={classnames('left', styles.editableText)} key="leftDiv">
						{item.get('item_customization_enabled', false) ?
							<React.Fragment>
								<span className="icon icon-handy-icon-edit" />
								<span>{t('Customizable')}</span>
							</React.Fragment>
							: null}
					</div>
					<div className="right" key="rightDiv">
						<Incrementer
							count={selectedCount}
							onAdd={() => {
								if (item.get('item_customization_enabled', false)) {
									onAddCustomize(id);
									onClickCallback('add', item);
								} else {
									onAdd({
										roomServiceItem: item,
									});
									onClickCallback('add', item);
								}
							}}
							onRemove={() => {
								if (item.get('item_customization_enabled', false)) {
									onRemoveCustomize(id);
									onClickCallback('remove', item);
								} else {
									onRemove(id);
									onClickCallback('remove', item);
								}
							}}
						/>
					</div>
				</React.Fragment>
				: children}
		</ItemCard>
	);
};

ItemCardContainer.propTypes = propTypes;
ItemCardContainer.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => {
	const locale = state.getIn(['roomServiceConfig', 'locale']);
	return {
		locale,
		selectedCount: state.getIn(['order', 'shoppingCart', ownProps.id, 'count'], 0),
		item: state.getIn(['roomServiceItems', ownProps.id], new RoomServiceItem()),
		currency_symbol: state.getIn(['roomServiceConfig', 'currency_symbol'], '$'),
	};
};
const mapDispatchToProps = dispatch => ({
	onAdd: bindActionCreators(addOrderItem, dispatch),
	onRemove: bindActionCreators(removeOrderItem, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemCardContainer));
