import React from 'react';
import Immutable from 'immutable';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import { QuestionCards } from 'containers';
import RoomServiceItemAnswerList from 'records/RoomServiceItemAnswerList';
import RoomServiceItem from 'records/RoomServiceItem';
import mixpanel from 'utils/mixpanel';
import t from 'translation';
import { PopUpBox } from 'components';
import styles from './style.scss';


const mixpanelProperties = {
	category: 'checkout',
	subcategory: 'index',
	screen_name: 'ird_checkout_index',
};

class EditItemPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answerList: this.props.answerList,
			errorMap: Immutable.Map(),
		};
		this.onAdd = this.onAdd.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.onSelectOne = this.onSelectOne.bind(this);
		this.validation = this.validation.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onAdd(answer) {
		this.setState({
			answerList: this.state.answerList.addOne(answer),
		});
	}
	onRemove(answer) {
		this.setState({
			answerList: this.state.answerList.removeOne(answer),
		});
	}
	onSelectOne(answer) {
		this.setState({
			answerList: this.state.answerList.selectOneOnly(answer),
		});
	}
	onSubmit() {
		if (this.validation()) {
			const { roomServiceItem, locale } = this.props;
			mixpanel().track('IRD Item Click', {
				...mixpanelProperties,
				click_type: 'add-custom-item',
				item: roomServiceItem.get('name'),
				item_id: roomServiceItem.get('id'),
				item_type: 'room_service_items',
				item_position: 0,
				item_provider_id: roomServiceItem.get('category_id'),
				item_locale: locale,
			});
			this.props.onAgree(this.props.roomServiceItem, this.state.answerList, this.props.item.index);
		}
	}
	validation() {
		const { answerList } = this.state;
		const { roomServiceItemQuestions } = this.props;
		let errorMap = Immutable.Map();
		roomServiceItemQuestions.forEach((question, questionIndex) => {
			const number_required = question.get('number_required', 1);
			let selectedCount = 0;
			answerList
				.filterByQuestionId(question.get('id'))
				.forEach((answer) => {
					selectedCount += answer.get('quantity', 0);
				});
			if (selectedCount !== number_required) {
				errorMap = errorMap.set(questionIndex, t('* Please choose %{count} %{items}', {
					count: number_required,
					items: number_required > 1 ? t('items') : t('item'),
				}));
			}
		});
		this.setState({
			errorMap,
		}, () => {
			if (errorMap.keySeq().toArray().length) {
				const questionIndex = errorMap.keySeq().toArray()[0];
				scroller.scrollTo(`QuestionCard-${questionIndex}`, {
					duration: 500,
					smooth: true,
					offset: -80,
					containerId: 'editPopup',
				});
			}
		});
		return !errorMap.keySeq().toArray().length;
	}
	render() {
		const { id } = this.props.item;
		const { roomServiceItem, locale } = this.props;
		return (
			<PopUpBox
				onClose={() => {
					mixpanel().track('IRD Item Click', {
						...mixpanelProperties,
						click_type: 'back-custom-item',
						item: roomServiceItem.get('name'),
						item_id: id,
						item_type: 'room_service_items',
						item_position: 0,
						item_provider_id: roomServiceItem.get('category_id'),
						item_locale: locale,
					});
					this.props.onClose();
				}}
			>
				<div className={styles.scrollable} id="editPopup">
					<div className="container">
						<h1>{t('Edit Custom item')}</h1>
					</div>
					<div className={styles.customCard}>
						<QuestionCards
							id={parseInt(id, 10)}
							answerList={this.state.answerList}
							onAdd={this.onAdd}
							onRemove={this.onRemove}
							onSelectOne={this.onSelectOne}
							errors={this.state.errorMap}
						/>
					</div>
				</div>
				<div className={styles.bottomControls}>
					<div className="btn-half-wrapper">
						<button
							type="button"
							className="btn"
							onClick={() => {
								mixpanel().track('IRD Item Click', {
									...mixpanelProperties,
									click_type: 'back-custom-item',
									item: roomServiceItem.get('name'),
									item_id: id,
									item_type: 'room_service_items',
									item_position: 0,
									item_provider_id: roomServiceItem.get('category_id'),
									item_locale: locale,
								});
								this.props.onClose();
							}}
						>
							{t('Cancel')}
						</button>
					</div>
					<div className="btn-half-wrapper">
						<button type="button" className="btn blue" onClick={this.onSubmit}>{t('OK')}</button>
					</div>
				</div>
			</PopUpBox>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id, index } = ownProps.item;
	return {
		locale: state.getIn(['roomServiceConfig', 'locale']),
		roomServiceItem: state.getIn(['roomServiceItems', parseInt(id, 10)], new RoomServiceItem()),
		roomServiceItemQuestions: state.getIn(['roomServiceItems', parseInt(id, 10), 'room_service_item_questions'], Immutable.List()),
		answerList: state.getIn(['order', 'shoppingCart', parseInt(id, 10), 'customization', index], new RoomServiceItemAnswerList()),
	};
};

export default withRouter(connect(mapStateToProps, null)(EditItemPopup));
