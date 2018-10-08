import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { updateGuestName } from 'modules/order';
import t from 'translation';
import styles from './style.scss';

const propTypes = {
	onEnter: PropTypes.func,
};
const defaultProps = {
	onEnter: () => {},
};

class NameTab extends ValidatorComponent {
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
			staticContext,
			onEnter,
			...rest
		} = this.props;
		return (
			<React.Fragment>
				<div className={classnames(styles.fieldName)}>
					<span className={!isValid ? styles.red : null}>{t('Name', {}, 'HOTEL_GUEST_NAME')}</span>
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
						placeholder={t('Your check-in name', {}, 'HOTEL_GUEST_NAME_PLACEHOLDER')}
						ref={(r) => { this.input = r; }}
						{...rest}
					/>
				</span>
			</React.Fragment>
		);
	}
}

NameTab.propTypes = propTypes;
NameTab.defaultProps = defaultProps;

const mapStateToProps = state => ({
	value: state.getIn(['order', 'hotel_guest_name']),
});

const mapDispatchToProps = dispatch => ({
	onChange: (e) => {
		bindActionCreators(updateGuestName, dispatch)(e.target.value);
	},
	validatorListener: () => {},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NameTab));
