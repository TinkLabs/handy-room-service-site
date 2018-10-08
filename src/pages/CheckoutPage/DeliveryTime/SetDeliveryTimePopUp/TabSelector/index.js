import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style.scss';

const propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	nameList: PropTypes.array,
};

const defaultProps = {
	value: null,
	onChange: () => {},
	nameList: [],
};

const TabSelector = ({
	value,
	onChange,
	nameList,
}) => (
	<div className="container">
		{nameList.map(obj => (
			<button
				type="button"
				key={obj.value}
				className={classnames('btn', styles.tab, { active: value === obj.value })}
				onClick={() => {
					if (value === obj.value) return;
					onChange(obj.value);
				}}
			>
				{obj.label}
			</button>
		))}
		<hr />
	</div>
);

TabSelector.propTypes = propTypes;
TabSelector.defaultProps = defaultProps;

export default TabSelector;
