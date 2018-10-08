import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'handy-font/styles.css';

import App from 'pages/AppRoute';

import store from 'store';

import 'styles/common.scss';

const AppWithTheme = () => (
	<Provider store={store}>
		<HashRouter onUpdate={() => window.scrollTo(0, 0)}>
			<App />
		</HashRouter>
	</Provider>
);

ReactDOM.render(<AppWithTheme />, document.getElementById('root'));
