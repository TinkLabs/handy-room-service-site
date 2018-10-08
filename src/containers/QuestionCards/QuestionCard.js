import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import RoomServiceItemQuestion from 'records/RoomServiceItemQuestion';
import RoomServiceItemAnswerList from 'records/RoomServiceItemAnswerList';

import { QuestionCard } from 'components';
import AnswerCard from './AnswerCard';


const propTypes = {
	question: PropTypes.instanceOf(RoomServiceItemQuestion),
	answerList: PropTypes.instanceOf(RoomServiceItemAnswerList),
	locale: PropTypes.string,
	error: PropTypes.string,
	onRemove: PropTypes.func,
	onAdd: PropTypes.func,
	onSelectOne: PropTypes.func,
};

const defaultProps = {
	question: new RoomServiceItemQuestion(),
	answerList: new RoomServiceItemAnswerList(),
	locale: 'en_US',
	error: '',
	onRemove: () => {},
	onAdd: () => {},
	onSelectOne: () => {},
};

const ItemQuestionCard = ({
	question,
	answerList,
	locale,
	error,
	onAdd,
	onRemove,
	onSelectOne,
}) => {
	const countItem = answerList
		.reduce((prev, current) => prev + current.get('quantity', 0), 0);
	return (
		<QuestionCard
			error={error}
			name={question.get('name').getLocale(locale)}
			maximum={question.get('number_required')}
			count={countItem}
		>
			{question.get('room_service_item_answers', Immutable.List()).map((roomServiceItemAnswer) => {
				const answerId = roomServiceItemAnswer.get('id');
				return (
					<React.Fragment key={`answer-${answerId}`}>
						<hr />
						<AnswerCard
							numberRequired={question.get('number_required')}
							repeatable={question.get('repeatable')}
							roomServiceItemAnswer={roomServiceItemAnswer}
							answerList={answerList}
							locale={locale}
							onAdd={onAdd}
							onRemove={onRemove}
							onSelectOne={onSelectOne}
						/>
					</React.Fragment>
				);
			})}
		</QuestionCard>
	);
};

ItemQuestionCard.propTypes = propTypes;
ItemQuestionCard.defaultProps = defaultProps;

export default ItemQuestionCard;
