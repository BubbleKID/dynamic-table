module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    "react/jsx-filename-extension": [0]
  },
  settings: {
    'import/resolver': {
      "node": {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    }
  }
};
