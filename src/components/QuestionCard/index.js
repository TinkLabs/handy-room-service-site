import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import t from 'translation';
import styles from './style.scss';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	name: PropTypes.string,
	maximum: PropTypes.number,
	count: PropTypes.number,
	error: PropTypes.string,
};

const defaultProps = {
	children: null,
	name: '',
	maximum: 0,
	count: 0,
	error: '',
};

const QuestionCard = ({
	name,
	maximum,
	count,
	children,
	error,
}) => (
	<div
		className={classnames(styles.card, 'card', { error })}
	>
		{name || maximum ?
			<div className={styles.heading}>
				{name ?
					<span className={styles.categoryName}>{name}</span>
					: null}
				{maximum ?
					<span className={styles.options}>{t('%{count} of %{maximum} selected', { maximum, count })}</span>
					: null}
			</div>
			: null}
		{error ?
			<span className={styles.error}>{error}</span>
			: null}
		<div>
			{children}
		</div>
	</div>
);

QuestionCard.propTypes = propTypes;
QuestionCard.defaultProps = defaultProps;

export default QuestionCard;
