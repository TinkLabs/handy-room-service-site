import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import Immutable from 'immutable';
import { priceDisplay } from 'utils/price';
import t from 'translation';
import { addOrderItem, removeOrderItem, editOrderItem } from 'modules/order';
import ItemCard from './ItemCard';
import RemoveItemPopup from './RemoveItemPopup';
import EditItemPopup from './EditItemPopup';
import styles from './style.scss';

const propTypes = {
	error: PropTypes.instanceOf(Immutable.Map),
	history: PropTypes.object,
	onClickMinus: PropTypes.func,
	onClickEdit: PropTypes.func,
};

const defaultProps = {
	error: Immutable.Map(),
	history: {},
	onClickMinus: () => {},
	onClickEdit: () => {},
};

const EDIT_POPUP = 'show edit item popup';
const REMOVE_POPUP = 'show remove item popup';

class ItemList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: null,
			popupItem: null,
		};
		this.onOpenPopup = this.onOpenPopup.bind(this);
		this.onCompleteEditItemPopup = this.onCompleteEditItemPopup.bind(this);
		this.onCompleteRemoveItemPopup = this.onCompleteRemoveItemPopup.bind(this);
		this.onClosePopup = this.onClosePopup.bind(this);
	}
	onOpenPopup(type, item) {
		this.setState({
			popupItem: item,
			show: type,
		});
	}
	onCompleteEditItemPopup(
		roomServiceItem,
		customization,
		index = this.state.popupItem.index,
	) {
		this.setState({
			show: null,
		}, () => {
			this.props.onEdit({ roomServiceItem, customization, index });
		});
	}
	onCompleteRemoveItemPopup() {
		this.setState({
			show: null,
		}, () => {
			this.props.onRemove(this.state.popupItem.id, this.state.popupItem.index);
		});
	}
	onClosePopup() {
		this.setState({
			popupItem: null,
			show: null,
		});
	}
	render() {
		const {
			order,
			onAdd,
			onRemove,
			currency_symbol,
			currency_decimal_places,
		} = this.props;
		let total = 0;
		const itemcardList = [];
		order.get('shoppingCart').valueSeq().forEach((item) => {
			const itemDetail = item.get('roomServiceItem');
			if (!itemDetail.get('item_customization_enabled')) {
				total += item.get('count') * itemDetail.get('price');
				itemcardList.push({
					key: itemDetail.get('id'),
					id: itemDetail.get('id'),
					categoryId: itemDetail.get('category_id'),
					title: itemDetail.getIn(['contents', this.props.locale, 'name']) || itemDetail.getIn(['contents', 'en_US', 'name']),
					price: itemDetail.get('price'),
					imageUrl: itemDetail.get('image'),
					count: item.get('count'),
				});
			} else {
				item.get('customization').forEach((roomServiceItemAnswerList, i) => {
					const totalAdditionalCost = roomServiceItemAnswerList.getAdditionalPrice();
					total += itemDetail.get('price') + totalAdditionalCost;
					itemcardList.push({
						key: `${itemDetail.get('id')}-${i}`,
						id: itemDetail.get('id'),
						categoryId: itemDetail.get('category_id'),
						subtitle: roomServiceItemAnswerList.toLocaleString(this.props.locale),
						title: itemDetail.getIn(['contents', this.props.locale, 'name']) || itemDetail.getIn(['contents', 'en_US', 'name']),
						price: itemDetail.get('price') + totalAdditionalCost,
						imageUrl: itemDetail.get('image'),
						count: 1,
						index: i,
					});
				});
			}
		});
		return (
			<div className={classnames('card', styles.card)}>
				{this.state.show === REMOVE_POPUP ?
					<RemoveItemPopup
						onClose={this.onClosePopup}
						onAgree={this.onCompleteRemoveItemPopup}
						item={this.state.popupItem}
					/>
					: null}
				{this.state.show === EDIT_POPUP ?
					<EditItemPopup
						item={this.state.popupItem}
						onAgree={this.onCompleteEditItemPopup}
						onClose={this.onClosePopup}
					/>
					: null}
				{itemcardList.map((item, pos) => (
					<React.Fragment key={`${item.id}-${pos}`}>
						<ItemCard
							{...item}
							item={item}
							name={`orderItem-${item.id}-${pos}`}
							onAdd={onAdd}
							onRemove={onRemove}
							onClickMinus={(i) => { this.onOpenPopup(REMOVE_POPUP, i); }}
							onClickEdit={(i) => { this.onOpenPopup(EDIT_POPUP, i); }}
							validators={this.props.validators}
							errorMessages={this.props.errorMessages}
						/>
						<hr />
					</React.Fragment>
				))}
				<div className="container">
					<span className={styles.label}>{t('Subtotal')}</span>
					<span className={styles.price}>
						{priceDisplay(currency_symbol, total, currency_decimal_places)}
					</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	order: state.get('order'),
	locale: state.getIn(['roomServiceConfig', 'locale']),
	roomServiceItems: state.get('roomServiceItems'),
	currency_symbol: state.getIn(['roomServiceConfig', 'currency_symbol'], '$'),
	currency_decimal_places: state.getIn(['roomServiceConfig', 'currency_decimal_places']),
});


const mapDispatchToProps = dispatch => ({
	onAdd: bindActionCreators(addOrderItem, dispatch),
	onRemove: bindActionCreators(removeOrderItem, dispatch),
	onEdit: bindActionCreators(editOrderItem, dispatch),
});

ItemList.propTypes = propTypes;
ItemList.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList));
