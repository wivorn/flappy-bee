const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
	plugins: [
		new CopyWebpackPlugin([
			{ from: 'src/assets', to: 'assets/'},
			{ from: 'index.html', to: ''}
		])
	]
}
