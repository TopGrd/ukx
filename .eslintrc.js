module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  rules: {
    "semi": ["error", "never"],
    "no-console": 0,
    "import/prefer-default-export": 0,
  },
}
