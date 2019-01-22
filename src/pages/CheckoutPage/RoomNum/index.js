import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { updateRoomNumber } from 'modules/order';
import t, { getTranslation } from 'translation';
import styles from './style.scss';

const propTypes = {
	focus: PropTypes.bool,
};
const defaultProps = {
	focus: false,
};

class RoomNumTab extends ValidatorComponent {
	onKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.input.blur();
		}
	}
	errorText() {
		const { isValid } = this.state;

		if (isValid) {
			return null;
		}

		return (
			<span className={styles.error}>{this.getErrorMessage()}</span>
		);
	}
	render() {
		const { isValid } = this.state;
		const {
			errorMessages,
			validators,
			requiredError,
			validatorListener,
			focus,
			staticContext,
			locale,
			...rest
		} = this.props;

		return (
			<React.Fragment>
				<div className={classnames(styles.fieldName)}>
					<span className={!isValid ? styles.red : null}>{t('Room', {}, 'HOTEL_GUEST_ROOM_NUMBER')}</span>
					{this.errorText()}
				</div>
				<span className={styles.fieldInput}>
					<input
						onKeyDown={(e) => {
							if (e.keyCode === 13) {
								e.preventDefault();
								return false;
							}
							return true;
						}}
						ref={(r) => { this.input = r; }}
						placeholder={getTranslation(locale, 'Your room number', {}, 'HOTEL_GUEST_ROOM_NUMBER_PLACEHOLDER')}
						{...rest}
					/>
				</span>
			</React.Fragment>
		);
	}
}

RoomNumTab.propTypes = propTypes;
RoomNumTab.defaultProps = defaultProps;

const mapStateToProps = state => ({
	value: state.getIn(['order', 'hotel_room_number']),
	locale: state.getIn(['roomServiceConfig', 'locale']),
});

const mapDispatchToProps = dispatch => ({
	onChange: (e) => {
		bindActionCreators(updateRoomNumber, dispatch)(e.target.value);
	},
	validatorListener: () => {},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomNumTab));
