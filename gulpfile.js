const gulp = require('gulp');
const sort = require('gulp-sort');
const sortJSON = require('gulp-json-sort').default;
const scanner = require('i18next-scanner');
// const replace = require('gulp-replace');
// const modifyFile = require('gulp-modify-file');
const jsonTransform = require('gulp-json-transform');
const fs = require('fs');
const onesky = require('gulp-onesky');
const sequence = require('run-sequence');
const post = require('gulp-onesky-post');

// Generate json file for translation
gulp.task('t', () => gulp.src(['src/**/*.{js,html}'])
	.pipe(sort()) // Sort files in stream by path
	.pipe(scanner({
		lngs: ['en_US'], // supported languages
		removeUnusedKeys: true,
		func: {
			list: ['t'],
			extensions: ['.js', '.jsx'],
		},
		keySeparator: false,
		nsSeparator: false,
		defaultValue: (lng, ns, key) => key,
		plural: false,
		resource: {
			loadPath: '{{lng}}.json',
			savePath: '{{lng}}.json',
		},
		sort: true,
	}))
	.pipe(sortJSON({ space: '\t' }))
	.pipe(gulp.dest('src/translation'))
	.on('end', () => {
		console.log('translation/en_US.json generated.');
	}));

gulp.task('onesky', (done) => {
	sequence('i18n:multilangual-json', 'translation-json-indent', 't', done);
});

gulp.task('i18n:multilangual-json', (done) => {
	onesky({
		publicKey: 'gblczmRUXYgWA5K4nQY9qW01WgL4MXES',
		secretKey: 'BLZL5xbPuKgw9LYXDsg4VK71K9pTiFlJ',
		projectId: '313189',
		sourceFile: 'en_US.json',
	})
		.pipe(jsonTransform((data) => {
			Object.keys(data).forEach((locale) => {
				if (['en', 'en_US'].indexOf(locale) > -1) return;
				const { translation } = data[locale];
				const fileName = `src/translation/${locale}.json`;
				fs.writeFileSync(fileName, JSON.stringify(translation));
				console.log('saved file: ', fileName);
			});
			done();
		}));
});

gulp.task('translation-json-indent', () => (
	gulp.src('src/translation/**/*.json')
		.pipe(sortJSON({ space: 4 }))
		.pipe(gulp.dest('src/translation'))
));

gulp.task('onesky-post', () => (
	gulp.src('src/translation/en_US.json')
		.pipe(post({
			locale: 'en_US',
			secretKey: 'BLZL5xbPuKgw9LYXDsg4VK71K9pTiFlJ',
			publicKey: 'gblczmRUXYgWA5K4nQY9qW01WgL4MXES',
			projectId: '313189',
			fileName: 'en_US.json',
			format: 'HIERARCHICAL_JSON',
			allowSameAsOriginal: true,
			keepStrings: false,
		}))
		.pipe(gulp.dest('src/translation'))
));
