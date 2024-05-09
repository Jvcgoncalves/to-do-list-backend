const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './index.js', // Seu ponto de entrada principal do lado do servidor
  output: {
    filename: 'index.min.js', // O nome do arquivo de saída minificado
    path: path.resolve(__dirname, 'dist'), // O diretório de saída para os arquivos
  },
  mode: "production",
  target: 'node', // Indica ao Webpack que o código será executado no ambiente Node.js
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Remove todos os comentários do código minificado
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      // Other rules...
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  }
};
