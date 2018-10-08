import React, { Component } from 'react';
import Immutable from 'immutable';
import { withRouter } from 'react-router-dom';
import { Header } from 'components';
import t from 'translation';
import mixpanel from 'utils/mixpanel';
import OrderHistoryCard from './OrderHistoryCard';
import getOrderHistory from '../../api/getOrderHistory';
import RoomServiceOrder from '../../records/RoomServiceOrder';
import DatetimeHr from './DatetimeHr';
import styles from './style.scss';


const mixpanelProperties = {
	category: 'order-history',
	subcategory: 'index',
	screen_name: 'ird_order-history_index',
};

class OrderHistoryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderHistory: Immutable.List(),
		};
	}
	componentWillMount() {
		getOrderHistory()
			.then(({
				room_service_orders,
			}) => {
				this.setState({
					orderHistory:
						Immutable.List(room_service_orders.map(order => new RoomServiceOrder(order))),
				});
			});
	}
	render() {
		return (
			<div className={styles.page}>
				<Header
					hasBackButton
					onBack={() => {
						mixpanel().track('IRD Back Click', mixpanelProperties);
					}}
				>
					{t('My Orders')}
				</Header>
				<div className="container">
					<h1>{t('Order History')}</h1>
					{ this.state.orderHistory.map((order, i) => {
						const orderCreatedDate = order.get('created');
						if (i < 1 || !this.state.orderHistory.get(i - 1).get('created').isSame(orderCreatedDate, 'date')) {
							return (
								<React.Fragment key={order.get('id')}>
									<DatetimeHr momentDateTime={orderCreatedDate} />
									<OrderHistoryCard roomServiceOrder={order} />
								</React.Fragment>
							);
						}
						return <OrderHistoryCard key={order.get('id')} roomServiceOrder={order} />;
					}) }
				</div>
			</div>
		);
	}
}

export default withRouter(OrderHistoryPage);
