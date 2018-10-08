import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './style.scss';

const propTypes = {
	selected: PropTypes.bool,
	onClick: PropTypes.func,
};

const defaultProps = {
	selected: false,
	onClick: () => {},
};

const RadioButton = ({ selected, onClick }) => (
	<button type="button" className={styles.radioButton} onClick={() => { onClick(!selected); }}>
		{selected ?
			<div className={styles.circle} />
			: null}
	</button>
);
RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default withRouter(RadioButton);
