
export default function () {
	if (typeof window.Android === 'undefined' ||
		typeof window.Android.getGlobalProperties === 'undefined') {
		return {};
	}
	// window.Android.showToast(window.Android.getGlobalProperties());
	return JSON.parse(window.Android.getGlobalProperties());
}
