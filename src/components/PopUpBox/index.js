import React from 'react';
import BodyClassName from 'react-body-classname';
import PropTypes from 'prop-types';
import styles from './style.scss';

const propTypes = {
	onClose: PropTypes.func,
};

const defaultProps = {
	onClose: () => {},
};

const PopUpBox = ({
	children,
	onClose,
}) => (
	<BodyClassName className={styles.noScroll}>
		<div className={styles.popupBox}>
			<button type="button" className={styles.overlay} onClick={onClose} />
			<div className={styles.content}>
				{children}
			</div>
		</div>
	</BodyClassName>
);

PopUpBox.propTypes = propTypes;
PopUpBox.defaultProps = defaultProps;

export default PopUpBox;
