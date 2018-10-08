import Immutable from 'immutable';

export default class I18nString extends Immutable.Record({
	en_US: '',
	zh_TW: '',
	zh_CN: '',
	fr_FR: '',
	it_IT: '',
	ar_IL: '',
	th_TH: '',
	es_ES: '',
	ja_JP: '',
	de_DE: '',
	pl_PL: '',
	ru_RU: '',
	hu_HU: '',
	ko_KR: '',
	pt_PT: '',

}) {
	getLocale(locale = 'en_US') {
		if (this.get(locale)) return this.get(locale);
		if (this.get('en_US')) return this.get('en_US');
		if (this.valueSeq().filter(str => !!str).get(0)) {
			return this.valueSeq().filter(str => !!str).get(0);
		}
		return null;
	}
}
