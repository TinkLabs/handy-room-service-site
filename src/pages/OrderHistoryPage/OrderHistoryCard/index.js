import React from 'react';
import classnames from 'classnames';
import moment from 'moment-timezone';
import RoomServiceOrder from 'records/RoomServiceOrder';
import PropTypes from 'prop-types';
import t from 'translation';
import { connect } from 'react-redux';
import { priceDisplay } from 'utils/price';
import OrderItemCard from './OrderItemCard';
import styles from './style.scss';

const propTypes = {
	roomServiceOrder: PropTypes.instanceOf(RoomServiceOrder),
};

const defaultProps = {
	roomServiceOrder: new RoomServiceOrder(),
};

const OrderHistoryCard = ({
	roomServiceOrder,
	symbol,
	timezone,
}) => {
	moment.tz.setDefault(timezone);
	return (
		<div className={classnames('card', styles.card)}>
			{
				roomServiceOrder.get('room_service_order_items').map(orderItem => (
					<div key={`${orderItem.get('id')}-order_item`}>
						<OrderItemCard
							roomServiceOrderItem={orderItem}
						/>
						<hr className={styles.breakLine} />
					</div>
				))
			}
			<div className={classnames('container', styles.totalContainer)}>
				{roomServiceOrder.get('gratuity') ?
					<div className={styles.serviceCharge}>
						<span className={styles.label}>{t('Gratuity')}</span>
						<span className={styles.price}>{priceDisplay(symbol, roomServiceOrder.get('gratuity'))}</span>
					</div>
					: null }
				{roomServiceOrder.get('total_charge') ?
					<div className={styles.serviceCharge}>
						<span className={styles.label}>{t('Service Charge', {}, 'SERVICE_CHARGE')}</span>
						<span className={styles.price}>{priceDisplay(symbol, roomServiceOrder.get('total_charge'))}</span>
					</div>
					: null }
				{roomServiceOrder.get('tax') ?
					<div className={styles.serviceCharge}>
						<span className={styles.label}>{t('Tax', {}, 'TAX_CHARGE')}</span>
						<span className={styles.price}>{priceDisplay(symbol, roomServiceOrder.get('tax'))}</span>
					</div>
					: null }
				<div className={styles.totalCharge}>
					<span className={styles.label}>{t('Total', {}, 'TOTAL')}</span>
					<span className={styles.price}>
						<span className={styles.price}>{priceDisplay(symbol, roomServiceOrder.get('total_price'))}</span>
					</span>
				</div>
				{roomServiceOrder.get('delivery_datetime') ?
					<div className={styles.time}>
						<span className="icon icon-handy-icon-clock" />
						<span>{moment(roomServiceOrder.get('delivery_datetime')).format('HH:mm')}</span>
					</div>
					:
					<div className={styles.time}>
						<span className="icon icon-handy-icon-clock" />
						<span>{t('ASAP', {}, 'ASAP')}</span>
					</div>
				}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	locale: state.getIn(['roomServiceConfig', 'locale']),
	symbol: state.getIn(['roomServiceConfig', 'currency_symbol']),
	serviceChargeText: state.getIn(['roomServiceConfig', 'service_charge_translation']),
	timezone: state.getIn(['roomServiceConfig', 'timezone']),
});


OrderHistoryCard.propTypes = propTypes;
OrderHistoryCard.defaultProps = defaultProps;

export default connect(mapStateToProps)(OrderHistoryCard);
