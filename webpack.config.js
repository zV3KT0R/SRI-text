var webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/zCurrency.js",
    output: {              
        path: __dirname + '/public/js/',
        publicPath: "js/",
        filename: "zCurrency.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/],
		query:
      		{
        		presets:['react']
      		}
            }, 
	    {
                test: /\.jsx$/,
                loaders: ["babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-3,presets[]=env"],
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?importLoaders=1",
                exclude: [/node_modules/, /public/]
            },
	    {
                test: /\.less$/,
		use: [{
                	loader: "style-loader" // creates style nodes from JS strings
            	      }, {
                	loader: "css-loader" // translates CSS into CommonJS
            	      }, {
                	loader: "less-loader" // compiles Less to CSS
            	      }],
                exclude: [/node_modules/, /public/]
            }
        ]
    },
    resolve: {
	alias: {
		'components': path.resolve(__dirname, './src/components'),
		'constants':  path.resolve(__dirname, './src/constants'),
		'containers': path.resolve(__dirname, './src/containers'),
		'actions':    path.resolve(__dirname, './src/actions'),
		'reducers':   path.resolve(__dirname, './src/reducers'),
		'store':      path.resolve(__dirname, './src/store'),
		'utils':      path.resolve(__dirname, './src/utils'),
	}
    },
    devServer: {

        compress: true,

        disableHostCheck: true,   // That solved it

    }
}