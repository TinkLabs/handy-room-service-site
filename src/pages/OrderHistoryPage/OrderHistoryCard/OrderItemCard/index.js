import React from 'react';
import classnames from 'classnames';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import RoomServiceItem from 'records/RoomServiceItem';
import RoomServiceOrderItem from 'records/RoomServiceOrderItem';
import { priceDisplay } from 'utils/price';

import PropTypes from 'prop-types';
import styles from './style.scss';

const propTypes = {
	roomServiceOrderItem: PropTypes.instanceOf(RoomServiceOrderItem),
};

const defaultProps = {
	roomServiceOrderItem: new RoomServiceOrderItem(),
};

const ItemCard = ({
	roomServiceOrderItem, locale, item, symbol,
}) => (
	<button
		type="button"
		className={classnames('card', styles.card)}
	>
		<div className="container">
			<div className={classnames(styles.bio)}>
				<div className={styles.title}>
					{`${roomServiceOrderItem.get('count')} x `}
					{item.getIn(['contents', locale, 'name']) ?
						item.getIn(['contents', locale, 'name']) : roomServiceOrderItem.get('name')}
					{roomServiceOrderItem.get('item_customization_choices', Immutable.List()).size ?
						<span className={classnames('icon icon-handy-icon-edit', styles.editLogo)} />
						: null}
				</div>
			</div>
			<span className={styles.price}>
				{priceDisplay(symbol, roomServiceOrderItem.getTotalPrice())}
			</span>
			<p className={styles.subTitle}>{roomServiceOrderItem.toLocaleString(locale)}</p>
		</div>
	</button>
);

ItemCard.propTypes = propTypes;
ItemCard.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => ({
	locale: state.getIn(['roomServiceConfig', 'locale']),
	symbol: state.getIn(['roomServiceConfig', 'currency_symbol']),
	item: state.getIn(['roomServiceItems', ownProps.roomServiceOrderItem.get('item_id')], new RoomServiceItem()),
});

export default connect(mapStateToProps)(ItemCard);
