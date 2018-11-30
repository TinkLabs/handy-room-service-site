import React from 'react';
import Android from 'utils/Android';
import renderHTML from 'react-render-html';

const DebugPage = () => (
	<div style={{ fontSize: 10 }}>
		Domain: {window.location.href}
		{JSON.stringify(Android())}
		{renderHTML(JSON.stringify(document.cookie).split(';').join('<br />'))}
	</div>
);
export default DebugPage;
