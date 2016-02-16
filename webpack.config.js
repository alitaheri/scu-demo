module.exports = {
  entry: './src/app',
  resolve: {
    extensions: ['', '.ts', '.tsx', '.json', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ]
  },
  output: {
    path: 'www/',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
};
