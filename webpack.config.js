module.exports = [{ 
  entry: {
    index : __dirname + "/src/TextToJSX.js"},
  output: {
    path: __dirname + "/dist/",
    filename: "bundle.js",
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [
        /node_modules/
      ],
      use: [{
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }],
    }]
  }
}];
