** Structure of redux store
```javascript
{
	roomServiceConfig: new RoomServiceConfig(),
	roomServiceCategories: Map({
		2: new RoomServiceCategory({
			id: 2,
			parent_id: 1,
			room_service_items: List([1, 2, 3]) // ids
			room_service_categories: List([7, 8]) // ids
		}),
		...
	}),
	roomServiceItems: Map({
		3 : new RoomServiceItem({
			id: 3,
			category_id: 2,
			item_customization_enabled: true,
			room_service_item_questions: List([
				new RoomServiceItemQuestion({
					name: new I18nString({
						en_US: 'Name',
						zh_TW: '名',
						...
					}),
					repeatable: true,
					room_service_item_answers: [
						new RoomServiceItemAnswer({
							name: new I18nString(),
							price: 17,
							quantity: 0, // useless here
						},
						...
					]
				}),
				...
			]),
		}),
		...
	}),
	homepageCategories: List([6, 1]),
	order: Map({
		hotel_room_number: '',
		hotel_guest_name: '',
		special_requests: '',
		delivery_time: 1532494433,
		shoppingCart: new ShoppingCart({
			3: new ShoppingCartItem({
				roomServiceItem: new RoomServiceItem(),
				count: 2,
				customization: List([
					new RoomServiceItemAnswerList([
						new RoomServiceItemAnswer(),
						new RoomServiceItemAnswer(),
						new RoomServiceItemAnswer(),
					]),
					new RoomServiceItemAnswerList([
						new RoomServiceItemAnswer(),
						new RoomServiceItemAnswer(),
						new RoomServiceItemAnswer(),
					]),
					...
				]),
				...
			}),
			...
		}),
	}),
}
```