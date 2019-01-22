import React from 'react';
import Immutable from 'immutable';
// import PropTypes from 'prop-types';
import { priceDisplay } from 'utils/price';
import t from 'translation';
import mixpanel from 'utils/mixpanel';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PopUpBox, Checkbox, Button } from 'components';
import AnswerCard from './AnswerCard';
import styles from './style.scss';
//
// const propTypes = {
// 	history: PropTypes.object,
// 	category: PropTypes.instanceOf(RoomServiceCategory),
// 	subcategoryIds: PropTypes.instanceOf(Immutable.List),
// 	itemIds: PropTypes.instanceOf(Immutable.List),
// };
//
// const defaultProps = {
// 	history: {},
// 	category: new RoomServiceCategory(),
// 	subcategoryIds: Immutable.List(),
// 	itemIds: Immutable.List(),
// };
const mixpanelProperties = {
	category: 'item',
	subcategory: 'index',
	screen_name: 'ird_item_index',
};
class RemovePopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: Immutable.Map(),
		};
		this.onClick = this.onClick.bind(this);
		this.onComplete = this.onComplete.bind(this);
	}
	onClick(i, checked) {
		this.setState({
			checked: checked ? this.state.checked.set(i, checked) : this.state.checked.delete(i),
		});
	}
	onComplete() {
		const { checked } = this.state;
		mixpanel().track('IRD Item Click', {
			...mixpanelProperties,
			click_type: 'remove-multiple-item',
		});
		this.props.onComplete(checked.keySeq().filter(index => checked.get(index)));
	}
	render() {
		const { onClose, locale } = this.props;
		return (
			<PopUpBox>
				<div className="container">
					<h4>{t('Please select which item(s) to remove:')}</h4>
					<div className={styles.item}>
						{this.props.item.get('image') ?
							<div
								className={styles.image}
								style={{ backgroundImage: `url(${this.props.item.get('image')})` }}
							/>
							: null }
						<div className={styles.title}>{this.props.item.get('name')}</div>
					</div>
					<div className={styles.listing}>
						<hr />
						{this.props.customization.map((answerList, i) => {
							const price = answerList.getAdditionalPrice() +
								this.props.item.get('price');
							return (
								<React.Fragment key={`orderItem-${this.props.item.get('id')}-${i}`}>
									<AnswerCard
										price={priceDisplay(
											this.props.currency_symbol,
											price,
											this.props.currency_decimal_places,
										)}
										description={answerList.toLocaleString(locale)}
										active={this.state.checked.get(i)}
									>
										<Checkbox
											checked={this.state.checked.get(i)}
											onClick={(checked) => {
												this.onClick(i, checked);
											}}
										/>
									</AnswerCard>
									<hr />
								</React.Fragment>
							);
						})}
					</div>
				</div>
				<div className={styles.bottomControls}>
					<div className="btn-half-wrapper">
						<Button
							className="btn"
							onClick={() => {
								mixpanel().track('IRD Item Click', {
									...mixpanelProperties,
									click_type: 'cancel-remove-multiple-item',
								});
								onClose();
							}}
						>
							{t('Cancel')}
						</Button>
					</div>
					<div className="btn-half-wrapper">
						<Button
							className="btn blue"
							disabled={Immutable.is(this.state.checked, Immutable.Map())}
							onClick={this.onComplete}
						>
							{t('Remove', {}, 'REMOVE')}
						</Button>
					</div>
				</div>
			</PopUpBox>
		);
	}
}

// RemovePopup.propTypes = propTypes;
// RemovePopup.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.itemId;
	return {
		currency_symbol: state.getIn(['roomServiceConfig', 'currency_symbol']),
		currency_decimal_places: state.getIn(['roomServiceConfig', 'currency_decimal_places']),
		locale: state.getIn(['roomServiceConfig', 'locale']),
		item: state.getIn(['roomServiceItems', id], Immutable.Map()),
		customization: state.getIn(['order', 'shoppingCart', id, 'customization'], Immutable.List()),
	};
};
export default withRouter(connect(mapStateToProps)(RemovePopup));
