import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import getConfig from 'getConfig';
import { Button } from 'components';
import styles from './style.scss';
// import circleArrow from './circle.svg';

const propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	backgroundUrl: PropTypes.string,
	backgroundColor: PropTypes.string,
};
const defaultProps = {
	title: null,
	subtitle: null,
	backgroundUrl: '',
	backgroundColor: '',
};

const HeroSection = ({
	title,
	subtitle,
	backgroundUrl,
	onClickArrow,
	backgroundColor,
}) => (
	<div className={classnames('container', styles.hero)}>
		<div className={styles.backgroundColor} style={{ backgroundColor }} />
		<div
			className={classnames('card', styles.heroImgBackground)}
			style={{ backgroundImage: `url(${backgroundUrl || getConfig().heroImage})` }}
		>
			<div className={styles.overlayText}>
				<h1>{title || getConfig().heroTitle}</h1>
				{subtitle ? <p>{subtitle}</p> : null}
			</div>
		</div>
		<Button
			className={styles.circleArrow}
			onClick={onClickArrow}
		>
			<span className="icon icon-handyicon-fonta-down" />
		</Button>
	</div>
);

HeroSection.propTypes = propTypes;
HeroSection.defaultProps = defaultProps;

export default HeroSection;
