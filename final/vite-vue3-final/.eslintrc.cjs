module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue']
      }
    }
  },
  plugins: ['vue'],
  rules: {
    indent: 'off',
    'no-unused-vars': 'off',
    'vue/require-default-prop': 'off',
    'n/handle-callback-err': 'off'
  }

  // "eslint.rules.customizations": [
  //   { "rule": "*", "severity": "warn" }
  // ]
}
