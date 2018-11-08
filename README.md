# Stakcss PostCSS Bundler

[![Greenkeeper badge](https://badges.greenkeeper.io/brikcss/stakcss-bundler-postcss.svg)](https://greenkeeper.io/)

> [Stakcss](https://github.com/brikcss/stakcss) Bundler that compiles [PostCSS](http://postcss.org/).

<!-- Shields. -->
<p>
	<!-- NPM version. -->
	<a href="https://www.npmjs.com/package/@brikcss/stakcss-bundler-postcss">
		<img alt="NPM version" src="https://img.shields.io/npm/v/@brikcss/stakcss-bundler-postcss.svg?style=flat-square">
	</a>
	<!-- NPM downloads/month. -->
	<a href="https://www.npmjs.com/package/@brikcss/stakcss-bundler-postcss">
		<img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/@brikcss/stakcss-bundler-postcss.svg?style=flat-square">
	</a>
	<!-- Travis branch. -->
	<a href="https://github.com/brikcss/stakcss-bundler-postcss/tree/master">
		<img alt="Travis branch" src="https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square&label=master">
	</a>
	<!-- Codacy. -->
	<a href="https://www.codacy.com/app/thezimmee/stakcss-bundler-postcss">
		<img alt="NPM version" src="https://img.shields.io/codacy/grade/2460b0c1029140ecb772ee0d41139ff1/master.svg?style=flat-square">
	</a>
	<!-- Coveralls -->
	<a href='https://coveralls.io/github/brikcss/stakcss-bundler-postcss?branch=master'>
		<img src='https://img.shields.io/coveralls/github/brikcss/stakcss-bundler-postcss/master.svg?style=flat-square' alt='Coverage Status' />
	</a>
	<!-- Commitizen friendly. -->
	<a href="http://commitizen.github.io/cz-cli/">
		<img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square">
	</a>
	<!-- Semantic release. -->
	<a href="https://github.com/semantic-release/semantic-release">
		<img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square">
	</a>
	<!-- Prettier code style. -->
	<a href="https://prettier.io/">
		<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
	</a>
	<!-- MIT License. -->
	<!-- <a href="https://choosealicense.com/licenses/mit/">
		<img alt="License" src="https://img.shields.io/npm/l/express.svg?style=flat-square">
	</a> -->
</p>

## Install

```sh
npm install @brikcss/stakcss @brikcss/stakcss-bundler-postcss --save-dev
```

## Usage

- Node:
	```js
	stak({
		bundlers: ['@brikcss/stakcss-bundler-postcss']
	});
	```

	or with options and data:

	```js
	stak({
		bundlers: [{
			run: '@brikcss/stakcss-bundler-postcss',
			options: {}
		}]
	});
	```

- CLI:
	```sh
	stak <source> [--output=<path>] --bundlers=@brikcss/stakcss-bundler-postcss
	```

	or with a config file:

	```sh
	stak --config=<path to config>
	```

### Bundler Configuration

_Note: From a CLI, you must use a config file (`--config=<path>`)_ to configure the bundler.

- **`bundler.options`** _{Object}_ Options passed to [PostCSS](https://github.com/postcss/postcss#options). The default options are:

	```js
	{
		from: typeof config.source === 'string' ? config.source : '',
		to: config.output,
		map: config.isProd
			? false
			: {
					inline: false,
					prev: config.sourceMap ? config.sourceMap : false
			  }
	}
	```

- **`bundler.plugins`** _{Array}_ Array of PostCSS plugins to use.

_See [Stakcss](https://github.com/brikcss/stakcss) for more on using Stakcss bundlers._
