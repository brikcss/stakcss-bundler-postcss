/* eslint-env mocha */
const assert = require('assert');
const rm = require('rimraf');
const fs = require('fs-extra');
const stak = require('@brikcss/stakcss');
const autoprefix = require('autoprefixer');
const postcssBundler = {
	run: './lib/stakcss-bundler-postcss.js',
	options: {
		map: false
	},
	plugins: [
		autoprefix({
			browsers: ['last 2 versions', 'ie 11']
		})
	]
};

describe('postcss()', () => {
	beforeEach(() => {
		rm.sync('.temp');
	});

	it('compiles a stylesheet from source', () => {
		return stak({
			source: 'test/fixtures/one/one.css',
			output: '.temp/one.css',
			bundlers: [postcssBundler]
		}).then(() => {
			assert.equal(
				fs.readFileSync('.temp/one.css', 'utf8').replace(/\t[\s]+/g, '\t'),
				fs.readFileSync('test/expected/one/one.css', 'utf8')
			);
		});
	});

	it('compiles a stylesheet from content', () => {
		return stak({
			content:
				'.my-selector {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\tflex-flow: row wrap;\n}\n',
			output: '.temp/one.css',
			bundlers: [postcssBundler]
		}).then(() => {
			assert.equal(
				fs.readFileSync('.temp/one.css', 'utf8').replace(/\t[\s]+/g, '\t'),
				fs.readFileSync('test/expected/one/one.css', 'utf8')
			);
		});
	});

	it('compiles a complex stylesheet', () => {
		return stak({
			source: 'test/fixtures/one/complex.css',
			output: '.temp/complex.css',
			bundlers: [
				{
					run: postcssBundler.run,
					options: {
						syntax: require('postcss-scss'),
						map: false
					},
					plugins: [
						autoprefix({
							browsers: ['last 2 versions', 'ie 11']
						}),
						require('precss')()
					]
				}
			]
		}).then(() => {
			assert.equal(
				fs.readFileSync('.temp/complex.css', 'utf8'),
				fs.readFileSync('test/expected/one/complex.css', 'utf8')
			);
		});
	});

	it('compiles many-to-one', () => {
		return stak({
			source: 'test/fixtures/many/*.css',
			output: '.temp/one.css',
			bundlers: [
				{
					run: postcssBundler.run,
					options: {
						syntax: require('postcss-scss'),
						map: false
					},
					plugins: [
						autoprefix({
							browsers: ['last 2 versions', 'ie 11']
						}),
						require('precss')()
					]
				}
			]
		}).then(() => {
			assert.equal(
				fs.readFileSync('.temp/one.css', 'utf8'),
				fs.readFileSync('test/expected/many-to-one/one.css', 'utf8')
			);
		});
	});

	it('compiles many-to-many', () => {
		return stak({
			source: 'test/fixtures/many/*.css',
			output: '.temp/',
			bundlers: [
				{
					run: postcssBundler.run,
					options: {
						syntax: require('postcss-scss'),
						map: false
					},
					plugins: [
						autoprefix({
							browsers: ['last 2 versions', 'ie 11']
						}),
						require('precss')()
					]
				}
			]
		}).then(() => {
			['extend.css', 'lookup.css', 'nested.css', 'preset-env.css', 'variables.css'].forEach(
				(filename) => {
					assert.equal(
						fs.readFileSync(`.temp/${filename}`, 'utf8'),
						fs.readFileSync(`test/expected/many-to-many/${filename}`, 'utf8')
					);
				}
			);
		});
	});

	it('compiles many-to-one with a sourcemap');
	it('compiles many-to-many with multiple sourcemaps');
});
