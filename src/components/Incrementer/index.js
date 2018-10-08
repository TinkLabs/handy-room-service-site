import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style.scss';

const propTypes = {
	onAdd: PropTypes.func,
	onRemove: PropTypes.func,
	count: PropTypes.number,
	maximum: PropTypes.number,
};

const defaultProps = {
	count: 0,
	maximum: 10,
	onAdd: () => {},
	onRemove: () => {},
};

const Incrementer = ({
	onAdd,
	onRemove,
	count,
	maximum,
}) => {
	const disabled = maximum <= count;
	const onClickAdd = () => {
		if (disabled) return;
		onAdd();
	};
	const onClickRemove = () => {
		onRemove();
	};
	return (
		<div className={styles.incrementer}>
			<button onClick={onClickRemove} type="button" className={classnames({ hide: !count })}>
				<span className="icon icon-handyicon-portal-minus" />
			</button>
			<span className={classnames(styles.count, { hide: !count })}>{count}</span>
			<button
				type="button"
				onClick={onClickAdd}
				disabled={disabled}
				className={classnames({ [styles.disabled]: disabled })}
			>
				<span className="icon icon-handy-icon-add" />
			</button>
		</div>
	);
};
Incrementer.propTypes = propTypes;
Incrementer.defaultProps = defaultProps;

export default Incrementer;
