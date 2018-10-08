import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.scss';

const propTypes = {
	checked: PropTypes.bool,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};

const defaultProps = {
	checked: false,
	onClick: () => {},
	disabled: false,
};

const Checkbox = ({ checked, onClick, disabled }) => (
	<button
		type="button"
		className={classnames(styles.checkbox, { [styles.disabled]: disabled })}
		onClick={() => {
			!disabled && onClick(!checked);
		}}
	>
		{checked ?
			<span className="icon icon-handy-icon-tick" />
			: null}
	</button>
);
Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
