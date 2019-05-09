import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import getConfig from 'getConfig';
import { Button } from 'components';
import { CheckoutButton, CategoryCard } from 'containers';
import { Element, scroller } from 'react-scroll';
import { withRouter } from 'react-router-dom';
import t from 'translation';
import mixpanel from 'utils/mixpanel';
import HeroSection from './HeroSection';
import styles from './style.scss';

const mixpanelProperties = {
	category: 'cat',
	subcategory: 'index',
	screen_name: 'ird_cat_index',
};
const Homepage = ({
	history,
	categoryIds,
	subtitle,
	backgroundUrl,
	direct_order_number,
	locale,
}) => (
	<div className={styles.page} id="page">
		<header className={styles.header}>
			<span className={classnames('icon', getConfig().icon)} />
			<span>{getConfig().title}</span>
			<button
				type="button"
				onClick={() => {
					mixpanel().track('IRD My Orders Click', {
						...mixpanelProperties,
						click_type: 'my-orders',
					});
					history.push('/orders');
				}}
				className={classnames('btn small blue', styles.smallBtn)}
			>
				{t('My Orders', {}, 'MY_ORDERS')}
			</button>
		</header>
		<HeroSection
			title=""
			subtitle={subtitle}
			backgroundUrl={backgroundUrl}
			onClickArrow={() => {
				scroller.scrollTo('list', {
					duration: 500,
					smooth: true,
					offset: -56,
					containerId: 'root',
				});
			}}
		/>
		<Element name="list">
			<div className="container">
				<span className={styles.chooseCategory}>
					{t('Please choose a category:')}
				</span>
				{categoryIds.map((id, pos) => (
					<CategoryCard
						key={`category-${id}`}
						onClick={(e, category) => {
							mixpanel().track('IRD Category Click', {
								...mixpanelProperties,
								item: category.get('name'),
								item_id: id,
								item_type: 'room_service_categories',
								item_position: pos + 1,
								item_provider_id: 0,
								item_locale: locale,
							});
							history.push(`/category/${id}`);
						}}
						id={id}
						hasDeliveryText
					/>
				))}
			</div>
		</Element>
		{direct_order_number ?
			<Button
				className={styles.callButton}
				onClick={() => {
					mixpanel().track('IRD Call Reception Click', {
						...mixpanelProperties,
						click_type: 'call-reception',
						click_action: 'call-reception',
						click_text: 'Call Reception',
					});
					window.open(`tel:${direct_order_number}`);
				}}
			>
				<span className="icon icon-handy-icon-phone" />
				<span>{t('Call Reception', {}, 'CALL_TO_ORDER')}</span>
			</Button>
			: null}
		<CheckoutButton
			onClickCallback={() => {
				mixpanel().track('IRD Checkout Click', mixpanelProperties);
			}}
		/>

	</div>
);
const mapStateToProps = (state) => {
	const locale = state.getIn(['roomServiceConfig', 'locale']);

	return {
		subtitle: state.getIn(['roomServiceConfig', 'contents', locale, 'remarks']),
		backgroundUrl: state.getIn(['roomServiceConfig', 'banner_image_url']),
		categoryIds: state.get('homepageCategories'),
		direct_order_number: state.getIn(['roomServiceConfig', 'direct_order_number'], ''),
	};
};
export default withRouter(connect(mapStateToProps)(Homepage));
