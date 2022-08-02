const path = require('path');

const PROJECT_NAME = 'Forta Dashboard'

const paths = {
  entry: path.resolve(__dirname, '../src/pages/app.jsx'),
  output: path.resolve(__dirname, '../dist'),
  env: path.resolve(__dirname, '../.env'),
  template: path.resolve(__dirname, '../public/index.html'),
  icons: path.resolve(__dirname, '../src/assets/icons/'),

  // ALIASES
  assets: path.resolve(__dirname, '../src/assets/'),
  constants: path.resolve(__dirname, '../src/constants/'),
  components: path.resolve(__dirname, '../src/components/'),
  pages: path.resolve(__dirname, '../src/pages/'),
  utils: path.resolve(__dirname, '../src/utils/'),
  hooks: path.resolve(__dirname, '../src/hooks/')
};

const host = process.env.HOST || 'localhost';

module.exports = {
  host,
  paths,
  PROJECT_NAME
};
