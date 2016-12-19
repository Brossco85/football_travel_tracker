var config = {
  entry: "./build/app.js",
  output:{
    filename: "bundle.js",
    path: "./build"
  },
  devtool: "source-map"
};

module.exports = config;