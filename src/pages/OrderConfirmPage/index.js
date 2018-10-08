import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from 'components';
import t from 'translation';
import { bindActionCreators } from 'redux';
import { resetOrder } from 'modules/order';
import mixpanel from 'utils/mixpanel';
import moment from 'moment-timezone';
import OrderItemCard from './OrderItemCard';
import styles from './style.scss';

const mixpanelProperties = {
	category: 'confirm',
	subcategory: 'index',
	screen_name: 'ird_confirm_index',
};

class OrderConfirmPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: props.order,
			roomNum: props.roomNum,
			name: props.name,
			remarks: props.remarks,
			deliveryTime: props.deliveryTime,
			deliveryLocation: props.deliveryLocation,
		};
		moment.tz.setDefault(props.timezone);
		moment.locale(props.locale, {
			calendar: {
				sameDay: t('[Today,] HH:mm'),
				nextDay: t('[Tomorrow,] HH:mm'),
				sameElse: 'MMM DD YYYY, HH:mm',
			},
		});
	}
	componentDidMount() {
		this.props.onResetOrder();
	}
	render() {
		const {
			order,
			roomNum,
			name,
			remarks,
			deliveryTime,
			deliveryLocation,
		} = this.state;
		const { deliveryLocationOptions, locale, history } = this.props;
		const onBack = () => {
			mixpanel().track('IRD Order Complete Click', {
				...mixpanelProperties,
				item_type: 'room_service_orders',
			});
			history.push('/');
		};
		return (
			<div>
				<Header>{t('Order Confirmation')}</Header>
				<div className="container">
					<div className={styles.header}>
						<div className={styles.iconWrapper}>
							<div className={styles.iconCircle}>
								<span className={classnames([styles.tickIcon], 'icon icon-handy-icon-tick')} />
							</div>
						</div>
						<h2>{t('Thank You!')}<br />
							{t('Your order has been placed.', {}, 'ORDER_PLACED_TITLE')}
						</h2>
						<p>
							{t('We have received your order and will prepare the food accordingly.', {}, 'ORDER_PLACED_DETAIL')}
						</p>
					</div>
					<hr />
					<div className={styles.orderContainer}>
						<div className={classnames(styles.orderColumn, styles.orderHalfWrapper)}>
							<p className={styles.orderLabel}>{t('Name', {}, 'HOTEL_GUEST_NAME')}</p>
							<p className={styles.orderContent}>
								{name}
							</p>
						</div>
						<div className={classnames(styles.orderColumn, styles.orderHalfWrapper)}>
							<p className={styles.orderLabel}>{t('Room', {}, 'HOTEL_GUEST_ROOM_NUMBER')}</p>
							<p className={styles.orderContent}>{roomNum}</p>
						</div>
						<div className={classnames(styles.orderColumn, styles.orderHalfWrapper)}>
							<p className={styles.orderLabel}>{t('Order Time')}</p>
							<p className={styles.orderContent}>{moment().format('HH:mm')}</p>
						</div>
						<div className={classnames(styles.orderColumn, styles.orderHalfWrapper)}>
							<p className={styles.orderLabel}>{t('Delivery Time', {}, 'DELIVERY_TIME')}</p>
							<p className={styles.orderContent}>{deliveryTime ? moment(deliveryTime).calendar() : t('ASAP', {}, 'ASAP')}</p>
						</div>
						{deliveryLocation ?
							<div className={classnames(styles.orderColumn, styles.orderHalfWrapper)}>
								<p className={styles.orderLabel}>{t('Delivery Location', {}, 'DELIVERY_LOCATION')}</p>
								<p className={styles.orderContent}>
									{deliveryLocationOptions.get(deliveryLocation).getLocale(locale)}
								</p>
							</div>
							: null }
						{remarks ?
							<div className={styles.orderColumn}>
								<p className={styles.orderLabel}>{t('Remarks', {}, 'SPECIAL_REQUESTS')}</p>
								<p className={styles.orderContent}>
									{remarks}
								</p>
							</div>
							: null }
						<div className={styles.orderColumn}>
							<p className={styles.orderLabel}>{t('Items')}</p>
							{ order.get('shoppingCart').valueSeq().map((item) => {
								const itemDetail = item.get('roomServiceItem');
								if (!itemDetail.get('item_customization_enabled')) {
									return 	(
										<OrderItemCard
											key={itemDetail.get('id')}
											title={itemDetail.getIn(['contents', locale, 'name']) || itemDetail.getIn(['contents', 'en_US', 'name'])}
											count={item.get('count')}
										/>
									);
								}
								return item.get('customization').map((orderItem, i) => (
									<OrderItemCard
										key={`${itemDetail.get('id')}-${i}`}
										title={itemDetail.getIn(['contents', locale, 'name']) || itemDetail.getIn(['contents', 'en_US', 'name'])}
										subtitle={orderItem.toLocaleString(locale)}
										count={1}
									/>
								));
							})}
						</div>
					</div>
					<hr />
					<div>
						<p className={classnames(styles.contactMsg)}>
							{t('Please contact front desk if you would like to make changes to your order')}
						</p>
					</div>
				</div>
				<div className="btn">
					<button type="button" className={classnames('btn blue', styles.button)} onClick={onBack}>{t('Back to menu')}</button>
				</div>

			</div>
		);
	}
}

const mapStateToProps = state => ({
	order: state.get('order'),
	roomNum: state.getIn(['order', 'hotel_room_number']),
	name: state.getIn(['order', 'hotel_guest_name']),
	remarks: state.getIn(['order', 'special_requests']),
	deliveryTime: state.getIn(['order', 'delivery_time']),
	deliveryLocation: state.getIn(['order', 'delivery_location']),
	deliveryLocationOptions: state.getIn(['roomServiceConfig', 'location_options']),
	locale: state.getIn(['roomServiceConfig', 'locale']),
	timezone: state.getIn(['roomServiceConfig', 'timezone']),
});

const mapDispatchToProps = dispatch => ({
	onResetOrder: bindActionCreators(resetOrder, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderConfirmPage));
