import React from 'react';
import classnames from 'classnames';
import styles from './style.scss';

const Loading = ({ show }) => (
	<div className={classnames({ [styles.loading]: show })} />
);

export default Loading;
