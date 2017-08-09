module.exports = {
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  plugins: ["react"],
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env":{ 
    "es6": true,
    "browser": true,
    "node": true
  },
  "globals": {
    "Babel": true,
    "React": true
  },
  "rules": {
    "global-require": 0,
    "import/no-dynamic-require": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "linebreak-style": 0,
    "react/jsx-filename-extension": 0,
    "max-len": [2, 150, 2]
  },
};