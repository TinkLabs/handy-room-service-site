import React from 'react';
import { LocaleContext } from './LocaleContext';

export const withLocale = WrapperComponent => (...rest) => (
	<LocaleContext.Consumer>
		{
			locale => (
				typeof WrapperComponent === 'function' ?
					WrapperComponent(locale, ...rest) :
					<WrapperComponent locale={locale} {...rest} />
			)
		}
	</LocaleContext.Consumer>
);
