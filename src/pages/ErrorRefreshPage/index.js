import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { Header } from 'components';
import t from 'translation';
import styles from './style.scss';

const ErrorRefreshPage = ({ history }) => (
	<div>
		<Header hasBackButton />
		<div className="container">
			<div className={styles.header}>
				<div className={styles.iconWrapper}>
					<div className={styles.iconCircle}>
						<span className={classnames([styles.tickIcon], 'icon icon-handyicon-close')} />
					</div>
				</div>
				<h2>
					{t('Failed', {}, 'ORDER_FAILED_TITLE')}
				</h2>
				<p>
					{t('Menu has been updated, please refresh the menu and try again.')}
				</p>
			</div>
		</div>
		<div className="btn">
			<button
				type="button"
				className="btn blue"
				onClick={() => {
					history.push('/');
					window.location.reload();
				}}
			>
				{t('Refresh')}
			</button>
		</div>

	</div>
);

export default withRouter(ErrorRefreshPage);
