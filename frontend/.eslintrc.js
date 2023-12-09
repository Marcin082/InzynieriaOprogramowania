module.exports = {
    parser: '@babel/eslint-parser',
    extends: [
      'eslint:recommended',
      'plugin:react/recommended'
    ],
    plugins: [
      'react'
    ],
    rules: {
      // Dodaj reguły według potrzeb
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  };
  