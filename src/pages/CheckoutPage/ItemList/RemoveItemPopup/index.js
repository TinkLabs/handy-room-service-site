import React from 'react';
import PropTypes from 'prop-types';
import t from 'translation';
import mixpanel from 'utils/mixpanel';
import { ItemCard, PopUpBox, Button } from 'components';
import styles from './style.scss';

const mixpanelProperties = {
	category: 'checkout',
	subcategory: 'index',
	screen_name: 'ird_checkout_index',
};

const propTypes = {
	onClose: PropTypes.func,
	onAgree: PropTypes.func,
	item: PropTypes.object,
};

const defaultProps = {
	onClose: () => {},
	onAgree: () => {},
	item: {},
};

const RemoveItemPopup = ({
	onClose,
	onAgree,
	item,
}) => (
	<PopUpBox
		onClose={() => {
			mixpanel().track('IRD Item Click', {
				...mixpanelProperties,
				click_type: 'cancel-remove-item',
			});
			onClose();
		}}
	>
		<div className="container">
			<h4 className={styles.center}>{t('Are you sure to remove this item?')}</h4>
		</div>
		<ItemCard {...item} />
		<div className="btn-half-wrapper">
			<Button
				className="btn"
				onClick={() => {
					mixpanel().track('IRD Item Click', {
						...mixpanelProperties,
						click_type: 'cancel-remove-item',
					});
					onClose();
				}}
			>
				{t('No')}
			</Button>
		</div>
		<div className="btn-half-wrapper">
			<Button
				className="btn blue"
				onClick={() => {
					mixpanel().track('IRD Item Click', {
						...mixpanelProperties,
						click_type: 'remove-item',
					});
					onAgree();
				}}
			>
				{t('Yes')}
			</Button>
		</div>
	</PopUpBox>
);

RemoveItemPopup.propTypes = propTypes;
RemoveItemPopup.defaultProps = defaultProps;

export default RemoveItemPopup;
