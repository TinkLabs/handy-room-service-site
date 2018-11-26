import moment from 'moment-timezone';
import 'moment/min/locales.min';
import Immutable from 'immutable';

export function get24HourFormat(timeStr = '00:00 am') {
	let hour = timeStr.substring(0, 2);
	const min = timeStr.substring(3, 5);
	const getLastAPM = timeStr.substring(6, 8);
	if (hour === '12' && getLastAPM.toLowerCase() === 'am') {
		hour = '00';
	}
	if (getLastAPM.toLowerCase() === 'pm') {
		if (hour !== '12') {
			hour = parseInt(hour, 10) + 12;
		}
	}
	return `${hour}:${min}`;
}

export function converthhmmAToLT(timeStr = '00:00 am', locale) {
	const hour24 = get24HourFormat(timeStr);
	moment.locale(locale);
	return moment(hour24, 'HH:mm').format('LT');
}
export function converthhmmAToHHmm(timeStr = '00:00 am', locale) {
	const hour24 = get24HourFormat(timeStr);
	moment.locale(locale);
	return moment(hour24, 'HH:mm').format('HH:mm');
}

export function isBetween(momentObj, startTimeStr = '00:00 am', endTimeStr = '11:59 pm', timezone) {
	const start = get24HourFormat(startTimeStr || '00:00 am').replace(':', '');
	const end = get24HourFormat(endTimeStr || '11:59 pm').replace(':', '');
	const target = (momentObj || moment()).tz(timezone).format('HHmm');
	if (start >= end) {
		if (target >= start) {
			return target >= end;
		}
		return target <= start && target <= end;
	}
	return target >= start && target <= end;
}

export function isAvailableDay(availableDays = Immutable.List(), momentObj, timezone) {
	const weekdayNum = (momentObj || moment()).tz(timezone).days();
	return availableDays.includes(weekdayNum);
}
