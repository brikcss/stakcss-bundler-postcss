/** ------------------------------------------------------------------------------------------------
 *  @filename  stakcss-bundler-postcss.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  Stakcss bundler that runs PostCSS.
 ** --------------------------------------------------------------------------------------------- */
/* eslint-disable no-mixed-spaces-and-tabs */
const postcss = require('postcss');
const fs = require('fs-extra');

module.exports = (config = {}, bundler = {}) => {
	let postcssConfigFile = {};

	// Assign options.
	if (!bundler.options) {
		const cosmiconfig = require('cosmiconfig');
		postcssConfigFile = cosmiconfig('postcss', {
			searchPlaces: [
				'package.json',
				`.postcssrc`,
				`.postcssrc.json`,
				`.postcssrc.yaml`,
				`.postcssrc.yml`,
				`.postcssrc.js`,
				`postcss.config.js`
			]
		}).searchSync().config;
		bundler.plugins = postcssConfigFile.plugins.slice(0);
		delete postcssConfigFile.plugins;
	}

	// Merge options from config.
	bundler.options = Object.assign(
		{
			from: typeof config.source === 'string' ? config.source : '',
			to: config.output,
			map: config.isProd
				? false
				: {
						inline: false,
						prev: config.sourceMap ? config.sourceMap : false
				  }
		},
		bundler.options || {},
		postcssConfigFile || {}
	);

	// Make sure plugins exist.
	if (!bundler.plugins || !(bundler.plugins instanceof Array)) {
		// eslint-disable-next-line no-console
		console.log('[i] No PostCSS plugins configured. Skipping.');
		return config;
	}

	// Get content and run postcss on each file (or on content).
	const promises = [];
	if (config.content) {
		promises.push(runPostcss(config.content, bundler));
	} else {
		config.source.forEach((filepath) => {
			promises.push(
				fs.readFile(filepath, 'utf8').then((content) => runPostcss(content, bundler))
			);
		});
	}

	// Parse results and prepare config object for return.
	return Promise.all(promises).then((results) => {
		config.content = [];
		config.maps = [];
		results.forEach((result) => {
			config.content.push(result.css);
			if (bundler.options.map && result.map) config.maps.push(result.map);
		});
		config.content = config.content.join('\n\n');
		return config;
	});
};

/**
 *  Run PostCSS on some content.
 */
function runPostcss(content, bundler = {}) {
	return postcss(bundler.plugins).process(content, bundler.options);
}
