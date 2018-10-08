import Immutable from 'immutable';
import RoomServiceItem from 'records/RoomServiceItem';
import RoomServiceItemAnswerList from 'records/RoomServiceItemAnswerList';

export default class ShoppingCartItem extends Immutable.Record({
	roomServiceItem: null,
	count: 0,
	customization: Immutable.List(),
}) {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}
		super({
			count: parseInt(obj.count, 10),
			customization:
				Immutable.List((obj.customization || [])
					.map(submittion => (submittion instanceof RoomServiceItemAnswerList ?
						submittion : new RoomServiceItemAnswerList(submittion)))),
			roomServiceItem: obj.roomServiceItem instanceof RoomServiceItem ? obj.roomServiceItem
				: new RoomServiceItem(obj.roomServiceItem),
		});
	}
	totalItemCost() {
		let total = 0;
		const basePrice = this.roomServiceItem.get('price');
		this.customization.forEach((customization) => {
			total += basePrice +
			(customization ? customization.getAdditionalPrice() : 0);
		});
		return total;
	}
}
