import React from 'react';
import Immutable from 'immutable';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { scroller } from 'react-scroll';
import t from 'translation';
import mixpanel from 'utils/mixpanel';
import { Header, Button } from 'components';
import { QuestionCards } from 'containers';
import { addOrderItem } from 'modules/order';
import RoomServiceItemAnswerList from 'records/RoomServiceItemAnswerList';
import RoomServiceItem from 'records/RoomServiceItem';
import styles from './style.scss';


const mixpanelProperties = {
	category: 'item',
	subcategory: 'custom',
};


class ItemPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answerList: new RoomServiceItemAnswerList(),
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
			this.props.onAdd({
				roomServiceItem: this.props.roomServiceItem,
				customization: this.state.answerList,
			});
			this.props.history.goBack();
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
				});
			}
		});
		return !errorMap.keySeq().toArray().length;
	}
	render() {
		const { id } = this.props.match.params;
		const mixpanelProps = {
			...mixpanelProperties,
			screen_name: `ird_item_custom:${id}`,
			item: this.props.roomServiceItem.get('name'),
			item_id: id,
			item_type: 'room_service_items',
			item_position: 0,
			item_provider_id: this.props.roomServiceItem.get('category_id'),
			item_locale: this.props.locale,
		};
		return (
			<div className={styles.customPage}>
				<Header hasBackButton>{t('Custom Item')}</Header>
				<h2 className={styles.heading}>{t('Add Custom Item')}</h2>
				<QuestionCards
					id={parseInt(id, 10)}
					answerList={this.state.answerList}
					onAdd={this.onAdd}
					onRemove={this.onRemove}
					onSelectOne={this.onSelectOne}
					errors={this.state.errorMap}
				/>
				<footer className={styles.footer}>
					<div className="btn-half-wrapper">
						<Button
							className="btn"
							onClick={() => {
								this.props.history.goBack();
								mixpanel().track('IRD Item Click', {
									...mixpanelProps,
									click_type: 'back-custom-item',
								});
							}}
						>
							{t('Cancel')}
						</Button>
					</div>
					<div className="btn-half-wrapper">
						<Button
							className="btn blue"
							onClick={() => {
								this.onSubmit();
								mixpanel().track('IRD Item Click', {
									...mixpanelProps,
									click_type: 'add-custom-item',
								});
							}}
						>
							{t('Add Item')}
						</Button>
					</div>
				</footer>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps.match.params;
	return {
		locale: state.getIn(['roomServiceConfig', 'locale']),
		roomServiceItem: state.getIn(['roomServiceItems', parseInt(id, 10)], new RoomServiceItem()),
		roomServiceItemQuestions: state.getIn(['roomServiceItems', parseInt(id, 10), 'room_service_item_questions'], Immutable.List()),
	};
};
const mapDispatchToProps = dispatch => ({
	onAdd: bindActionCreators(addOrderItem, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemPage));
