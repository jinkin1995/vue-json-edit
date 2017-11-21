
module.exports = {
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					stylus: 'vue-style-loader!css-loader!stylus-loader',
					styl: 'vue-style-loader!css-loader!stylus-loader'
				}
			}
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|jpg|gif|webp)$/,
			loader: 'file-loader',
			options: {
	          name: '[name].[ext]?[hash]',
	        }
		}, {
			test: /\.svg$/,
			loader: 'url-loader'
		}]
	}
}