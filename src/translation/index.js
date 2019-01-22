import store from 'store';
import renderHTML from 'react-render-html';
import { withLocale } from 'utils/Context/withLocale';

import en_US from './en_US.json';
import ja_JP from './ja_JP.json';
import ar from './ar.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import hu_HU from './hu_HU.json';
import it from './it.json';
import ko_KR from './ko_KR.json';
import pl_PL from './pl_PL.json';
import pt_PT from './pt_PT.json';
import ru from './ru.json';
import th_TH from './th_TH.json';
import zh_CN from './zh_CN.json';
import zh_TW from './zh_TW.json';

const translation = {
	ar_AR: ar,
	en_US,
	ja_JP,
	de_DE: de,
	es_ES: es,
	fr_FR: fr,
	hu_HU,
	it_IT: it,
	ko_KR,
	pl_PL,
	pt_PT,
	ru_RU: ru,
	th_TH,
	zh_TW,
	zh_CN,
	zh_HK: zh_TW,
};
export function putVarsToString(str, vars = {}) {
	let result = str;
	const matches = str.match(/%{\s?\w+}/g) || [];
	matches.forEach((value) => {
		const key = value.replace('%{', '').replace('}', '').trim();
		const varValue = typeof (vars[key]) !== 'undefined' ? vars[key] : '';
		result = result.replace(new RegExp(value, 'g'), varValue);
	});
	return result;
}
export const getTranslation = (locale, key, vars = {}, overrideKey = '') => {
	let str = key;
	if (typeof (translation[locale]) !== 'undefined' && typeof (translation[locale][key]) !== 'undefined' && translation[locale][key]) {
		// eslint-disable-next-line
		str = translation[locale][key];
	}
	if (overrideKey) {
		const customText = store.getState().getIn(['roomServiceConfig', 'contents', locale, overrideKey], null);
		if (customText) {
			str = customText;
		}
	}
	if (typeof vars.renderHTML !== 'undefined' && vars.renderHTML === true) {
		return renderHTML(putVarsToString(str, vars));
	}
	return putVarsToString(str, vars);
};

export default withLocale(getTranslation);
