import { OrderedMap } from 'extendable-immutable';
import ShoppingCartItem from 'records/ShoppingCartItem';
import Immutable from 'immutable';

export default class ShoppingCart extends OrderedMap {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}
		let newObj = new Map();
		Object.keys(obj).forEach((id) => {
			newObj = newObj.set(parseInt(id, 10), obj[id] instanceof ShoppingCartItem ? obj[id] :
				new ShoppingCartItem(obj[id]));
		});
		super(newObj);
	}
	addItem(roomServiceItem, customization) {
		const itemId = roomServiceItem.id;
		return this.update(itemId, map => (
			(map || new ShoppingCartItem({ roomServiceItem }))
				.update('customization', item_customization =>
					(item_customization || Immutable.List()).push(customization))
				.update('count', count => (count || 0) + 1)
		));
	}

	editItem(index, roomServiceItem, customization) {
		const itemId = roomServiceItem.id;
		return this.updateIn(
			[itemId, 'customization'],
			list => (list || Immutable.List())
				.map((val, idx) => (idx === index ? customization : val)),
		);
	}

	removeItem(itemId, index) {
		const itemCount = this.getIn([itemId, 'count']);
		if (itemCount === 1) {
			// Remove the whole mapping of it is the last one
			return this.delete(itemId);
		}
		return this.updateIn(
			[itemId, 'customization'],
			list => (list || Immutable.List())
				.filter((value, idx) => idx !== index),
		)
			.updateIn([itemId, 'count'], count => (count || 1) - 1);
	}
	itemCount() {
		return this.valueSeq()
			.map(itemList => itemList.get('count'))
			.reduce((sum, count) => sum + count, 0);
	}
	calculatePrice() {
		return this.valueSeq()
			.reduce((sum, itemList) => sum + itemList.totalItemCost(), 0);
	}
}
