import cookie from 'js-cookie';

export default function (name) {
	return cookie.get(name);
}
