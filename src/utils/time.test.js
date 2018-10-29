import moment from 'moment-timezone';
import { get24HourFormat, isBetween } from './time';

describe('Test get24HourFormat function', () => {
	test('Compare output', () => {
		expect(get24HourFormat('00:00 am')).toEqual('00:00');
		expect(get24HourFormat('12:00 am')).toEqual('00:00');
		expect(get24HourFormat('12:59 am')).toEqual('00:59');
		expect(get24HourFormat('01:00 am')).toEqual('01:00');
		expect(get24HourFormat('10:00 am')).toEqual('10:00');
		expect(get24HourFormat('12:00 pm')).toEqual('12:00');
		expect(get24HourFormat('01:00 pm')).toEqual('13:00');
		expect(get24HourFormat('07:00 pm')).toEqual('19:00');
		expect(get24HourFormat('11:59 pm')).toEqual('23:59');
	});
});

describe('Test isBetween function', () => {
	test('AM to AM', () => {
		expect(isBetween(moment('10-08-2018 04:00 AM', 'MM-DD-YYYY hh:mm A'), '01:00 am', '11:59 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 00:59 AM', 'MM-DD-YYYY hh:mm A'), '01:00 am', '11:59 am', 'Asia/Hong_Kong')).toBe(false);
		expect(isBetween(moment('10-08-2018 04:00 PM', 'MM-DD-YYYY hh:mm A'), '01:00 am', '11:59 am', 'Asia/Hong_Kong')).toBe(false);
		// Have 12am input
		expect(isBetween(moment('10-08-2018 10:00 AM', 'MM-DD-YYYY hh:mm A'), '12:00 am', '11:59 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 10:00 PM', 'MM-DD-YYYY hh:mm A'), '12:00 am', '11:59 am', 'Asia/Hong_Kong')).toBe(false);
	});

	test('PM to PM', () => {
		// Same Day
		expect(isBetween(moment('10-08-2018 04:00 PM', 'MM-DD-YYYY hh:mm A'), '01:00 pm', '11:59 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 04:00 AM', 'MM-DD-YYYY hh:mm A'), '01:00 pm', '11:59 pm', 'Asia/Hong_Kong')).toBe(false);
		// Have 12pm Input
		expect(isBetween(moment('10-08-2018 04:00 PM', 'MM-DD-YYYY hh:mm A'), '12:00 pm', '11:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 04:00 AM', 'MM-DD-YYYY hh:mm A'), '12:00 pm', '11:00 pm', 'Asia/Hong_Kong')).toBe(false);
		// Cross Day
		expect(isBetween(moment('10-08-2018 07:00 AM', 'MM-DD-YYYY hh:mm A'), '11:00 pm', '10:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 07:00 PM', 'MM-DD-YYYY hh:mm A'), '11:00 pm', '10:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 10:30 PM', 'MM-DD-YYYY hh:mm A'), '11:00 pm', '10:00 pm', 'Asia/Hong_Kong')).toBe(false);

		expect(isBetween(moment('10-08-2018 10:00 PM', 'MM-DD-YYYY hh:mm A'), '07:00 pm', '01:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 07:00 AM', 'MM-DD-YYYY hh:mm A'), '07:00 pm', '01:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 03:30 PM', 'MM-DD-YYYY hh:mm A'), '07:00 pm', '01:00 pm', 'Asia/Hong_Kong')).toBe(false);
	});

	test('AM to PM', () => {
		// Same Day
		expect(isBetween(moment('10-08-2018 10:00 AM', 'MM-DD-YYYY hh:mm A'), '07:00 am', '11:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 11:59 PM', 'MM-DD-YYYY hh:mm A'), '07:00 am', '11:00 pm', 'Asia/Hong_Kong')).toBe(false);
		// Have 12am & 12pm Input
		expect(isBetween(moment('10-08-2018 10:00 AM', 'MM-DD-YYYY hh:mm A'), '12:00 am', '11:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 11:59 PM', 'MM-DD-YYYY hh:mm A'), '12:00 am', '11:00 pm', 'Asia/Hong_Kong')).toBe(false);

		expect(isBetween(moment('10-08-2018 10:00 AM', 'MM-DD-YYYY hh:mm A'), '03:00 am', '12:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 11:59 PM', 'MM-DD-YYYY hh:mm A'), '03:00 am', '12:00 pm', 'Asia/Hong_Kong')).toBe(false);
	});
	test('PM to AM', () => {
		// Cross Day
		expect(isBetween(moment('10-08-2018 10:00 PM', 'MM-DD-YYYY hh:mm A'), '11:00 pm', '07:00 am', 'Asia/Hong_Kong')).toBe(false);

		expect(isBetween(moment('10-08-2018 04:00 AM', 'MM-DD-YYYY hh:mm A'), '11:00 pm', '07:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 11:00 AM', 'MM-DD-YYYY hh:mm A'), '11:00 pm', '07:00 am', 'Asia/Hong_Kong')).toBe(false);

		expect(isBetween(moment('10-08-2018 10:00 PM', 'MM-DD-YYYY hh:mm A'), '08:00 pm', '07:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 11:00 AM', 'MM-DD-YYYY hh:mm A'), '08:00 pm', '07:00 am', 'Asia/Hong_Kong')).toBe(false);

		expect(isBetween(moment('10-08-2018 11:00 AM', 'MM-DD-YYYY hh:mm A'), '07:00 am', '07:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 11:00 PM', 'MM-DD-YYYY hh:mm A'), '07:00 am', '07:00 pm', 'Asia/Hong_Kong')).toBe(false);

		expect(isBetween(moment('10-08-2018 11:00 PM', 'MM-DD-YYYY hh:mm A'), '07:00 pm', '11:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 01:00 PM', 'MM-DD-YYYY hh:mm A'), '07:00 pm', '11:00 am', 'Asia/Hong_Kong')).toBe(false);

		// Have 12am & 12pm Input
		expect(isBetween(moment('10-08-2018 12:00 PM', 'MM-DD-YYYY hh:mm A'), '12:00 pm', '11:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 03:00 PM', 'MM-DD-YYYY hh:mm A'), '12:00 pm', '11:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 07:00 AM', 'MM-DD-YYYY hh:mm A'), '12:00 pm', '11:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 11:59 AM', 'MM-DD-YYYY hh:mm A'), '12:00 pm', '11:00 am', 'Asia/Hong_Kong')).toBe(false);
		expect(isBetween(moment('10-08-2018 11:30 AM', 'MM-DD-YYYY hh:mm A'), '12:00 pm', '11:00 am', 'Asia/Hong_Kong')).toBe(false);

		expect(isBetween(moment('10-08-2018 11:59 PM', 'MM-DD-YYYY hh:mm A'), '01:00 pm', '12:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 11:59 AM', 'MM-DD-YYYY hh:mm A'), '01:00 pm', '12:00 am', 'Asia/Hong_Kong')).toBe(false);
	});
	test('24 Hr', () => {
		expect(isBetween(moment('10-08-2018 11:00 AM', 'MM-DD-YYYY hh:mm A'), '07:00 am', '07:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 11:00 PM', 'MM-DD-YYYY hh:mm A'), '07:00 am', '07:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 12:00 AM', 'MM-DD-YYYY hh:mm A'), '07:00 pm', '07:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 12:00 PM', 'MM-DD-YYYY hh:mm A'), '07:00 pm', '07:00 pm', 'Asia/Hong_Kong')).toBe(true);
		// Have 12am & 12pm input
		expect(isBetween(moment('10-08-2018 07:00 AM', 'MM-DD-YYYY hh:mm A'), '12:00 am', '12:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 07:00 PM', 'MM-DD-YYYY hh:mm A'), '12:00 am', '12:00 am', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 12:00 AM', 'MM-DD-YYYY hh:mm A'), '12:00 pm', '12:00 pm', 'Asia/Hong_Kong')).toBe(true);
		expect(isBetween(moment('10-08-2018 12:00 PM', 'MM-DD-YYYY hh:mm A'), '12:00 pm', '12:00 pm', 'Asia/Hong_Kong')).toBe(true);
	});
});
