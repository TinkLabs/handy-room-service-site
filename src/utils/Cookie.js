import cookie from 'react-cookie';

export default function (name) {
	return cookie.get(name);
}
