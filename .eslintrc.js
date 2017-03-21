module.exports = {
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "phantomjs": true,
      "jquery":true,
      "node":true

    },
    "parserOptions": {
      "ecmaVersion": 6,
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true
      },
      "sourceType": "module"
    },
    "plugins": [
      "react"
    ],
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "rules": {
      "semi": "error",
      "no-console":0,
      "no-unused-vars":0,
      "no-undef":0,
      "require-yield": "off"
    }
};
