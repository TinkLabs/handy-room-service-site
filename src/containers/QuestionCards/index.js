import React from 'react';
import classnames from 'classnames';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Element } from 'react-scroll';
import { ItemCard } from 'containers';
import RoomServiceItemAnswerList from 'records/RoomServiceItemAnswerList';
import QuestionCard from './QuestionCard';
import styles from './style.scss';

const propTypes = {
	questions: PropTypes.instanceOf(Immutable.List),
	answerList: PropTypes.instanceOf(RoomServiceItemAnswerList),
	errors: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
	questions: Immutable.List(),
	answerList: new RoomServiceItemAnswerList(),
	errors: Immutable.Map(),
};

class QuestionCards extends React.Component {
	calculateAdditionalPrice() {
		return this.props.answerList.getAdditionalPrice();
	}

	render() {
		const {
			answerList,
			id,
			questions,
			errors,
			locale,
		} = this.props;
		const choiceString = answerList.toLocaleString(locale);
		return (
			<div>
				<div className={classnames('container', styles.itemCard)}>
					<ItemCard
						id={id}
						additionalPrice={this.calculateAdditionalPrice()}
						subtitle={choiceString}
					/>
				</div>
				<div className="container">
					{questions.map((question, questionIndex) => (
						<Element name={`QuestionCard-${questionIndex}`} key={`QuestionCard-${questionIndex}`}>
							<QuestionCard
								error={errors.get(questionIndex)}
								locale={locale}
								key={`QuestionCard-${question.get('name').getLocale(locale)}${questionIndex}`}
								question={question}
								answerList={answerList.filterByQuestionId(question.get('id'))}
								onAdd={this.props.onAdd}
								onRemove={this.props.onRemove}
								onSelectOne={this.props.onSelectOne}
							/>
						</Element>
					))}
				</div>
			</div>
		);
	}
}

QuestionCards.propTypes = propTypes;
QuestionCards.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => ({
	locale: state.getIn(['roomServiceConfig', 'locale']),
	questions: state.getIn(['roomServiceItems', ownProps.id, 'room_service_item_questions'], Immutable.List()),
});
export default withRouter(connect(mapStateToProps)(QuestionCards));
