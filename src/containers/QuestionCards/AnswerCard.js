import React from 'react';
import PropTypes from 'prop-types';
import RoomServiceItemAnswerList from 'records/RoomServiceItemAnswerList';
import RoomServiceItemAnswer from 'records/RoomServiceItemAnswer';
import { AnswerCard, Incrementer, RadioButton, Checkbox } from 'components';

const propTypes = {
	numberRequired: PropTypes.number,
	repeatable: PropTypes.bool,
	answerList: PropTypes.instanceOf(RoomServiceItemAnswerList),
	roomServiceItemAnswer: PropTypes.instanceOf(RoomServiceItemAnswer),
	locale: PropTypes.string,
	onRemove: PropTypes.func,
	onAdd: PropTypes.func,
	onSelectOne: PropTypes.func,
};

const defaultProps = {
	numberRequired: '1',
	repeatable: false,
	answerList: new RoomServiceItemAnswerList(),
	roomServiceItemAnswer: new RoomServiceItemAnswer(),
	locale: 'en_US',
	onRemove: () => {},
	onAdd: () => {},
	onSelectOne: () => {},
};

class ItemAnswerCard extends React.Component {
	getChoiceControl() {
		const {
			answerList,
			numberRequired,
			repeatable,
			roomServiceItemAnswer,
		} = this.props;
		const selectedAnswer = answerList.findByAnswerId(roomServiceItemAnswer.get('id'));

		const answerQuantity = selectedAnswer.get('quantity', 0);
		const countItem = answerList
			.reduce((prev, current) => prev + current.get('quantity', 0), 0);

		if (numberRequired === 1) {
			return (
				<RadioButton
					selected={selectedAnswer.isSelected()}
					onClick={() => { this.props.onSelectOne(roomServiceItemAnswer); }}
				/>
			);
		}
		if (repeatable) {
			const max = (numberRequired - countItem) + answerQuantity;
			return (
				<Incrementer
					count={answerQuantity}
					maximum={max}
					onAdd={() => { this.props.onAdd(roomServiceItemAnswer); }}
					onRemove={() => { this.props.onRemove(roomServiceItemAnswer); }}
				/>
			);
		}
		return (
			<Checkbox
				checked={!!answerQuantity}
				onClick={(checked) => {
					if (checked) {
						this.props.onAdd(roomServiceItemAnswer);
					} else {
						this.props.onRemove(roomServiceItemAnswer);
					}
				}}
				disabled={!answerQuantity && numberRequired <= countItem}
			/>
		);
	}
	render() {
		const { roomServiceItemAnswer, answerList, locale } = this.props;
		const selectedAnswer = answerList.findByAnswerId(roomServiceItemAnswer.get('id'));
		return (
			<AnswerCard
				name={roomServiceItemAnswer.get('name').getLocale(locale)}
				price={selectedAnswer.getPrice() || roomServiceItemAnswer.get('price')}
				active={!!selectedAnswer.get('quantity', 0)}
			>
				{this.getChoiceControl()}
			</AnswerCard>
		);
	}
}
ItemAnswerCard.propTypes = propTypes;
ItemAnswerCard.defaultProps = defaultProps;

export default ItemAnswerCard;
