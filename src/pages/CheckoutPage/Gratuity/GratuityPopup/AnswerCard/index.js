import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './style.scss';

const propTypes = {
	leftDiv: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	active: PropTypes.bool,
};

const defaultProps = {
	leftDiv: null,
	children: null,
	active: false,
};

const AnswerCard = ({
	leftDiv,
	active,
	children,
}) => (
	<div
		className={classnames(styles.choice, { [styles.active]: active })}
	>
		<div className={styles.left}>
			<span className={styles.name}>{leftDiv}</span>
		</div>
		<div className={styles.controls}>
			{children}
		</div>
	</div>
);

AnswerCard.propTypes = propTypes;
AnswerCard.defaultProps = defaultProps;


export default withRouter(AnswerCard);
