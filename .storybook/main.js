const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.tsx'],
	addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-actions',
		'@storybook/addon-links',
	  ],
	webpackFinal: async config => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [{
					loader: require.resolve('babel-loader'),
					options: {
						presets: [
							['react-app', {
								flow: false,
								typescript: true
							}]
						],
					},
				},
				{
					loader: require.resolve('react-docgen-typescript-loader'),
					options: {
						shouldExtractLiteralValuesFromEnum: true,//不展示所有属性
						propFilter: (prop) => {
							if (prop.parent) {
								return !prop.parent.fileName.includes('node_modules')
							}
							return true            
						}
					}
				}
			]
		});
		config.resolve.extensions.push('.ts', '.tsx');
		config.module.rules.push({
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			include: path.resolve(__dirname, '../'),
		});
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../'),
		});
		return config;
	},
}