/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential', // 使用 essential 規範
    'eslint:recommended', // 使用 ESLint 推薦規範
    '@vue/eslint-config-prettier' //使用 prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
