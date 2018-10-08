import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSpecialRequests } from 'modules/order';
import t from 'translation';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './style.scss';

const propTypes = {
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
};
const defaultProps = {
	onFocus: () => {},
	onBlur: () => {},
};

class RemarksTab extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}
	onChange(e) {
		const { value } = e.target;
		this.props.onChange(value);
	}

	render() {
		return (
			<React.Fragment>
				<span className={styles.fieldName}>{t('Remarks', {}, 'SPECIAL_REQUESTS')}</span>
				<span className={styles.fieldInput}>
					<TextareaAutosize
						className={styles.remarksInput}
						value={this.props.remarks}
						onChange={this.onChange}
						onFocus={this.props.onFocus}
						onBlur={this.props.onBlur}
						placeholder={t('Allergy or special requests? (Optional)', {}, 'SPECIAL_REQUESTS_PLACEHOLDER')}
					/>
				</span>
			</React.Fragment>
		);
	}
}

RemarksTab.propTypes = propTypes;
RemarksTab.defaultProps = defaultProps;

const mapStateToProps = state => ({
	remarks: state.getIn(['order', 'special_requests']),
});

const mapDispatchToProps = dispatch => ({
	onChange: bindActionCreators(updateSpecialRequests, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RemarksTab));
