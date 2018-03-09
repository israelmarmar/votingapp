module.exports = {
	mode: 'development',
    entry: { app: './app.js', new: './newpoll.js', apoll: './apoll.js', pollj: './poll.jsx'},
    output: {
    	
        filename: '[name].js'
    },

    module: {
    rules: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015','react']
        }
    }]
	}
}