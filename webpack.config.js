module.exports = {
  entry: {
    main: "./static/js/index.tsx",
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        loader: "file-loader",

        options: {
          name: "[name].[ext]",
          outputPath: "../../static/dist",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: __dirname + "/static/dist",
    filename: "[name].bundle.js",
  },
};
