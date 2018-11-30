import React from 'react';
import Android from 'utils/Android';
import renderHTML from 'react-render-html';

const DebugPage = () => (
	<div>
		{JSON.stringify(Android())}
		{renderHTML(JSON.stringify(document.cookie).split(';').join('<br />'))}
	</div>
);
export default DebugPage;
